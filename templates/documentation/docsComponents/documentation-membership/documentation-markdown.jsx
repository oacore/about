import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import styles from './styles.module.scss'

/* TODO replace with design */

const getNodeText = (node) => {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(getNodeText).join('')
  if (React.isValidElement(node)) return getNodeText(node.props.children)
  return ''
}

const getDescriptionColumnIndex = (children) => {
  let descriptionIndex = -1

  React.Children.forEach(children, (section) => {
    if (!React.isValidElement(section) || section.type !== 'thead') return

    React.Children.forEach(section.props.children, (row) => {
      React.Children.forEach(row.props.children, (cell, index) => {
        if (
          getNodeText(cell.props.children).trim().toLowerCase() ===
          'description'
        )
          descriptionIndex = index
      })
    })
  })

  return descriptionIndex
}

const getColumnCount = (children) => {
  let columnCount = 0

  React.Children.forEach(children, (section) => {
    if (!React.isValidElement(section) || section.type !== 'thead') return

    React.Children.forEach(section.props.children, (row) => {
      columnCount = Math.max(
        columnCount,
        React.Children.count(row.props.children)
      )
    })
  })

  return columnCount
}

const getColumnWidths = (columnCount, descriptionIndex) => {
  if (descriptionIndex < 0 || columnCount <= 1) return null

  const descriptionWidth =
    // eslint-disable-next-line no-nested-ternary
    columnCount === 2 ? 70 : columnCount === 4 ? 48 : 40
  const remainingWidth = 100 - descriptionWidth
  const otherColumnWidth = remainingWidth / (columnCount - 1)

  return Array.from({ length: columnCount }, (_, index) =>
    index === descriptionIndex ? `${descriptionWidth}%` : `${otherColumnWidth}%`
  )
}

const annotateDescriptionColumn = (children, descriptionIndex) =>
  React.Children.map(children, (section) => {
    if (!React.isValidElement(section)) return section
    if (section.type !== 'thead' && section.type !== 'tbody') return section

    return React.cloneElement(
      section,
      {},
      React.Children.map(section.props.children, (row) =>
        React.cloneElement(
          row,
          {},
          React.Children.map(row.props.children, (cell, columnIndex) =>
            React.cloneElement(cell, {
              className: [
                cell.props.className,
                columnIndex === descriptionIndex && styles.tableDescriptionCell,
              ]
                .filter(Boolean)
                .join(' '),
            })
          )
        )
      )
    )
  })

const documentationMarkdownRenderers = {
  table: ({ children }) => {
    const descriptionIndex = getDescriptionColumnIndex(children)
    const columnWidths = getColumnWidths(
      getColumnCount(children),
      descriptionIndex
    )

    return (
      <div className={styles.tableWrapper}>
        <table className={styles.docsTable}>
          {columnWidths && (
            <colgroup>
              {columnWidths.map((width, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <col key={index} style={{ width }} />
              ))}
            </colgroup>
          )}
          {descriptionIndex >= 0
            ? annotateDescriptionColumn(children, descriptionIndex)
            : children}
        </table>
      </div>
    )
  },

  code: ({ value }) => (
    <pre className={styles.codeBlock}>
      <code className={styles.codeBlockContent}>{value}</code>
    </pre>
  ),

  inlineCode: ({ children }) => (
    <code className={styles.inlineCode}>{children}</code>
  ),
}

const documentationMarkdownPlugins = [remarkGfm]

export const contentBlocksToMarkdown = (blocks = []) =>
  blocks
    .map((block) => {
      if (block.type === 'text') return block.body || ''
      if (block.type === 'table') return block.markdown || ''
      if (block.type === 'code') {
        const language = block.language || ''
        return `\`\`\`${language}\n${block.body || ''}\n\`\`\``
      }

      return ''
    })
    .filter(Boolean)
    .join('\n\n')

export const getItemDescription = (item) => {
  if (item.contentBlocks?.length)
    return contentBlocksToMarkdown(item.contentBlocks)

  return item.descriptionAbout
}

const DocumentationMarkdown = ({ children, className, ...props }) => (
  <ReactMarkdown
    plugins={documentationMarkdownPlugins}
    renderers={documentationMarkdownRenderers}
    linkTarget="_blank"
    className={className}
    {...props}
  >
    {children}
  </ReactMarkdown>
)

export default DocumentationMarkdown
