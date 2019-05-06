import * as React from 'react'
import { Helmet } from 'react-helmet'
import { NewsletterSignUp } from '../components'

const About: React.SFC = () => (
  <React.Fragment>
    <Helmet title='Keith Alpichi | About Me' />
    <div>
      <h1>Aloha, World!</h1>
      <ul>
        <li>Do you want to become a better software engineer?</li>
        <li>Are you currently a front-end engineer interested in transitioning to back-end?</li>
        <li>Are you overwhelmed with learning the diverse tools, frameworks, and technologies in the industry?</li>
        <li>Do you want to learn the best practices of using a technology by learning from practical examples?</li>
        <li>Do you have interest in becoming a cloud computing architect?</li>
        <li>Do you dream to one day start your own software company?</li>
      </ul>
      <p>
        If you answered yes to any of the questions above you've come to the right place.
      </p>
      <p>
        Hi, my name is Keith Alpichi. I am a software engineer who loves helping other software engineers become better at their jobs.
      </p>
      <p>
        Here's a little about me:
      </p>
      <ul>
        <li>
          I'm skilled in cloud-computing. I've architected AWS cloud infrastructures including managing servers and networks, creating server-less API's, utilizing both SQL and NoSQL databases, and more.
        </li>
        <li>
          I'm skilled in back-end development in languages such as NodeJS and Go (Golang).
        </li>
        <li>
          I'm skilled in front-end Javascript development using tools such as React and Redux. In 2017, I taught over 30 software engineers on React and Redux.
        </li>
        <li>
          I'm deeply passionate about health, productivity, entrepreneurship, fitness, and nearly everything to do with the ocean.
        </li>
        <li>
          I'm interested in simple yet intuitive UI's, server-less cloud computing, event-driven architectures and real-time distributed systems.
        </li>
        <li>
          I dream to someday start my own software company.
        </li>
      </ul>
      <h2>Join the "Aloha, World" Club</h2>
      <p>Build the knowledge to create more than "hello world" apps. Sign up below to get notified when new articles and exclusive content are released. Don't worry, I won't spam you and you can unsubscribe at any time.</p>
      <NewsletterSignUp />
      <h2>Who I Am Outside of Work</h2>
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
