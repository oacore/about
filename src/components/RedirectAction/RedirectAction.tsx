'use client'

import { Button } from 'antd'
import classNames from 'classnames'

import Markdown from '@components/Markdown/Markdown'

import styles from './RedirectAction.module.css'

export type RedirectActionLink = {
  title?: string
  link?: string
  target?: string
}

export type RedirectActionProps = {
  /** Markdown shown next to the button. */
  text?: string
  action?: RedirectActionLink
  buttonType?: 'primary' | 'default'
  /**
   * `boxed`: text and button share one grey box (research outputs).
   * `split`: grey text box with the button beside it (REF).
   */
  variant?: 'boxed' | 'split'
  className?: string
}

const resolveHref = (url: string): string =>
  /^(https?:|mailto:|#|\/)/.test(url) ? url : `/${url}`

const RedirectAction = ({
  text,
  action,
  buttonType = 'primary',
  variant = 'boxed',
  className,
}: RedirectActionProps) => {
  if (!text && !action?.link) {
    return null
  }

  const href = action?.link ? resolveHref(action.link) : undefined
  const target = action?.target ?? (href?.startsWith('http') ? '_blank' : undefined)

  return (
    <div className={classNames(styles.wrapper, styles[variant], className)}>
      {text ? <Markdown className={styles.text}>{text}</Markdown> : null}
      {href ? (
        <Button
          className={styles.button}
          href={href}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          target={target}
          type={buttonType}
          variant={buttonType === 'default' ? 'outlined' : undefined}
        >
          {action?.title}
        </Button>
      ) : null}
    </div>
  )
}

export default RedirectAction
