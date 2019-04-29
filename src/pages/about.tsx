import * as React from 'react'
import { Helmet } from 'react-helmet'

const About: React.SFC = () => (
  <React.Fragment>
    <Helmet title='Keith Alpichi | About Me' />
    <div>
      <h1>Aloha!</h1>
      <p>
        Hi, my name is Keith Alpichi. I am a software engineer living in San Diego, California. Here's a little about me:
      </p>
      <ul>
        <li>
          I'm skilled in AWS, NodeJS, Javascript, Go (Golang), React, and Redux
        </li>
        <li>
          I'm deeply passionate about health, productivity, entrepreneurship, fitness, and nearly everything to do with the ocean
        </li>
        <li>
          I'm interested in simple yet intuitive UI's, server-less cloud computing, event-driven architectures and real-time distributed systems
        </li>
        <li>
          I dream to someday start my own software company
        </li>
      </ul>
      <p>
        When I'm not coding I like to exercise, cook, enjoy new cuisines, make my own espresso, listen to reggae music, play some chords on my ukulele, go to the beach, and read. I like to think of myself as a California beach bum. If I could code with my feet in the sand on a beach in San Diego, I would!
      </p>
      <p>
        If you feel my vibe, let's connect!
      </p>
      <p>Mahalo! 🤙</p>
    </div>
  </React.Fragment>
)

export default About
