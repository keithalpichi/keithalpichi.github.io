import * as React from 'react'
import { Helmet } from 'react-helmet'
import Main from '../layouts'

export default function () {
  return (
    <Main>
      <Helmet title='Page Not Found' />
      <div className='text-center'>
        <h1>404</h1>
        <h2>Oh brah! No can find da' page you're looking for.</h2>
      </div>
    </Main>
  )
}
