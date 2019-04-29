import * as React from 'react'
import { styled } from 'linaria/react'
import { colors } from '../../styles'
import { colorTypes, colorMap } from '../../styles/colors'

interface ButtonProps extends React.HTMLProps<HTMLAnchorElement> {
  color?: colorTypes
}

// TODO: add styles.colors to button background, hover, and active css
const A = styled.a`
  cursor: pointer;
  border: solid 1px ${colors.black};
  border-radius: 4px;
  padding: 4px 10px;
  margin: 6px;
  display: inline-block;
  background: ${({ color }: ButtonProps) => color ? colorMap[color] : colors.white};
  color: ${({ color }: ButtonProps) => color ? colors.white : colors.black};
`

export default class Index extends React.Component<ButtonProps> {
  render() {
    const { children } = this.props
    return (
      <A
        {...this.props}
      >{children}</A>
    )
  }
}
