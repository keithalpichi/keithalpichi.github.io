import * as React from 'react'
import { Row, Col } from 'antd'
import { graphql } from 'gatsby'
import cxs from 'cxs'
import Posts from '../components/posts'
import * as colors from '../styles/colors'

interface IndexProps {
  location: {
    search: string
  }
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          frontmatter: {
            path: string
            title: string
            date: string
            excerpt: string
            tags: string[]
          }
        }
      }>
    }
  }
}

const headingClass = cxs({
  color: colors.default.green,
  margin: 0,
  fontSize: '6rem',
  fontWeight: 900,
  textAlign: 'center'
})

const postsClass = cxs({
  marginTop: '48px'
})

const Index: React.SFC<IndexProps> = ({
  data: { allMarkdownRemark: { edges: posts } },
  location
}) => (
    <React.Fragment>
      <Row type='flex'>
        <Col span={24}>
          <h1 className={headingClass}>Aloha 🤙</h1>
        </Col>
      </Row>
      <Row className={postsClass}>
        <Posts posts={posts} location={location} />
      </Row>
    </React.Fragment>
  )

export default Index

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            title
            path
            date
            excerpt
            tags
          }
        }
      }
    }
  }
`
