import React, { PropsWithChildren, ReactElement } from 'react'
import { classNames } from '../../util'
import { colorTypes } from '../../styles/colors'

interface Props {
  className?: string
  intent: colorTypes | 'none'
  onClick?: () => void
}

export function Badge(props: PropsWithChildren<Props>): ReactElement {
  const { intent, className, onClick, children, ...rest } = props
  return (
    <span className={
      classNames(
        className,
        { 'bg-transparent': intent === 'none' },
        { 'bg-primary': intent === 'primary' },
        { 'bg-secondary': intent === 'secondary' },
        { 'bg-info': intent === 'info' },
        { 'bg-success': intent === 'success' },
        { 'bg-danger': intent === 'danger' },
        { 'text-white': intent !== 'none' },
        { 'text-primary': intent === 'none' },
        { 'cursor-pointer': onClick !== undefined },
        "px-2 inline-flex text-sm leading-5 font-semibold rounded-full"
      )
    }
    {...rest}
    >
      {props.children}
    </span>
  )
}

export function TagBadge(props: PropsWithChildren<Omit<Props, 'intent'> & { active?: boolean }>): ReactElement {
  const { active, children, ...rest } = props
  return (
    <Badge
      intent={active ? 'primary' : 'none'}
      {...rest}
    >{children}</Badge>
  )
}