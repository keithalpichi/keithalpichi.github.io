const colors = {
  cream: '#FDF7EC',
  nude: '#FAEFDC',
  navy: '#19445C',
  teal: '#88C4C8',
  mustard: '#F7C257',
  dijon: '#E5BD64',
  burnt: '#DC885D',
  wasabi: '#9CA97D'
}

export type colorTypes = 'primary' | 'secondary' | 'success' | 'info' | 'danger'
export const colorMap: {
  primary: string
  secondary: string
  success: string
  danger: string
  info: string
} = {
  primary: colors.teal,
  secondary: colors.navy,
  success: colors.wasabi,
  danger: colors.burnt,
  info: colors.mustard
}

export default colors
