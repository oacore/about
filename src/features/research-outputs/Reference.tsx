import classNames from 'classnames'
import type { ElementType } from 'react'

import styles from './styles.module.css'

type ReferenceProps = {
  author?: string | string[]
  title?: string
  year?: string | number
  url?: string
  booktitle?: string
  editor?: string | string[]
  journal?: string
  volume?: string | number
  number?: string | number
  description?: string
  className?: string
  tag?: ElementType
}

const formatName = (name: string): string => {
  const last = name.slice(name.indexOf(' ') + 1)
  return `${name.charAt(0)}.\u00A0${last}`
}

const formatNameList = (names: string[]): string => {
  const formatted = names.map(formatName)
  const left = formatted.slice(0, formatted.length - 1).join(', ')
  const right = formatted[formatted.length - 1]
  return [left, right].filter(Boolean).join(' and ')
}

const Reference = ({
  author,
  booktitle,
  editor,
  journal,
  volume,
  number,
  className,
  tag: Tag = 'div',
}: ReferenceProps) => {
  const authors = author ? (Array.isArray(author) ? author : [author]) : []
  const editors = editor ? (Array.isArray(editor) ? editor : [editor]) : []

  return (
    <Tag className={classNames(styles.cardInfo, className)}>
      {authors.length ? <span>{formatNameList(authors)}</span> : null}
      {booktitle ? (
        <span>
          In{' '}
          {editors.length ? `${formatNameList(editors)} (Eds.) ` : null}
          {booktitle}
        </span>
      ) : null}
      {journal ? (
        <span>
          {journal}
          {volume || number ? ', ' : null}
          {volume ? volume : null}
          {number ? ` (${number})` : null}
        </span>
      ) : null}
    </Tag>
  )
}

export default Reference
