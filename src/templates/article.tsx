import * as React from 'react'
import { graphql } from 'gatsby'
import { format } from 'date-fns'
import { colors } from '../styles'
import { TagButton, FlexContainer, NewsletterSignUp } from '../components'
import { navigate } from '@reach/router'

interface ArticleProps {
  data: {
    markdownRemark: {
      html: string,
      frontmatter: {
        title: string
        date: string
        tags: string[]
      }
    }
  }
}

const TagButtons: React.SFC<{ tags: string[] }> = ({ tags }) => (
  <FlexContainer direction='row'>
    {tags.map(t => <TagButton onClick={() => navigate(`/tags/${t}`)} active>{t}</TagButton>)}
  </FlexContainer>
)

const Article: React.SFC<ArticleProps> = ({
  data: { markdownRemark: post }
}) => (
    <React.Fragment>
      <h1 style={{ lineHeight: 1 }}>{post.frontmatter.title}</h1>
      <h3 style={{ color: colors.lightGreen, marginTop: 0 }}>{format(post.frontmatter.date, 'dddd, MMMM Do YYYY')}</h3>
      <TagButtons tags={post.frontmatter.tags} />
      <div
        style={{
          marginTop: 64
        }}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <h2>Join the "Aloha, World" Club</h2>
      <p>🤙 Mahalo for reading! If you enjoyed this article and would like to get notified when new ones are released, be sure to join the "Aloha, World" Club below:</p>
      <NewsletterSignUp />
      <p>Make sure to check out some related posts by following one of the tags below.</p>
      <TagButtons tags={post.frontmatter.tags} />
    </React.Fragment>
  )

export default Article

export const pageQuery = graphql`
  query ArticleByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        date
        tags
      }
    }
  }
`
