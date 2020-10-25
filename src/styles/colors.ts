// colors inspired from https://coolors.co/f9f9f9-898da0-5d637d-4d5267-0a0908
const colors = {
  white: '#FFFFFF',
  grayWhite: '#F9F9F9',
  cream: '#f5f4e9',
  gray: '#b0b3c5',
  blueGray: '#5D637D',
  darkBlueGray: '#4D5267',
  black: '#182b1a',
  lightGreen: '#b3c3b4',
  green: '#519657',
  darkGreen: '#38693c',
  salmon: '#d86131',
  darkBrown: '#2b1d0e'
}

export type colorTypes = 'primary' | 'success' | 'info' | 'danger'
export const colorMap: {
  primary: string
  success: string
  danger: string
  info: string
} = {
  primary: colors.cream,
  success: colors.green,
  danger: colors.salmon,
  info: colors.gray
}

export default colors
