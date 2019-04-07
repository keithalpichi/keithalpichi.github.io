---
date: "2017-07-17T12:00:00Z"
excerpt: Learn how to inspect, manipulate, and reject HTTP requests and responses
  with Express Middlewares
keywords: express, node, middleware
title: What is an Express Middleware and How to Create One
path: /blog/what-is-express-middleware-and-how-to-create-one
tags: ["express", "nodejs"]
---

#### Prerequisites
- Basic understanding of the HTTP protocol, Javascript, Node, and Express

## What are Middlewares?

From the documentation,

> Middlewares are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle. The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.

To give you a relatable picture, Express middleware's are the workers in a manufacturing line where each individual has a specific and unique responsibility. When a worker receives a product (request) from a previous worker they can do **one** of the following:

- **reject** the product if it doesn't meet strict standards, thus the product ceases to continue down the production line
- **add to or manipulate** the product and/or **allow** the product to continue down the production line where the next worker (middleware) does their job

If you've used Express before, you may have used some [middlewares](https://expressjs.com/en/resources/middleware.html):

- 'body-parser'- parses the request body and places it into the 'req.body' key of the request object
- 'express.static'- serves your static files
- 'express.logger'- uses a logger

All you had to do was add these to your Express application or route and BAM... you had more functionality! It seemed like magic but it's actually quite simple.

In this article I'll go over the details of middlewares and some useful examples showcasing the flexibility and power of middlewares.

## Req, Res, Next

Middlewares have access to three things:

- the [request](https://expressjs.com/en/4x/api.html#req) object
- the [response](https://expressjs.com/en/4x/api.html#res) object
- the 'next' function

```go
function customMiddleware (req, res, next) {
  //...
}
```

Since you have access to the request and response you can do almost anything you want. You can extract or add information to and from either one. You would call 'next( )' if you want to continue the request and pass it on to the next middleware or end the request right there.

## Middleware Chain

So you created the custom middleware, now what? You add it to the middleware chain. **Middlewares are called in the order they're declared**.

```go
const express = require('express')
const app = express()
app.use(express.bodyParser)
app.use(customMiddleware)
```

On every request these two middlewares will run- 'bodyParser' will run first before the one below it

```go
const express = require('express')
const app = express()
app.get('/some/path', customMiddleware, customMiddleware2)

const apiRouter = express.Router()
apiRouter.use(customMiddleware2)
app.use('/api', apiRouter)
```

You can have middlewares run on specific routes.

- 'customMiddleware' will run first followed by 'customMiddleware2' for the 'GET' method on the path '/some/path'
- Only 'customMiddleware2' will run for all requests to the 'apiRouter'


Cool huh? Let's see some other useful examples!

## A Simple Logger- Log Date and URL Path

In this example I extract and log some data specific to the request, then pass the request to the next middleware by using the 'next' function. The request or response is not altered in any way. I'll show an example of that next.

```go
function datePathLogger (req, res, next) {
  const date = new Date().toUTCString()
  console.log(`Request to '${req.path}' on ${date}`)
  next()
}
```

A request to a url 'www.foo.com/bar' would log

```bash
Request to '/bar' on Mon, 17 Jul 2017 01:01:38 GMT
```

After the 'console.log' function ran the 'next' function was called. At this point the request and response would be handed to the next middleware.

## Token Parser- Parse User ID from JWT Token

In this example I parse the request object for the JWT token to get the user's id. If it doesn't exist or the token was invalid I end the request and send back an unauthorized status code of 401. At this point the request stops. If it does exist I place the user's id into 'req.user_id' then call 'next'.

> Note that the key 'user_id' is arbitrary. I could have used 'req.users_identification_number'. However, there are reserved keys on the request and response object that you shouldn't modify. So consult the documentation to verify you're not modifying reserved keys.

```go
function tokenParser (req, res, next) {
  const user_id = parseTokenForUserID(req) // This is a made-up function that parses the user's ID from the request object
  if (!user_id) {
    res.sendStatus(401)
  } else {
    req.user_id = user_id
    next()
  }
}
```

Now in every succeeding middleware or request handler I have access to the user's id at 'req.user_id'.

## Environment-specific Middleware

Since middleware's are just functions you can have functionality based on different environments or configuration. Say, for example, we wanted to perform descriptive logging for development environments.

```go
function logger (env) {
  if (env === 'development') {
    return function (req, res, next) {
      // perform descriptive logs better suited for development environments
    }
  } else {
    return function (req, res, next) {
      // perform none or minimal logging
    }
  }
}
```

Then add this middleware by **calling** it with the environment

```go
const express = require('express')
const app = express()
app.use(logger(process.env.NODE_ENV))
```

These may not be practical examples you'd actually use in production but the illustrations should provide some clarity on the flexibility of middlewares.

## Beauty Of Middlewares

I love how the flow in Express middleware's are very explicit. It makes code intuitive, super flexible, and easy to read. If you're not creating custom middlewares I highly encourage you take advantage of their simplicity and power.

If you have any comments or questions please leave a comment or tweet me! Mahalo!
