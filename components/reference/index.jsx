import React from 'react'

const formatName = name => {
  const last = name.slice(name.indexOf(' ') + 1)
  return `${name.charAt()}.\u00A0${last}`
}

const formatNameList = names => {
  const formated = names.map(formatName)
  const left = formated.slice(0, formated.length - 1).join(', ')
  const right = formated[formated.length - 1]
  return [left, right].filter(chunk => chunk).join(' and ')
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
  className = '',
  tag: Tag = 'p',
  ...restProps
}) => {
  const partials = [
    <span key="author" className="reference-author">
      {formatNameList(Array.isArray(author) ? author : [author])}
    </span>,
    year && (
      <span key="year" className="reference-year">
        ({year})
      </span>
    ),
    url ? (
      <a key="title" href={url} className="reference-title">
        {title.trim()}
      </a>
    ) : (
      <span key="title" className="reference-title">
        {title}
      </span>
    ),
    booktitle && (
      <span key="book" className="reference-book">
        In{' '}
        {editor &&
          `${formatNameList(
            Array.isArray(editor) ? editor : [editor]
          )} (Eds.) `}
        {booktitle}
      </span>
    ),
    journal && (
      <span key="journal" className="reference-journal">
        {journal}
        {(volume || number) && ', '}
        {volume && volume}
        {number && ` (${number})`}
      </span>
    ),
  ]
    .filter(item => item)
    .flatMap((item, i, array) => (i === array.length - 1 ? item : [item, '. ']))

  return (
    <Tag className={`reference ${className}`} {...restProps}>
      {partials}
    </Tag>
  )
}

export default Reference
