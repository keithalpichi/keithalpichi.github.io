import * as React from "react";
import { Row, Col } from "antd";
import cxs from "cxs";

const footerClassName = cxs({
  height: "4rem",
  boxShadow: "0 -1px 3px rgba(0,0,0,0.05)",
})

const textClassName = cxs({
  textAlign: "center"
})

const Footer: React.SFC = () => (
  <Row type="flex" align="middle" justify="center" className={footerClassName}>
    <Col span={24}><p className={textClassName}>Built by Keith Alpichi 🤙</p></Col>
  </Row>
);

export default Footer;