'use client'

import classNames from 'classnames'
import Image from 'next/image'

import Markdown from '@components/Markdown/Markdown'
import type { FaqBadge as FaqBadgeData } from '@features/faq/types'

import styles from './styles.module.css'

type FaqBadgeProps = {
  badge: FaqBadgeData
}

const getBadgeSource = (source?: string | null): string | undefined => {
  if (typeof source !== 'string') {
    return undefined
  }

  const trimmed = source.trim()
  return trimmed ? trimmed : undefined
}

const getBadgeImageSrc = (file: string, source?: string): string => {
  const sourceSrc = source?.match(/src="([^"]+)"/)?.[1]
  if (sourceSrc?.startsWith('http://') || sourceSrc?.startsWith('https://')) {
    return sourceSrc
  }

  return file
}

const FaqBadge = ({ badge }: FaqBadgeProps) => {
  const images = badge.images ?? []

  return (
    <section className={styles.badgeMainWrapper} id={badge.id}>
      {badge.title ? <h3 className={styles.badgeTitle}>{badge.title}</h3> : null}
      <div className={styles.badgeContainer}>
        <div className={styles.badgeDescription}>
          {badge.description ? <Markdown>{badge.description}</Markdown> : null}
          {images.length ? (
            <div className={styles.badgeWrapper}>
              {images.map((img, index) => {
                const source = getBadgeSource(img.source)
                const isSquare = img.file.includes('square')
                const imageSrc = getBadgeImageSrc(img.file, source)

                return (
                  <div className={styles.cardWrapper} key={`${img.file}-${index}`}>
                    <div className={styles.imgWrapper}>
                      <Image
                        alt={badge.title ?? 'CORE badge'}
                        className={classNames(styles.image, isSquare && styles.badgeImageHeight)}
                        height={isSquare ? 90 : 40}
                        src={imageSrc}
                        unoptimized
                        width={isSquare ? 90 : 200}
                      />
                    </div>
                    {source ? (
                      <div className={styles.textAlignment}>
                        <span className={styles.text}>{source}</span>
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default FaqBadge
