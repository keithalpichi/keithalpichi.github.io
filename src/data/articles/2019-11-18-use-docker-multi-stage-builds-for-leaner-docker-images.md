---
title: "Use Docker Multi-Stage Builds for Leaner Docker Images"
date: "2019-11-18 08:00"
path: /blog/use-docker-multi-stage-builds-for-leaner-docker-images
excerpt: No more complex scripts and huge Dockerfiles.
tags: ["docker"]
---

Traditionally, building Docker images required complex instructions in a single Dockerfile, or sometimes many Dockerfiles, to create a final optimized Docker image. This complexity made it difficult to maintain Dockerfiles and create lean Docker images.

To alleviate this complexity, Multi-Stage Builds was introduced as a feature in Docker version 17.05. Today, we'll look at a common, but simplified, Docker problem and resolve the complexities of this problem with the help of Multi-Stage Builds.

## The Problem

To better grasp the problem let's see an example. We are building a Docker image to watch for files that are added to and removed from a directory. Here is the Typescript source code for the program.

```
import * as chokidar from 'chokidar'
const dirToWatch = '/watch'
const watcher = chokidar.watch(dirToWatch, {
  persistent: true
});
const log = console.log.bind(console);
watcher
  .on('add', path => log(`File ${path} has been added`))
  .on('addDir', path => log(`Directory ${path} has been added`))
  .on('unlink', path => log(`File ${path} has been removed`))
  .on('unlinkDir', path => log(`Directory ${path} has been removed`))
  .on('error', error => {
    log(`Watcher error: ${error}`)
    process.exit(1)
  });
```

This program is simple. We're using the Chokidar library to achieve the functionality of watching filesystem events. It watches the `/watch` directory for files and directories that are added and removed. When an event happens, we print a simple message to stdout.

Here are all of our files to build and run this program:

```
index.ts
package.json
tsconfig.json
Dockerfile
```

We have the source code in `index.ts`, the NPM dependencies in `package.json`, the Typescript build configuration in `tsconfig.json`, and the `Dockerfile`. Let's edit the Dockerfile to build this image. I'll make sure to add some common, yet suboptimal, operations in this file.

```
FROM node:12.13.0-alpine
WORKDIR /app
COPY . .
RUN npm install --quiet
RUN ./node_modules/typescript/bin/tsc
ENTRYPOINT [ "node" ]
CMD ["index.js"]
```

Here we perform the following steps:
- use the `node:12.13.0-alpine` image as the base image. This gives us `npm` and `node`.
- set the working directory to `/app`.
- copy the entire current working directory on the host into the `/app` directory in the image.
- install the dependencies listed in `package.json`. This includes some Typescript development dependencies and the Chokidar library.
- compile the Typescript code to Javascript.
- set the Docker entry point and command steps.

Let's build this image now.

```
docker build -t fs-watcher .
```

On my system, it builds a 144MB Docker image. Not bad but can we do better? Sure. There are two big improvements we can apply:
- Reduce files on disk- only copy into the image the appropriate files that compile the source code.
- Reduce Docker layers- each `FROM`, `COPY`, `RUN`, `CMD` adds a layer. Each Docker layer adds to the total Docker image size. We can reduce the image size by combining multiple RUN commands into one using multiple `&&.

Let's apply those two things now.

```
FROM node:12.13.0-alpine
WORKDIR /app
COPY index.ts package.json tsconfig.json /app/
RUN npm install --quiet && ./node_modules/typescript/bin/tsc
ENTRYPOINT [ "node" ]
CMD ["index.js"]
```

We now only copied the `index.ts`, `package.json`, and `tsconfig.json` into the image. We've also joined the two `RUN` commands. Building it now doesn't change the size much (our application is small) but we now have fewer files in the image and one less layer that makes up the Docker image. If this Dockerfile were for a real production application that included more complex steps and we applied the same improvements, you'd see a noticeable decrease in image size.

The following files now exist within the working directory of the image:

```
index.ts
index.js
node_modules
package-lock.json
package.json
tsconfig.json
```

Better but we can still make improvements. Let's add some steps in the Dockerfile to delete files we no longer need. This includes the NPM files and Typescript source code and configuration files.

```
FROM node:12.13.0-alpine
WORKDIR /app
COPY index.ts package.json tsconfig.json /app/
RUN npm install --quiet && \
  ./node_modules/typescript/bin/tsc && \
  rm -f index.ts package* tsconfig.json
ENTRYPOINT [ "node" ]
CMD ["index.js"]
```

We add another step in the RUN command to remove all these unnecessary files. We also added a few `\` to put commands on each line because the line was getting very long. This is very common in Dockerfiles. After building the image with these changes the following files exist within the working directory of the image:

```
index.js
node_modules
```

Sweet! There now is a single entry file and the dependencies it needs. Looking back, the Dockerfile has improved a lot. However, there were a few odd steps we needed to perform to achieve this result. We had to:
- add multiple commands into a single `RUN` instruction
- make sure each command after the `RUN` instruction was in the right order
- add multiple `\` to break many commands into separate lines
- copy many files into the Docker image
- add `rm` commands to remove files we no longer needed

As your application gets more complex, the number of files and commands greatly increases. You end up having to remember to perform a ton of steps and make sure those steps are in the right order. If you aren't careful the complexity of the Dockerfile can contribute to large Docker images.

I've even seen some codebases with different Dockerfiles based on the environment or need. Dockerfiles depended on others. Each Dockerfile was a little different and it would produce an image that copied dependencies from other images. Some Dockerfiles used volumes and mount points to allow the host to access the binaries or dependencies produced by the image so they could be copied to other images. It was a mess. It worked but it felt wrong.

So how do we eliminate all this complexity? With Docker's Multi-Stage Builds.

## The Solution

Multi-Stage Builds helps optimize Dockerfiles while keeping them easy to read and maintain. Docker briefly describes this feature like this:

> With multi-stage builds, you use multiple FROM statements in your Dockerfile. Each FROM instruction can use a different base, and each of them begins a new stage of the build. You can selectively copy artifacts from one stage to another, leaving behind everything you don't want in the final image.

Let's break this down. With this feature, a single Dockerfile can now contain multiple stages. A stage is a section of the Dockerfile that starts with a `FROM` instruction.

```
FROM node:12.13.0-alpine as install
WORKDIR /install
COPY package.json /install/
RUN npm install --quiet
```

The first line signifies the lines it precedes as a single stage. The instruction as install names this stage install. You don't have to name the stage but it helps in later stages to reference this stage by its name rather than the stage number; in this case zero since it is the first stage in Dockerfile. In this stage we:
- set the working directory to `/install`
- copy the `package.json` to this directory
- install the dependencies listed in the `package.json`

This stage is clear. It installs dependencies. We could stop and build this image if we wanted to but the final Docker image is not complete. We're still missing a lot of stages. Let's build the next stage.

```
FROM node:12.13.0-alpine as compile
WORKDIR /build
COPY tsconfig.json index.ts /build/
COPY --from=install /install/node_modules /build/node_modules
RUN node_modules/typescript/bin/tsc
```

We've named this stage the compile stage. In this stage we:
- set the working directory to `/build`
- copy the Typescript source code and compilation file into this directory
- copy the dependencies in the `/install/node_modules` directory from the install stage to the `/build/node_modules` directory
- compile the Typescript source code using the `tsc` compiler

The main take away from this stage is the `COPY --from=<stage>` instruction. This does exactly as it says. It copies files from one stage into the current stage.
We now have two stages, `install` and `compile`. I'd like to pause here and explain another interesting feature of Multi-Stage Builds. When building an image you can tell Docker what stage to build up to. For example, if we ran `docker build --target install .` we'd only build the `install` stage. However, if we did not provide the `--target <stage>` it would build all the stages. Okay let's resume developing all the stages.

Here is the final Dockerfile:

```
FROM node:12.13.0-alpine as install
WORKDIR /install
COPY package.json /install/
RUN npm install --quiet

FROM node:12.13.0-alpine as compile
WORKDIR /build
COPY tsconfig.json index.ts /build/
COPY --from=install /install/node_modules /build/node_modules
RUN node_modules/typescript/bin/tsc

FROM node:12.13.0-alpine as source
WORKDIR /app
COPY --from=compile /build/index.js /app/index.js
COPY package.json /app
RUN npm install --production --quiet

FROM node:12.13.0-alpine as dev
WORKDIR /app
COPY --from=source /app/index.js .
COPY --from=source /app/node_modules node_modules
VOLUME [ "/watch" ]
ENTRYPOINT [ "node" ]
CMD ["index.js"]

FROM node:12.13.0-alpine as prod
WORKDIR /app
COPY --from=source /app/index.js .
COPY --from=source /app/node_modules node_modules
RUN mkdir /watch
ENTRYPOINT [ "node" ]
CMD ["index.js"]
```

You may have noticed each stage used the same base image. With Multi-Stage Builds you are free to use any base image for each stage. A testing stage may have a base image better suited for testing while a production base image may be as simple as a scratch image. It's helpful to think of each stage as it's own Dockerfile.

Let's briefly describe the last three stages:
- in the `source` stage we copy the the source code from the previous stage and install production dependencies.
- in the `dev` stage we copy the source code from the previous stage, add a volume, set the entry point and command. The volume allows us to test the program running in the Docker image. If we build up to this stage we can test the image by adding to or removing files from the volume on the host and assert that the program is working as expected.
- in the `prod` stage we copy the source code from the `source` stage, create a directory `/watch`, and set the entry point and command.

The final Docker image on my system is ~80MB. That's nearly half the size of the first Docker image. If we wanted we could apply a few more changes to further reduce the size:
- build the base image from scratch and have complete control of the dependencies required to run our program
- compile the source code to a binary executable

## Conclusion

We've come along way in improving our Dockerfiles and Docker images. Thanks to Multi-Stage Builds:
- we've converted the many error-prone hacky (`&&` and `\`) and suboptimal steps in our Dockerfile into multiple stages.
- each stage provided clarity because it was concise.
- copying artifacts from prior stages was simple. No intermediate Docker images were required to be built to disk.
- each stage could be built into a Docker image. You can use this to test each stage.
- the final Docker image became leaner.

So take a look at your current Dockerfiles and assess its complexity. Analyze how you can convert the many instructions and commands into a Multi-Stage Build. There is no better feeling than making Dockerfiles and Docker images maintainable.