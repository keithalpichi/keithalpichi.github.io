import * as React from 'react'
import Button from './button'

interface TagButtonProps extends React.MouseEventHandler {
  active?: boolean
  onClick?: () => void
}

export default class Index extends React.Component<TagButtonProps> {
  render () {
    const { active, children, ...rest } = this.props
    return (
      <Button
        color={active ? 'success' : undefined}
        {...rest}
      >{children}</Button>
    )
  }
}
