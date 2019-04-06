import * as React from 'react'
import { graphql } from 'gatsby'
import Main from '../layouts/Main'
import { format } from 'date-fns'
import { colors } from '../styles'

interface ArticleProps {
  data: {
    markdownRemark: {
      html: string,
      frontmatter: {
        title: string
        date: string
      }
    }
  }
}

const Article: React.SFC<ArticleProps> = ({
  data: { markdownRemark: post }
}) => (
    <Main>
      <h1 style={{ fontFamily: 'Cormorant Garamond' }}>{post.frontmatter.title}</h1>
      <h3 style={{ color: colors.lightGreen, marginTop: 0 }}>{format(post.frontmatter.date, 'dddd, MMMM Do YYYY')}</h3>
      <div
        style={{
          marginTop: 64
        }}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </Main>
  )

export default Article

export const pageQuery = graphql`
  query ArticleByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`
