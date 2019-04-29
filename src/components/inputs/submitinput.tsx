import * as React from 'react'
import { styled } from 'linaria/react'
import { Input } from './input'
import { colors } from '../../styles'
import { colorMap } from '../../styles/colors'

// TODO edit :focus to show success/error on input change validation
const SubmitInput = styled(Input)`
  cursor: pointer;
  background: ${colorMap.success};
  color: ${colors.white};

  &:hover {
    color: ${colors.darkGreen};
  }
`

const Index: React.SFC<React.HTMLProps<HTMLInputElement>> = (props) => (
  <SubmitInput {...props} />
)

export default Index
