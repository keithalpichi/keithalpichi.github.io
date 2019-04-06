import * as React from 'react'
import { Row, Col } from 'antd'
import Main from '../layouts/Main'
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
            tags: string
          }
        }
      }>
    }
  }
}

const headingClass = cxs({
  color: colors.default.green,
  fontSize: '6rem',
  fontWeight: 900,
  textAlign: 'center'
})

const postsClass = cxs({
  marginTop: '84px'
})

const Index: React.SFC<IndexProps> = ({
  data: { allMarkdownRemark: { edges: posts } },
  location
}) => (
    <Main>
      <Row type='flex'>
        <Col span={24}>
          <h1 className={headingClass}>Aloha 🤙</h1>
        </Col>
      </Row>
      <Row className={postsClass}>
        <Posts posts={posts} location={location} />
      </Row>
    </Main>
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
