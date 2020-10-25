import * as React from 'react'
import { colors } from '../../styles'
import { colorTypes, colorMap } from '../../styles/colors'
import { classNames } from '../../util'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: colorTypes
}

// TODO: add styles.colors to button background, hover, and active css
// const A = styled.a`
//   cursor: pointer;
//   border: solid 1px ${colors.black};
//   border-radius: 4px;
//   padding: 4px 10px;
//   margin: 6px;
//   display: inline-block;
//   background: ${({ color }: ButtonProps) => color ? colorMap[color] : colors.white};
//   color: ${({ color }: ButtonProps) => color ? colors.white : colors.black};
// `

export default class Index extends React.Component<ButtonProps> {
  render() {
    const { children } = this.props
    return (
      <button
        className={classNames(
          'inline-block cursor-pointer rounded-md px-4 py-2',
        )}
        {...this.props}
      >{children}</button>
    )
  }
}
