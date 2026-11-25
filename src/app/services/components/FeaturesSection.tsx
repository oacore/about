'use client'

import { Typography } from 'antd'
import Image from 'next/image'
import { useState } from 'react'

import Section from '@components/layout/Section'
import VideoModal from '@components/VideoModal'

import type { ServiceSection } from '../types'

import FeatureBox from './FeatureBox'

import styles from '../page.module.css'

import videoPlaceholder from '../../../assets/icons/video_placeholder.svg'

const { Title } = Typography

type FeaturesSectionProps = ServiceSection

const FeaturesSection = ({ id, description, title, video, features }: FeaturesSectionProps) => {
  const [visibleVideo, setVisibleVideo] = useState(false)
  const headingId = `${id}-title`
  const hasDescription = Boolean(description?.trim())
  const sectionClassName =
    features.length === 1
      ? `${styles.sectionContainer} ${styles.sectionContainerInline}`
      : styles.sectionContainer

  return (
    <Section aria-labelledby={headingId} className={sectionClassName} id={id}>
      <div className={styles.sectionHeader}>
        {video ? (
          <button
            aria-label={`Open video modal: ${video.title}`}
            className={styles.sectionVideoImg}
            type="button"
            onClick={() => setVisibleVideo(true)}
          >
            <div className={styles.sectionVideoInner}>
              <span className={styles.pulse} aria-hidden />
              <Image
                alt=""
                className={styles.sectionVideoThumb}
                height={148}
                sizes="(max-width: 576px) min(30vw, 9rem), 9rem"
                src={videoPlaceholder}
                width={148}
              />
            </div>
          </button>
        ) : null}

        {hasDescription ? (
          <p className={styles.sectionHeaderNote}>{description}</p>
        ) : null}
        <Title className={styles.sectionTitle} id={headingId} level={3}>
          {title}
        </Title>
      </div>
      <VideoModal onClose={() => setVisibleVideo(false)} video={visibleVideo ? video : null} />
      <div className={styles.features}>
        {features.map((feature) => (
          <FeatureBox key={feature.id} feature={feature} />
        ))}
      </div>
    </Section>
  )
}

export default FeaturesSection
