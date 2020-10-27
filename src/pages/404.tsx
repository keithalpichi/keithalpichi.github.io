import * as React from 'react'
import { Helmet } from 'react-helmet'

export default function () {
  return (
    <React.Fragment>
      <Helmet title='Page Not Found' />
      <div className='text-center'>
        <h1>404</h1>
        <h2>Oh brah! No can find da' page you're looking for.</h2>
      </div>
    </React.Fragment>
  )
}
