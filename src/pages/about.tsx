import * as React from 'react'
import { Helmet } from 'react-helmet'

const About: React.SFC = () => (
  <React.Fragment>
    <Helmet title='Keith Alpichi | About Me' />
    <div>
      <ul>
        <li>
          Highly skilled in AWS, Go (Golang), NodeJS, Javascript, React, and Redux
        </li>
        <li>
          A leader who pursues his work with a growth-mindset, pride, and grit
        </li>
        <li>
          Deeply passionate about health, productivity, entrepreneurship, fitness, and the ocean
        </li>
        <li>
          Interested in simple intuitive UI's, server-less cloud computing, event-driven architectures and real-time distributed systems
        </li>
      </ul>
      <h1>Aloha!</h1>
      <p>
        Hi, my name is Keith Alpichi. I am a software engineer at HealthLytix in San Diego, California. I enjoy building performant and scalable real-time applications from the intuitive user interfaces all the way to the databases on the other side of the wire.
    </p>
      <p>
        The impact software technology has on the world really amazes me. I love that one person on one computer can build an entire software company and present it instantly to millions of people. I am so fortunate to be in an industry of innovative and inquisitive thinkers who are highly passionate about changing the world through software.
    </p>
      <p>
        When I'm not coding I like to exercise, cook, enjoy different cuisines, make my own espresso, listen to reggae music, play some chords on my ukulele, go to the beach, and read. I like to think of myself as a California beach bum. If I could code with my feet in the sand on a beach in San Diego, I would!
    </p>
      <p>
        If you feel my vibe, contact me!
    </p>
      <p>Mahalo! 🤙</p>
    </div>
  </React.Fragment>
)

export default About
