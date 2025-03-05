import React from 'react'
import { classNames } from '@oacore/design/lib/utils'

import { Content } from '../content'
import Markdown from '../markdown'
import styles from './testimonial.module.scss'

const Testimonial = ({
  id,
  content,
  author,
  organization = {},
  className = '',
  roleHighlite,
  ...restProps
}) => (
  <article
    id={id}
    className={`${styles.testimonial} ${className}`}
    {...restProps}
  >
    <header className={styles.testimonialAuthor}>
      {author.picture != null ? (
        <img
          className={styles.testimonialAuthorAvatar}
          src={author.picture}
          alt={author.name}
        />
      ) : (
        <span className={styles.testimonialAuthorAvatar} />
      )}
      <h4 className={styles.testimonialAuthorName}>{author.name}</h4>
      {author.role && (
        <p
          className={classNames.use(styles.testimonialAuthorRole, {
            [styles.roleHighlite]: roleHighlite,
          })}
        >
          {author.role}
        </p>
      )}
    </header>
    <Content tag="blockquote">
      <Markdown>{content}</Markdown>
    </Content>
    {organization.logo && (
      <footer>
        <a href={organization.url} target="_blank" rel="noopener noreferrer">
          <img
            className={styles.testimonialOrganizationLogo}
            src={`/images/logos/${organization.logo}`}
            alt={organization.name}
          />
        </a>
      </footer>
    )}
  </article>
)

export default Testimonial
