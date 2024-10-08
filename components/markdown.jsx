import React from 'react'
import ReactMarkdown from 'react-markdown'

import Link from './link'

/* eslint-disable jsx-a11y/anchor-is-valid */

// We pass additional link because Markdown component does not render
// pure text but renders own TextRenderer componet instead
const MarkdownLink = ({ href, title, children }) => (
  <Link href={href} passHref>
    <a
      target={
        href.includes('.pdf') || !href.includes('core.ac.uk')
          ? '_blank'
          : '_self'
      }
      title={title}
    >
      {children}
    </a>
  </Link>
)

const MarkdownImage = ({ src, alt, className = '', ...restProps }) => (
  <img
    className={`img-fluid ${className}`}
    src={src}
    alt={alt}
    {...restProps}
  />
)

const markdownConfig = {
  escapeHtml: false,

  renderers: {
    blockquote: ({ children }) => (
      <blockquote className="blockquote">{children}</blockquote>
    ),

    table: ({ children }) => (
      <table className="table table-hover">{children}</table>
    ),

    image: MarkdownImage,
    link: MarkdownLink,
    linkReference: MarkdownLink,
  },
}

const Markdown = ({ children, tag, ...markdownProps }) => (
  <ReactMarkdown {...markdownConfig} {...markdownProps}>
    {children}
  </ReactMarkdown>
)

export default Markdown
