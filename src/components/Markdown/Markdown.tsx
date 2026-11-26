'use client'

import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

import { resolveRouteAlias } from '@utils/resolveRouteAlias'

import styles from './Markdown.module.css'

export type MarkdownProps = {
  children?: string | number | null
  className?: string
}

const resolveHref = (href?: string): string | undefined =>
  href ? resolveRouteAlias(href) : href

const Markdown = ({ children = '', className }: MarkdownProps) => {
  const content = String(children ?? '')

  if (!content.trim()) {
    return null
  }

  return (
    <div className={[styles.markdown, className].filter(Boolean).join(' ')}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          a: ({ href, children: linkChildren, title, className: linkClassName }) => {
            const resolvedHref = resolveHref(href)

            if (!resolvedHref) {
              return <span>{linkChildren}</span>
            }

            const isExternal = resolvedHref.startsWith('http')

            return (
              <a
                className={linkClassName}
                href={resolvedHref}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                target={isExternal ? '_blank' : undefined}
                title={title}
              >
                {linkChildren}
              </a>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default Markdown
