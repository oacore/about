'use client'

import { Section } from '@core/core-ui'
import classNames from 'classnames'
import Image from 'next/image'
import type { ReactNode } from 'react'

import Markdown from '@components/Markdown/Markdown'

import styles from './HowItWorksSection.module.css'

export type HowItWorksVideo = {
  src: string
  title: string
}

export type HowItWorksSectionData = {
  title?: string
  description?: string
  image?: string
  video?: HowItWorksVideo
}

export type HowItWorksSectionProps = {
  data: HowItWorksSectionData
  id?: string
  className?: string
  imageWidth?: number
  imageHeight?: number
  imageAlt?: string
  actions?: ReactNode
  actionsClassName?: string
}

const DEFAULT_IMAGE_WIDTH = 360
const DEFAULT_IMAGE_HEIGHT = 330

type VideoEmbedProps = HowItWorksVideo

const VideoEmbed = ({ src, title }: VideoEmbedProps) => (
  <iframe allowFullScreen className={styles.video} src={src} title={title} />
)

const HowItWorksSection = ({
  data,
  id = 'how-it-works',
  className,
  imageWidth = DEFAULT_IMAGE_WIDTH,
  imageHeight = DEFAULT_IMAGE_HEIGHT,
  imageAlt,
  actions,
  actionsClassName,
}: HowItWorksSectionProps) => {
  const { title, description, image, video } = data

  if (!title && !description && !image && !video && !actions) {
    return null
  }

  const hasMedia = Boolean(image || video)
  const altText = imageAlt ?? title ?? 'How it works'

  return (
    <Section className={className ?? styles.section} id={id}>
      {hasMedia ? (
        <div className={styles.imageWrapper}>
          {image ? (
            <Image alt={altText} height={imageHeight} src={image} width={imageWidth} />
          ) : video ? (
            <VideoEmbed src={video.src} title={video.title} />
          ) : null}
        </div>
      ) : null}
      <article className={styles.content}>
        {title ? <h3 className={styles.title}>{title}</h3> : null}
        {description ? <Markdown>{description}</Markdown> : null}
        {actions ? <div className={classNames(styles.actions, actionsClassName)}>{actions}</div> : null}
      </article>
    </Section>
  )
}

export default HowItWorksSection
