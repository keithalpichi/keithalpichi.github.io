import * as React from 'react'
import { FlexContainer } from '../layout'
import { format } from 'date-fns'
import { Link } from 'gatsby'
import { colors } from '../../styles'
import { css } from 'linaria'
import { TagButton } from '../buttons'
import { navigate } from '@reach/router'

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
        tags: string[]
      }
    }
  }>
}

const postClass = css`
  margin-bottom: 32px;
`

const excerptClass = css`
  margin-top: 24px;
`

const dateClass = css`
  color: ${colors.lightGreen};
  margin-top: 0px;
`

const titleClass = css`
  line-height: 1;
`

const Index: React.SFC<IndexProps> = (props) => {
  const {
    posts,
    location: { search }
  } = props
  const onTagClick = (t: string) => {
    const currentFilters = new URLSearchParams(search).get('filter')
    const tags = new Set(currentFilters ? currentFilters.split(',') : [])
    if (tags.has(t)) {
      tags.delete(t)
    } else {
      tags.add(t)
    }
    const newFilters = new URLSearchParams()
    const tagsArray: string[] = []
    tags.forEach(t => tagsArray.push(t))
    let newRoute = '/'
    if (tagsArray.length > 0) {
      newFilters.set('filter', tagsArray.join(','))
      newRoute = `/?${newFilters.toString()}`
    }
    return navigate(newRoute)
  }
  const filter = new URLSearchParams(search).get('filter')
  const filterTags = filter ? new Set(filter.split(',')) : new Set([])
  const allTags: any = posts.reduce((obj, { node: { frontmatter: { tags } } }) => {
    const newObj: any = { ...obj }
    tags.forEach((t: string) => {
      if (filter && filterTags.has(t)) {
        newObj[t] = 'active'
      } else {
        newObj[t] = 'inactive'
      }
    })
    return newObj
  }, {})
  let tagButtons: { status: string, tag: string }[] = []
  for (const tag in allTags) {
    if (!allTags.hasOwnProperty(tag)) {
      continue
    }
    tagButtons.push({ tag, status: allTags[tag] })
  }
  tagButtons.sort((a, b) => a.tag < b.tag ? -1 : 1)
  return (
    <FlexContainer direction='column'>
      <FlexContainer direction='row'>
        {tagButtons.map(t => <TagButton onClick={() => onTagClick(t.tag)} active={t.status === 'active'}>{t.tag}</TagButton>)}
      </FlexContainer>
      {posts
        .filter(({ node: { frontmatter: { tags } } }) => filter ? tags.some(t => allTags[t] === 'active') : true)
        .map(({ node: post }) => (
          <FlexContainer noPadding direction='column' key={post.frontmatter.path} column={12} className={postClass}>
            <h1 className={titleClass}>
              <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
            </h1>
            <h3 className={dateClass}>{format(post.frontmatter.date, 'dddd, MMMM Do YYYY')}</h3>
            <p className={excerptClass}>{post.frontmatter.excerpt}</p>
          </FlexContainer>
        ))
      }
    </FlexContainer>
  )
}

export default Index
