import * as React from 'react'
import { Link } from 'gatsby'
import { colors } from '../styles'
import { Flex, FlexContainer } from '../components/layout'
import { css } from 'linaria'

interface HeaderLinkProps {
  to: string
}

const mainHeaderLinkClassName = css`
  color: ${colors.darkBrown};
  letter-spacing: 2px;
  margin: 0px;
  @media screen and (max-width: 40em) {
    font-size: 20px;
  }
  @media screen and (max-width: 20em) {
    font-size: 18px;
  }
`

const headerLinkClassName = css`
  color: ${colors.darkBrown};
  letter-spacing: 2px;
  margin: 0px;
  @media screen and (max-width: 40em) {
    font-size: 16px;
  }
  @media screen and (max-width: 20em) {
    font-size: 14px;
  }
`

const HeaderLink: React.SFC<HeaderLinkProps> = ({ to, children }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Link to={to}>{children}</Link>
  </div>
)

const headerClassName = css`
  height: 4rem;
  position: fixed;
  top: 0px;
  background: ${colors.cream};
  z-index: 1;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  padding: 16px 0;
  text-decoration: none;
  width: 100%;
`

const iconLinkClassName = css`
  cursor: pointer;
  color: ${colors.darkBrown};
  font-size: 1.5rem;
  margin-right: 10px;
`

const Header: React.SFC = () => (
  <Flex container column={12} className={headerClassName}>
    <FlexContainer alignItems='center' column={6}>
      <HeaderLink to='/'>
        <h2 className={mainHeaderLinkClassName}>Keith Alpichi</h2>
      </HeaderLink>
    </FlexContainer>
    <FlexContainer justifyContent='flex-end' column={6}>
      <a href='https://www.linkedin.com/in/keithalpichi' className={iconLinkClassName}><i className='fab fa-linkedin'></i></a>
      <a href='https://github.com/keithalpichi' className={iconLinkClassName}><i className='fab fa-github-square'></i></a>
      <a href='https://twitter.com/keithalpichi' className={iconLinkClassName}><i className='fab fa-twitter-square'></i></a>
      <HeaderLink to='/about'>
        <h3 className={headerLinkClassName}>About</h3>
      </HeaderLink>
    </FlexContainer>
  </Flex>
)

export default Header
