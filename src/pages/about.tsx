import * as React from 'react'
import { Helmet } from 'react-helmet'

const About: React.SFC = () => (
  <React.Fragment>
    <Helmet title='Keith Alpichi | About Me' />
    <div>
      <h1>Aloha, World!</h1>
      <ul>
        <li>Does AWS, Google Cloud, server-less computing, Docker, or distributed systems interests you?</li>
        <li>Are you currently a front-end engineer interested in transitioning to back-end?</li>
        <li>Are you overwhelmed with the diverse back-end tools, frameworks, and technologies?</li>
        <li>Do you have interest in architecting cloud computing systems?</li>
        <li>Do you dream to one day start your own software company but don't think you're ready?</li>
      </ul>
      <p>
        If you answered yes to any of the questions above you've come to the right place.
      </p>
      <p>
        Hi, my name is Keith Alpichi. I am a software engineer who loves cloud computing, server-less technologies, and scalable distributed systems. I help others become better back-end software engineers.
      </p>
      <p>
        Here's a little about me:
      </p>
      <ul>
        <li>
          I'm skilled in cloud-computing. I've architected AWS cloud infrastructures including managing servers and networks, creating server-less API's and Docker services, utilizing both SQL and NoSQL databases, and more.
        </li>
        <li>
          I'm skilled in back-end development using languages such as NodeJS and Go (Golang).
        </li>
        <li>
          I'm skilled in front-end Javascript development using tools such as React and Redux. In 2017, I taught over 30 software engineers on React and Redux.
        </li>
        <li>
          I'm deeply passionate about health, productivity, entrepreneurship, fitness, and nearly everything to do with the ocean.
        </li>
      </ul>
      <h2>When I'm Not Coding</h2>
      <p>
        Outside of work I like to exercise, cook, enjoy new cuisines, make my own espresso, listen to reggae music, play some chords on my ukulele, go to the beach and body surf, and read. I like to think of myself as a California beach bum. If I could code with my feet in the sand on a beach in San Diego, I would!
      </p>
      <p>
        If you feel my vibe, let's connect!
      </p>
      <p>Mahalo! 🤙</p>
    </div>
  </React.Fragment>
)

export default About
