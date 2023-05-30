import React from 'react'

import styles from './reference.module.scss'

const formatName = (name) => {
  const last = name.slice(name.indexOf(' ') + 1)
  return `${name.charAt()}.\u00A0${last}`
}

const formatNameList = (names) => {
  const formated = names.map(formatName)
  const left = formated.slice(0, formated.length - 1).join(', ')
  const right = formated[formated.length - 1]
  return [left, right].filter((chunk) => chunk).join(' and ')
}

const Reference = ({
  author,
  title,
  year,
  url,
  booktitle,
  editor,
  journal,
  volume,
  number,
  description,
  className = '',
  tag: Tag = 'p',
  ...restProps
}) => {
  const partials = [
    <div className={styles.cardInfo}>
      <span key="author">
        {formatNameList(Array.isArray(author) ? author : [author])}
      </span>
      {booktitle && (
        <span key="book">
          In{' '}
          {editor &&
            `${formatNameList(
              Array.isArray(editor) ? editor : [editor]
            )} (Eds.) `}
          {booktitle}
        </span>
      )}
      {journal && (
        <span key="journal">
          {journal}
          {(volume || number) && ', '}
          {volume && volume}
          {number && ` (${number})`}
        </span>
      )}
    </div>,
  ]
    .filter((item) => item)
    .reduce((result, item, i, array) => {
      result.push(...(i === array.length - 1 ? [item] : [item, '. ']))
      return result
    }, [])

  return (
    <Tag className={className} {...restProps}>
      {partials}
    </Tag>
  )
}

export default Reference
