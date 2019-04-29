import { styled } from 'linaria/react'
import { colors } from '../../styles'

// TODO edit :focus to show success/error on input change validation
export const Input = styled.input`
  background: ${colors.white};
  padding: 10px 12px;
  border-radius: 4px;
  border: solid 1px ${colors.black};
  font-size: 1em;
  margin: 6px;
  &:focus {
    outline: none;
  }
`
