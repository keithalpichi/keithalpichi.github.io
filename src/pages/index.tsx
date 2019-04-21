import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Flex, FlexContainer } from '../components'
import { graphql } from 'gatsby'
import { css } from 'linaria'
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

const headingClass = css`
  color: ${colors.default.green};
  margin: 0px;
  font-size: 6rem;
  font-weight: 900;
  text-align: center;
  text-transform: uppercase;
  @media screen and (max-width: 40em) {
    font-size: 4rem;
  }
`

const postsClass = css`
  margin-top: 48px;
`

const Index: React.SFC<IndexProps> = ({
  data: { allMarkdownRemark: { edges: posts } },
  location
}) => (
    <React.Fragment>
      <Helmet title='Keith Alpichi | Blog' />
      <FlexContainer>
        <Flex column={12}>
          <h1 className={headingClass}>Aloha 🤙</h1>
        </Flex>
      </FlexContainer>
      <FlexContainer className={postsClass}>
        <Posts posts={posts} location={location} />
      </FlexContainer>
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
