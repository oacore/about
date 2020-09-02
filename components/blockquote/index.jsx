import React, { Fragment } from 'react'

import styles from './blockquote.module.scss'

const BlockquoteFooter = ({
  children,
  className = '',
  tag: Tag = 'footer',
  ...restProps
}) => (
  <Tag className={`${styles.blockquoteFooter} ${className}`} {...restProps}>
    {children}
  </Tag>
)

const BlockquoteCite = ({ name, role, tag: Tag = BlockquoteFooter }) => (
  <Tag>
    <cite>{name}</cite>
    {role && (
      <>
        , <cite>{role}</cite>
      </>
    )}
  </Tag>
)

const BlockquoteAvatar = ({ src, alt, ...restProps }) => (
  <img
    className={styles.blockquoteAuthorAvatar}
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
    className={`${styles.blockquote} ${
      avatar ? styles.blockquoteAvatar : ''
    } ${className}`}
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
