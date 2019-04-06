import * as React from 'react'
import { Row, Col } from 'antd'
import Header from './Header'
import Footer from './Footer'
import cxs from 'cxs'

import '../styles/base.less'

const mainClassName = cxs({
  top: '4rem',
  margin: '4rem 0'
})

const mainContentClassName = cxs({
  maxWidth: '80%',
  width: '800px'
})

const Main: React.SFC = ({ children }) => (
  <Row>
    <Col span={24}>
      <Header />
    </Col>
    <Col span={24} className={mainClassName}>
      <Row type='flex' justify='center'>
        <Col className={mainContentClassName}>
          {children}
        </Col>
      </Row>
    </Col>
    <Col span={24}>
      <Footer />
    </Col>
  </Row>
)

export default Main
