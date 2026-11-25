'use client'

import { Section } from '@core/core-ui'
import { Button, type ButtonProps } from 'antd'
import Image from 'next/image'
import type { ReactNode } from 'react'

import Markdown from '@components/Markdown/Markdown'

import styles from './Header.module.css'

export type HeaderAction = {
  caption?: string
  title?: string
  url: string
  variant?: 'contained' | 'outlined' | 'text'
  target?: string
  download?: boolean
}

export type HeaderProps = {
  id?: string
  icon?: string
  title?: string
  description?: string
  demo?: string
  caption?: string
  actions?: HeaderAction[]
  image?: string
  className?: string
  reverse?: boolean
  spacing?: boolean
  borderBottom?: boolean
  actionButton?: HeaderAction
  hideButtons?: boolean
  logoAlt?: string
  contentClassName?: string
  logoWrapClassName?: string
  iconClassName?: string
  metaClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  descriptionNode?: ReactNode
  navLinks?: ReactNode
  navLinksClassName?: string
}

const joinClasses = (...classes: Array<string | false | undefined>): string =>
  classes.filter(Boolean).join(' ')

const resolveActionHref = (url: string): string => {
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('#')) {
    return url
  }
  if (url.startsWith('/')) {
    return url
  }
  return `/${url}`
}

const ACTION_BUTTON_PROPS: Record<
  NonNullable<HeaderAction['variant']>,
  Pick<ButtonProps, 'type' | 'variant' | 'color'>
> = {
  contained: { type: 'primary' },
  outlined: { color: 'primary', variant: 'outlined' },
  text: { type: 'link' },
}

const Header = ({
  id,
  icon,
  title,
  description,
  demo,
  caption,
  actions,
  image,
  className,
  reverse = false,
  spacing = false,
  borderBottom = false,
  actionButton,
  hideButtons = false,
  logoAlt,
  contentClassName,
  logoWrapClassName,
  iconClassName,
  metaClassName,
  titleClassName,
  descriptionClassName,
  descriptionNode,
  navLinks,
  navLinksClassName,
}: HeaderProps) => (
  <Section
    className={joinClasses(styles.header, borderBottom && styles.customHeader, className)}
    id={id}
  >
    <div className={joinClasses(styles.content, contentClassName)}>
      <div className={joinClasses(styles.meta, spacing && styles.spacing, metaClassName)}>
        {icon ? (
          <img
            alt={title ?? logoAlt ?? 'icon'}
            className={joinClasses(styles.icon, iconClassName)}
            src={icon}
          />
        ) : null}
        <div className={styles.metaText}>
          {demo ? <span className={styles.demo}>{demo}</span> : null}
          {title ? <h1 className={joinClasses(styles.title, titleClassName)}>{title}</h1> : null}
        </div>
      </div>
      <div className={joinClasses(styles.default, reverse && styles.reverse)}>
        {descriptionNode ? (
          <div className={joinClasses(styles.description, descriptionClassName)}>{descriptionNode}</div>
        ) : description ? (
          <Markdown className={joinClasses(styles.description, descriptionClassName)}>
            {description}
          </Markdown>
        ) : null}
        {caption ? (
          <Markdown className={joinClasses(styles.caption, reverse && styles.reverseStyle)}>
            {caption}
          </Markdown>
        ) : null}
      </div>
      {actionButton ? (
        <Button
          className={styles.flyerButton}
          download={actionButton.download}
          href={resolveActionHref(actionButton.url)}
          key={actionButton.caption ?? actionButton.title}
          target={actionButton.target}
          {...ACTION_BUTTON_PROPS[actionButton.variant ?? 'contained']}
        >
          {actionButton.caption ?? actionButton.title}
        </Button>
      ) : null}
      {!hideButtons && actions?.length ? (
        <div className={styles.group}>
          {actions.map((action, index) => (
            <Button
              key={`${action.url}-${index}`}
              download={action.download}
              href={resolveActionHref(action.url)}
              target={action.target}
              {...ACTION_BUTTON_PROPS[action.variant ?? 'contained']}
            >
              {action.caption ?? action.title}
            </Button>
          ))}
        </div>
      ) : null}
    </div>
    {navLinks ? (
      <div className={joinClasses(styles.navLinks, navLinksClassName)}>{navLinks}</div>
    ) : null}
    {image ? (
      <div className={joinClasses(styles.logoWrap, logoWrapClassName)}>
        <Image
          alt={logoAlt ?? title ?? 'logo'}
          className={styles.logo}
          height={600}
          priority
          src={image}
          width={800}
        />
      </div>
    ) : null}
  </Section>
)

export default Header
