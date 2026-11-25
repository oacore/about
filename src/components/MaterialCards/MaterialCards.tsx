'use client'

import { Section, VideoModal, type VideoModalVideo } from '@core/core-ui'
import { Button } from 'antd'
import Image from 'next/image'
import { useState } from 'react'

import styles from './MaterialCards.module.css'

export type MaterialCardAction = {
  caption: string
  url?: string
  target?: string
}

export type MaterialCardData = {
  key: string
  title?: string
  image?: string
  video?: VideoModalVideo
  action: MaterialCardAction
}

export type MaterialCardsProps = {
  cards?: MaterialCardData[]
  id?: string
  title?: string
  reverse?: boolean
  linkTarget?: string
}

const resolveActionHref = (url?: string): string | undefined => {
  if (!url) return undefined
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('#') || url.startsWith('/')) {
    return url
  }

  return `/${url}`
}

type MaterialCardProps = {
  card: MaterialCardData
  linkTarget?: string
  onVideoOpen: (video: VideoModalVideo) => void
}

const MaterialCard = ({ card, linkTarget, onVideoOpen }: MaterialCardProps) => {
  const video = card.video?.src ? card.video : undefined
  const target = linkTarget ?? card.action.target
  const href = video ? undefined : resolveActionHref(card.action.url)
  const label = card.title ?? card.action.caption

  const handleVideoOpen = () => {
    if (!video) return
    onVideoOpen(video)
  }

  const handleVideoKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    handleVideoOpen()
  }

  return (
    <article className={styles.materialsCard}>
      {video ? (
        <button
          aria-label={`Open video: ${label}`}
          className={styles.materialWrapper}
          onClick={handleVideoOpen}
          onKeyDown={handleVideoKeyDown}
          tabIndex={0}
          type="button"
        >
          <MaterialCardBody card={card} />
        </button>
      ) : href ? (
        <a
          className={styles.materialWrapper}
          href={href}
          rel={target === '_blank' ? 'noreferrer noopener' : undefined}
          target={target}
        >
          <MaterialCardBody card={card} />
        </a>
      ) : (
        <div className={styles.materialWrapper}>
          <MaterialCardBody card={card} />
        </div>
      )}
      <div className={styles.buttonWrapper}>
        {video ? (
          <Button
            className={styles.materialButton}
            onClick={handleVideoOpen}
            onKeyDown={handleVideoKeyDown}
            tabIndex={0}
            type="default"
          >
            {card.action.caption}
          </Button>
        ) : null}
        {!video && href ? (
          <Button
            className={styles.materialButton}
            href={href}
            rel={target === '_blank' ? 'noreferrer noopener' : undefined}
            target={target}
            type="default"
          >
            {card.action.caption}
          </Button>
        ) : null}
      </div>
    </article>
  )
}

type MaterialCardBodyProps = {
  card: MaterialCardData
}

const MaterialCardBody = ({ card }: MaterialCardBodyProps) => (
  <div className={styles.materialInnerWrapper}>
    {card.image ? <Image alt="" height={80} src={card.image} width={80} /> : null}
    {card.title ? <div className={styles.materialTitle}>{card.title}</div> : null}
  </div>
)

const MaterialCards = ({ cards = [], id, title, reverse = true, linkTarget }: MaterialCardsProps) => {
  const [visibleVideo, setVisibleVideo] = useState<VideoModalVideo | null>(null)

  const handleVideoOpen = (video: VideoModalVideo) => {
    setVisibleVideo(video)
  }

  const handleClose = () => {
    setVisibleVideo(null)
  }

  if (!cards.length) {
    return null
  }

  const items = reverse ? [...cards].reverse() : cards

  return (
    <Section id={id}>
      {title ? <h3 className={styles.pageTitle}>{title}</h3> : null}
      <div className={styles.cardsWrapper}>
        {items.map((card) => (
          <MaterialCard card={card} key={card.key} linkTarget={linkTarget} onVideoOpen={handleVideoOpen} />
        ))}
      </div>
      <VideoModal onClose={handleClose} video={visibleVideo} />
    </Section>
  )
}

export default MaterialCards
