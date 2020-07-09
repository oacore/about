import React from 'react'

import { Content } from '../content'
import Markdown from '../markdown'

const Testimonial = ({
  id,
  content,
  author,
  organization = {},
  className = '',
  ...restProps
}) => (
  <article id={id} className={`testimonial ${className}`} {...restProps}>
    <header className="testimonial-author">
      {author.picture != null ? (
        <img
          className="testimonial-author-avatar"
          src={author.picture}
          alt={author.name}
        />
      ) : (
        <span className="testimonial-author-avatar" />
      )}
      <h4 className="testimonial-author-name">{author.name}</h4>
      {author.role && <p className="testimonial-author-role">{author.role}</p>}
    </header>
    <Content tag="blockquote">
      <Markdown>{content}</Markdown>
    </Content>
    {organization.logo && (
      <footer className="testimonial-footer">
        <a href={organization.url} target="_blank" rel="noopener noreferrer">
          <img
            className="testimonial-organization-logo"
            src={`/images/logos/${organization.logo}`}
            alt={organization.name}
          />
        </a>
      </footer>
    )}
  </article>
)

export default Testimonial
