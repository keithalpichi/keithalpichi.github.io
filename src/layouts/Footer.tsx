import * as React from 'react'
import { Flex, FlexContainer } from '../components'
import { css } from 'linaria'

const footerClassName = css`
  height: 4rem;
  box-shadow: 0 -1px 3px rgba(0,0,0,0.05);
`

const textClassName = css`
  text-align: center;
`

const Footer: React.SFC = () => (
  <FlexContainer alignContent='center' justifyContent='center' className={footerClassName}>
    <Flex column={12}><p className={textClassName}>Mahalo 🤙</p></Flex>
  </FlexContainer>
)

export default Footer
