import * as React from 'react'
import { Helmet } from 'react-helmet'
import { css } from 'linaria'

const className = css`
  text-align: center;
`

const About: React.SFC = () => (
  <React.Fragment>
    <Helmet title='Keith Alpichi | Page Not Found' />
    <h1 className={className}>404</h1>
    <h2 className={className}>Oh brah! No can find da' page you're looking for</h2>
  </React.Fragment>
)

export default About
