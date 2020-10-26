import * as React from 'react'
import { classNames } from '../../util'

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
}
export default class Index extends React.Component<Props> {
  render() {
    const { children } = this.props
    return (
      <a
        className={classNames(
          'inline-block cursor-pointer text-primary',
        )}
        {...this.props}
      >{children}</a>
    )
  }
}
