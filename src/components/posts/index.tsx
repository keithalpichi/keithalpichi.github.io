import * as React from 'react'
import { Row, Col } from 'antd'
import { format } from 'date-fns'
import { Link } from 'gatsby'
import { colors } from '../../styles'
import cxs from 'cxs'

interface IndexProps {
  location: {
    search: string
  }
  posts: Array<{
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

const postClass = cxs({
  marginBottom: '32px'
})

const excerptClass = cxs({
  marginTop: '24px'
})

const dateClass = cxs({
  color: colors.lightGreen,
  marginTop: 0
})

const titleClass = cxs({
  fontFamily: 'Cormorant Garamond'
})

const Index: React.SFC<IndexProps> = ({
  posts,
  location: { search }
}) => {
  const filter = new URLSearchParams(search).get('filter')
  const tags = filter ? new Set(filter.split('/')) : new Set([])
  const allTags = new Set([])
  posts.forEach(({ node: post }) => {
    const t = post.frontmatter.tags.split(',')
    t.forEach(t => allTags.add(t))
  })
  return (
    <React.Fragment>
      {posts
        .filter(({ node: post }) => !filter || post.frontmatter.tags.split(',').some(tag => tags.has(tag)))
        .map(({ node: post }) => (
          <Col key={post.frontmatter.path} span={24} className={postClass}>
            <h1 className={titleClass}>
              <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
            </h1>
            <h3 className={dateClass}>{format(post.frontmatter.date, 'dddd, MMMM Do YYYY')}</h3>
            <p className={excerptClass}>{post.frontmatter.excerpt}</p>
          </Col>
        ))
      }
    </React.Fragment>
  )
}

export default Index
