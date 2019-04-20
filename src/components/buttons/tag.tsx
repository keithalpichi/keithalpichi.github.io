import * as React from 'react'
import { css } from 'linaria'
import { colors } from '../../styles'

const tagButtonClassName = css`
  cursor: pointer;
  border: solid 1px ${colors.black};
  border-radius: 4px;
  padding: 4px 10px;
  margin: 5px;
  display: inline-block;
`

interface TagButton extends React.MouseEventHandler {
  active?: boolean
  onClick?: () => void
}

export default class Index extends React.Component<TagButton> {
  render () {
    const { active, children } = this.props
    return (
      <a
        style={{
          background: active ? colors.green : 'inherit',
          color: active ? colors.white : 'inherit'
        }}
        className={tagButtonClassName}
        {...this.props}
      >{children}</a>
    )
  }
}
