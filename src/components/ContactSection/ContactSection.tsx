'use client'

import { Section } from '@core/core-ui'
import { Button, type ButtonProps } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'

import Markdown from '@components/Markdown/Markdown'

import styles from './ContactSection.module.css'

export type ContactSectionAction = {
  title?: string
  url?: string
  /** Content-style variant (old @oacore/design Button). Defaults to `contained`. */
  variant?: 'contained' | 'outlined' | 'text'
  target?: string
}

export type ContactSectionProps = {
  id?: string
  title?: string
  /** Markdown shown in the bordered box above the button(s). */
  description?: string
  image?: string
  imageWidth?: number
  imageHeight?: number
  /** Single button; use `actions` for several. */
  action?: ContactSectionAction
  actions?: ContactSectionAction[]
  className?: string
}

const BUTTON_PROPS: Record<
  NonNullable<ContactSectionAction['variant']>,
  Pick<ButtonProps, 'type' | 'variant'>
> = {
  contained: { type: 'primary' },
  outlined: { type: 'primary', variant: 'outlined' },
  text: { type: 'link' },
}

const resolveHref = (url: string): string =>
  /^(https?:|mailto:|#|\/)/.test(url) ? url : `/${url}`

const ContactButton = ({ title, url, variant = 'contained', target }: ContactSectionAction) => {
  if (!url || !title) {
    return null
  }

  const href = resolveHref(url)
  const resolvedTarget = target ?? (href.startsWith('http') ? '_blank' : undefined)

  return (
    <Button
      className={styles.button}
      href={href}
      rel={resolvedTarget === '_blank' ? 'noopener noreferrer' : undefined}
      target={resolvedTarget}
      {...BUTTON_PROPS[variant]}
    >
      {title}
    </Button>
  )
}

const ContactSection = ({
  id = 'contact',
  title,
  description,
  image,
  imageWidth = 600,
  imageHeight = 400,
  action,
  actions,
  className,
}: ContactSectionProps) => {
  const buttons = actions ?? (action ? [action] : [])

  return (
    <Section className={classNames(styles.contact, className)} id={id}>
      <div className={styles.content}>
        {title ? <h3 className={styles.title}>{title}</h3> : null}
        <div className={styles.box}>
          {description ? <Markdown className={styles.description}>{description}</Markdown> : null}
          {buttons.length ? (
            <div className={styles.actions}>
              {buttons.map((item) => (
                <ContactButton key={`${item.title}-${item.url}`} {...item} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
      {image ? (
        <div className={styles.media}>
          <Image
            alt=""
            className={styles.image}
            height={imageHeight}
            src={image}
            unoptimized
            width={imageWidth}
          />
        </div>
      ) : null}
    </Section>
  )
}

export default ContactSection
