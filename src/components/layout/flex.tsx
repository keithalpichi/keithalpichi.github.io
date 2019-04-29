import * as React from 'react'
import { styled } from 'linaria/react'

type columns = 12 | 9 | 8 | 6 | 4 | 3
type columnPercentages = '100%' | '75%' | '66.66%' | '50%' | '33.33%' | '25%'

export interface FlexProps {
  container?: boolean
  direction?: 'row' | 'column'
  justifyContent?: 'flex-end' | 'flex-start' | 'center'
  alignContent?: 'flex-end' | 'flex-start' | 'center'
  alignItems?: 'flex-end' | 'flex-start' | 'center'
  column?: columns
  className?: string
  noPadding?: boolean
}

const computeWidth = (width: columns): columnPercentages => {
  switch (width) {
    case 12:
      return '100%'
    case 9:
      return '75%'
    case 8:
      return '66.66%'
    case 6:
      return '50%'
    case 4:
      return '33.33%'
    case 3:
      return '25%'
    default:
      return '100%'
  }
}

const FlexComponent = styled.div`
  display: ${(props: FlexProps) => props.container ? 'flex' : 'inline'};
  flex-direction: ${(props: FlexProps) => props.container && props.direction ? props.direction : 'row'};
  justify-content: ${(props: FlexProps) => props.container && props.justifyContent || 'flex-start'};
  align-content: ${(props: FlexProps) => props.container && props.alignContent || 'stretch'};
  align-items: ${(props: FlexProps) => props.container && props.alignItems || 'stretch'};
  width: ${(props: FlexProps) => (props.container && !props.column) || !props.column ? '100%' : computeWidth(props.column)};
  max-width: ${(props: FlexProps) => (props.container && !props.column) || !props.column ? '100%' : computeWidth(props.column)};
  padding: ${(props: FlexProps) => (props.container && !props.column) || props.noPadding ? '0px' : '0px 16px'};
  flex-wrap: ${({ container, direction }: FlexProps) => !container || direction === 'row' ? 'wrap' : 'nowrap'};
  box-sizing: border-box;
`

const Index: React.SFC<FlexProps> = (props) => {
  const { children, ...rest } = props
  return (
    <FlexComponent
      {...rest}
    >
      {children}
    </FlexComponent>
  )
}

export default Index
