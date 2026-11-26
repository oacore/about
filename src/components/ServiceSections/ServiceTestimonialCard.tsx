'use client'

import { Button } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'

import Markdown from '@components/Markdown/Markdown'

import styles from './ServiceTestimonialCard.module.css'

export type ServiceTestimonialAction = {
  url: string
  title?: string
  caption?: string
  variant?: string
}

export type ServiceTestimonialCardProps = {
  name: string
  role?: string
  picture: string
  /** Markdown quote. */
  quote: string
  action?: ServiceTestimonialAction
  className?: string
  /** Overrides the default italic quote styling. */
  quoteClassName?: string
}

const ServiceTestimonialCard = ({
  name,
  role,
  picture,
  quote,
  action,
  className,
  quoteClassName,
}: ServiceTestimonialCardProps) => (
  <article className={classNames(styles.testimonial, className)}>
    <div className={styles.header}>
      <Image alt={name} className={styles.picture} height={56} src={picture} width={56} />
      <div className={styles.info}>
        <Markdown>{name}</Markdown>
        {role ? <Markdown className={styles.infoRole}>{role}</Markdown> : null}
      </div>
    </div>
    <Markdown className={quoteClassName ?? styles.quote}>{quote}</Markdown>
    {action ? (
      <Button
        className={styles.button}
        href={action.url}
        type={action.variant === 'outlined' ? 'default' : 'primary'}
      >
        {action.title ?? action.caption}
      </Button>
    ) : null}
  </article>
)

export default ServiceTestimonialCard
