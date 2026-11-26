'use client'

import { Button, List } from 'antd'
import dayjs from 'dayjs'

import { CORE_BLOG_URL } from '@features/about/constants'
import type { AboutBlogPost, AboutBlogSection } from '@features/about/types'

import styles from './styles.module.css'

type BlogFeedProps = {
  copy?: AboutBlogSection
  posts: AboutBlogPost[]
}

const BlogFeed = ({ copy, posts }: BlogFeedProps) => {
  if (!copy?.title && !posts.length) {
    return null
  }

  return (
    <aside className={styles.blog}>
      {copy?.title ? <h4 className={styles.blogTitle}>{copy.title}</h4> : null}
      {posts.length ? (
        <List
          className={styles.blogList}
          dataSource={posts.slice(0, 5)}
          renderItem={(post) => (
            <List.Item>
              <List.Item.Meta
                description={post.pubDate ? dayjs(post.pubDate).format('DD/MM/YYYY, HH:mm:ss') : undefined}
                title={
                  <a href={post.link} rel="noopener noreferrer" target="_blank">
                    {post.title}
                  </a>
                }
              />
            </List.Item>
          )}
        />
      ) : null}
      {copy?.actionLabel ? (
        <Button className={styles.blogButton} href={CORE_BLOG_URL} target="_blank" type="text">
          {copy.actionLabel}
        </Button>
      ) : null}
    </aside>
  )
}

export default BlogFeed
