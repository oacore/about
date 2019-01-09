import React, { Fragment } from 'react'

import './blockquote.scss'

const BlockquoteFooter = ({
  children,
  className = '',
  tag: Tag = 'footer',
  ...restProps
}) => (
  <Tag className={`blockquote-footer ${className}`} {...restProps}>
    {children}
  </Tag>
)

const BlockquoteCite = ({ name, role, tag: Tag = BlockquoteFooter }) => (
  <Tag>
    <cite className="blockquote-author-name">{name}</cite>
    {', '}
    <cite className="blockquote-author-role">{role}</cite>
  </Tag>
)

const BlockquoteAvatar = ({ src, alt, ...restProps }) => (
  <img
    className="blockquote-author-avatar"
    src={src}
    alt={alt}
    {...restProps}
  />
)

const BlockquoteAuthor = ({
  name,
  role,
  picture,
  tag: Tag = BlockquoteFooter,
  ...restProps
}) => (
  <Tag {...restProps}>
    <BlockquoteCite name={name} role={role} tag={Fragment} />
    {picture && <BlockquoteAvatar src={picture} alt={name} />}
  </Tag>
)

const Blockquote = ({
  children,
  className = '',
  tag: Tag = 'blockquote',
  avatar = false,
  ...restProps
}) => (
  <Tag
    className={`blockquote ${avatar ? 'blockquote-avatar' : ''} ${className}`}
    {...restProps}
  >
    {children}
  </Tag>
)

Blockquote.Footer = BlockquoteFooter
Blockquote.Author = BlockquoteAuthor
Blockquote.Avatar = BlockquoteAvatar
Blockquote.Cite = BlockquoteCite

export default Blockquote
export { BlockquoteFooter, BlockquoteCite, BlockquoteAvatar, BlockquoteAuthor }
