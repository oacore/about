'use client'

import { Typography } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'

import Markdown from '@components/Markdown/Markdown'

import styles from './testimonial.module.css'

const { Title } = Typography

export type TestimonialAuthor = {
  name: string
  role?: string
  picture?: string
}

export type TestimonialOrganization = {
  name?: string
  url?: string
  logo?: string
}

export type TestimonialProps = {
  id?: string
  content: string
  author: TestimonialAuthor
  organization?: TestimonialOrganization
  className?: string
}

const Testimonial = ({
  id,
  content,
  author,
  organization,
  className,
}: TestimonialProps) => {
  const organizationLogo = organization?.logo
  const organizationUrl = organization?.url
  const organizationName = organization?.name ?? 'Organization logo'
  const organizationLogoImage = organizationLogo ? (
    <span className={styles.organizationLogoWrap}>
      <Image
        alt={organizationName}
        className={styles.organizationLogo}
        fill
        sizes="128px"
        src={organizationLogo}
        unoptimized
      />
    </span>
  ) : null

  return (
    <article className={classNames(styles.testimonial, className)} id={id}>
      <header className={styles.author}>
        <div
          aria-label={author.picture ? undefined : author.name}
          className={styles.avatar}
          role={author.picture ? undefined : 'img'}
        >
          {author.picture ? (
            <Image
              alt={author.name}
              className={styles.avatarImage}
              fill
              sizes="56px"
              src={author.picture}
              unoptimized
            />
          ) : null}
        </div>
        <div className={styles.authorMeta}>
          <Title className={styles.authorName} level={4}>
            {author.name}
          </Title>
          {author.role ? <p className={styles.authorRole}>{author.role}</p> : null}
        </div>
      </header>
      <blockquote className={styles.quote}>
        <Markdown>{content}</Markdown>
      </blockquote>
      {organizationLogoImage ? (
        <footer className={styles.footer}>
          {organizationUrl ? (
            <a
              aria-label={organizationName}
              href={organizationUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {organizationLogoImage}
            </a>
          ) : (
            organizationLogoImage
          )}
        </footer>
      ) : null}
    </article>
  )
}

export default Testimonial
