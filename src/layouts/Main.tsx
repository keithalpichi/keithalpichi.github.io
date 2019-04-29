import * as React from 'react'
import { FlexContainer, Flex } from '../components'
import Header from './Header'
import Footer from './Footer'
import { css } from 'linaria'

import '../styles/base.css'

const mainClassName = css`
  padding: 6rem 0px 2rem;
`

const mainContentClassName = css`
  max-width: 95%;
  width: 800px;
`

const Main: React.SFC = ({ children }) => (
  <FlexContainer direction='column'>
    <Header />
    <FlexContainer className={mainClassName} column={12} alignItems='center' direction='column'>
      <Flex className={mainContentClassName}>
        {children}
      </Flex>
    </FlexContainer>
    <Footer />
  </FlexContainer>
)

export default Main
