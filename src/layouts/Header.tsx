import * as React from 'react'
import { Link } from 'gatsby'
import { Row, Col } from 'antd'
import { colors } from '../styles'
import cxs from 'cxs'

interface HeaderLinkProps {
  to: string
  main?: boolean
}
const mainHeaderLinkClassName = cxs({
  letterSpacing: 2,
  margin: 0,
  '@media screen and (max-width: 40em)': {
    fontSize: '16px'
  },
  '@media screen and (max-width: 20em)': {
    fontSize: '14px'
  }
})
const headerLinkClassName = cxs({
  letterSpacing: 2,
  margin: 0,
  '@media screen and (max-width: 40em)': {
    fontSize: '12px'
  },
  '@media screen and (max-width: 20em)': {
    fontSize: '10px'
  }
})

const HeaderLink: React.SFC<HeaderLinkProps> = ({ to, main, children }) => (
  <Col style={{
    // border: main ? 'unset' : `solid 1px ${colors.black}`,
    // borderRadius: main ? 'unset' : 4,
    // padding: main ? 'inherit' : '4px 10px'
    display: 'flex',
    alignItems: 'center'
  }}><Link to={to}>{children}</Link></Col>
)

const headerClassName = cxs({
  height: '4rem',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  background: colors.white,
  zIndex: 999,
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  padding: '16px',
  textDecoration: 'none'
})

const iconLinkClassName = cxs({
  cursor: 'pointer',
  color: colors.black,
  fontSize: '1.5rem',
  marginRight: '10px'
})

const Header: React.SFC = () => (
  <Row type='flex' align='middle' className={headerClassName}>
    <Col span={8}>
      <HeaderLink to='/' main>
        <h2 className={mainHeaderLinkClassName}>Keith Alpichi</h2>
      </HeaderLink>
    </Col>
    <Col span={16}>
      <Row type='flex' justify='end' gutter={16}>
        <a href='https://www.linkedin.com/in/keithalpichi' className={iconLinkClassName}><i className='fab fa-linkedin'></i></a>
        <a href='https://github.com/keithalpichi' className={iconLinkClassName}><i className='fab fa-github-square'></i></a>
        <HeaderLink to='/about'>
          <h3 className={headerLinkClassName}>About</h3>
        </HeaderLink>
        {/* <HeaderLink to="/blog">
          <h3 className={headerLinkClassName}>Articles</h3>
        </HeaderLink>
        <HeaderLink to="/projects">
          <h3 style={{ margin: 0 }}>Projects</h3>
        </HeaderLink> */}
      </Row>
    </Col>
  </Row>
)

export default Header
