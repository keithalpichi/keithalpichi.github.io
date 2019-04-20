import * as React from 'react'
import Flex, { FlexProps } from './flex'

const Index: React.SFC<FlexProps> = ({ children, ...rest }) => {
  return (
    <Flex
      container
      {...rest}
    >
      {children}
    </Flex>
  )
}

export default Index
