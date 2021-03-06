import React, { ReactElement, useState } from "react"
import { graphql } from 'gatsby'
import { classNames } from '../util'
import Posts from '../components/posts'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
import { TextButton } from '../components/buttons'

interface Props {
  location: {
    search: string
  }
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          frontmatter: {
            path: string
            title: string
            date: string
            excerpt: string
            tags: string[]
          }
        }
      }>
    }
  }
}

function Index(props: Props): ReactElement {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const {
    data: { allMarkdownRemark: { edges: posts } },
    location
  } = props
  return (
    <>
      <Header />
      <div className="flex flex-column">
        <svg id="aloha" viewBox="0 0 287 57" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M57 56H37.5L34.5 53H36.1132L13 3C19 3 32.4 5.9 38 17.5C43.6 29.1 53 48.1667 57 56Z" fill="#DC885D"/>
          <path d="M10 56H3L0 53H4.55844L23 17.5H30L10 56Z" fill="#DC885D"/>
          <path d="M35 46.5H13L16 41.5H32.5L35 46.5Z" fill="#DC885D"/>
          <path d="M34.5 53H54C50 45.1667 40.6 26.1 35 14.5C29.4 2.9 16 0 10 0L34.5 53Z" fill="#F7C257"/>
          <path d="M0 53L20 14.5H27L7 53H0Z" fill="#F7C257"/>
          <path d="M32 43.5H10L13 38.5H29.5L32 43.5Z" fill="#F7C257"/>
          <path d="M287 57H267.5L264.5 54H266.113L243 4C249 4 262.4 6.9 268 18.5C273.6 30.1 283 49.1667 287 57Z" fill="#DC885D"/>
          <path d="M240 57H233L230 54H234.558L253 18.5H260L240 57Z" fill="#DC885D"/>
          <path d="M265 47.5H243L246 42.5H262.5L265 47.5Z" fill="#DC885D"/>
          <path d="M264.5 54H284C280 46.1667 270.6 27.1 265 15.5C259.4 3.9 246 1 240 1L264.5 54Z" fill="#F7C257"/>
          <path d="M230 54L250 15.5H257L237 54H230Z" fill="#F7C257"/>
          <path d="M262 44.5H240L243 39.5H259.5L262 44.5Z" fill="#F7C257"/>
          <path d="M82 6V51H97.5V48L100.5 51V56H65L62 53H65V6H79V3L82 6Z" fill="#DC885D"/>
          <path d="M79 3H62V53H97.5V48H79V3Z" fill="#F7C257"/>
          <path d="M188 6V56H171L168 53H171V6H185V3L188 6Z" fill="#DC885D"/>
          <path d="M208 53H205L208 56V53Z" fill="#DC885D"/>
          <path d="M225 6L222 3V6H225Z" fill="#DC885D"/>
          <path d="M225 6H208V56H225V6Z" fill="#DC885D"/>
          <path d="M208 29H188V34H208V29Z" fill="#DC885D"/>
          <path d="M185 3H168V53H185V3Z" fill="#F7C257"/>
          <path d="M222 3H205V53H222V3Z" fill="#F7C257"/>
          <path d="M205 26H185V31H205V26Z" fill="#F7C257"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M136 56C153 56 163 47 163 31C163 15 153 6 136 6C119 6 109 15 109 31C109 47 119 56 136 56ZM136 51C143 51 145 42.0457 145 31C145 19.9543 143 11 136 11C129 11 127 19.9543 127 31C127 42.0457 129 51 136 51Z" fill="#DC885D"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M133 53C150 53 160 44 160 28C160 12 150 3 133 3C116 3 106 12 106 28C106 44 116 53 133 53ZM133 48C140 48 142 39.0457 142 28C142 16.9543 140 8 133 8C126 8 124 16.9543 124 28C124 39.0457 126 48 133 48Z" fill="#F7C257"/>
        </svg>
      </div>

      <svg className="mt-32" viewBox="0 0 1441 390" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M892.054 176.842C892.058 176.331 892.061 175.82 892.061 175.309C892.061 78.4883 813.572 0 716.752 0C619.932 0 541.443 78.4883 541.443 175.309C541.443 176.344 541.452 177.376 541.47 178.407C569.621 179.624 608.556 180.092 639.575 176.842C693.241 171.22 753.551 177.353 761.218 179.909C765.788 181.432 788.16 180.049 810.25 178.684C825.213 177.759 840.046 176.842 849.127 176.842H892.054Z" fill="#F7C257"/>
        <path className='wave' d="M245.943 167.5C179.543 166.3 55.6667 182.333 0.5 190.5V237C10.3333 235.5 97.6435 233.7 120.443 230.5C143.243 227.3 211.943 224.333 275.943 230.5C357.11 231.5 523.844 232.9 541.443 230.5C563.443 227.5 783.443 237 835.943 237C888.443 237 1000.44 225 1024.44 225C1048.44 225 1240.49 220 1262.94 220C1287.94 220 1349 223.5 1366.94 220C1384.89 216.5 1440.5 211.5 1440.5 211.5V167.5C1440.5 167.5 1150.94 190.5 1114.44 190.5C1077.94 190.5 951.443 186 899.943 186C848.443 186 840.443 194 783.443 195C726.443 196 729.943 190.5 712.943 190.5H613.943C586.443 190.5 500.943 184.5 440.943 181C380.943 177.5 328.943 169 245.943 167.5Z" fill="#88C4C8">
          <animate repeatCount="indefinite" fill="#88C4C8" attributeName="d" dur="12s" attributeType="XML" values=" M0 77  C 473,283 822,-40 1920,116  V 359  H 0  V 67  Z;  M0 77  C 473,-40 1222,283 1920,136  V 359  H 0  V 67  Z;  M0 77  C 973,260 1722,-53 1920,120  V 359  H 0  V 67  Z;  M0 77  C 473,283 822,-40 1920,116  V 359  H 0  V 67  Z "></animate>
        </path>
      </svg>
      <div className="flex flex-column justify-center">
        <svg className="h-4 w-4 lg:h-8 lg:w-8" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 0H0L12.5 25L25 0Z" fill="#19445C"/>
        </svg>
      </div>
      <div className="main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-0 lg:gap-x-12">
          <div>
            <h1>About</h1>
            <p>My name is Keith Alpichi. I'm a full-stack software engineer deeply passionate about productivity, health, fitness, and nearly everything to do with the ocean.</p>
            <p>Outside of work I like to exercise, cook, enjoy new cuisines, make my own espresso, listen to reggae music, play some chords on my ukulele, go to the beach and body surf, and read.</p>
            <p>I like to think of myself as a beach bum. If I could code with my feet in the sand on a beach, I would!</p>
          </div>
          <div>
            <h1>Software</h1>
            <p>Here are some things I've worked on:</p>
            <ul>
              <li><strong>Start-ups</strong>. I've worked with small and agile remote teams.</li>
              <li><strong>AWS cloud-computing</strong>. I've architected AWS cloud infrastructures, creating server-less applications, API's, and Docker services, using both SQL and NoSQL databases.</li>
              <li><strong>Back-end development</strong>. I've used languages such as NodeJS, Go (Golang), and Python.</li>
              <li><strong>Front-end development</strong>. I've used Javascript tools such as React and Redux. In 2017, I held lectures to teach these tools to over 30 software engineers.</li>
              <li><strong>Dev-Ops</strong>. I've used tools like Terraform, Cloudformation, and Jenkins to test code and provision infrastructure.</li>
            </ul>
          </div>
        </div>
        <div>
          <h1>Hire Me</h1>
          <p>If you're a recruiter or hiring manager and would like to discuss a career opportunity, please don't hesitate to contact me on my <TextButton href="https://www.linkedin.com/in/keithalpichi/" target="_blank">LinkedIn</TextButton>.</p>
        </div>
        <h1>Articles</h1>
        <Posts posts={posts} location={location} />
      </div>
      <Footer />
    </>
  )
}

export default Index

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            title
            path
            date
            excerpt
            tags
          }
        }
      }
    }
  }
`
