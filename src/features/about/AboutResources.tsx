'use client'

import { Button, Modal } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import { useState } from 'react'

import Markdown from '@components/Markdown/Markdown'
import ResourcesSection from '@components/ResourcesSection'
import { hasResourceAction } from '@components/outreach-materials'
import type { AboutBadge, AboutResource, AboutResourcesCopy } from '@features/about/types'

import styles from './styles.module.css'

type AboutResourcesProps = {
  copy?: AboutResourcesCopy
  materials: AboutResource[]
  badges?: AboutBadge
}

const getBadgeSource = (source?: string | null): string | undefined => {
  if (typeof source !== 'string') {
    return undefined
  }

  const trimmed = source.trim()
  return trimmed || undefined
}

/** About page resources: first 4 outreach materials, the badges card and its popup. */
const AboutResources = ({ copy, materials, badges }: AboutResourcesProps) => {
  const [isBadgesOpen, setIsBadgesOpen] = useState(false)
  const outreachMaterials = materials.filter((resource) => !hasResourceAction(resource)).slice(0, 4)
  const actionMaterials = materials.filter((resource) => hasResourceAction(resource))
  const visibleMaterials = [...outreachMaterials, ...actionMaterials]
  const images = badges?.images ?? []
  const firstColumn = images.slice(0, 4)
  const secondColumn = images.slice(4)

  const handleOpenBadges = () => {
    setIsBadgesOpen(true)
  }

  const handleCloseBadges = () => {
    setIsBadgesOpen(false)
  }

  return (
    <ResourcesSection
      id="resources"
      onActionClick={handleOpenBadges}
      resources={visibleMaterials}
      title={copy?.title}
    >
      {copy?.content || copy?.body ? <Markdown>{copy.content ?? copy.body}</Markdown> : null}
      <Modal
        className={styles.popupModal}
        closable={false}
        footer={
          <Button aria-label="Close" onClick={handleCloseBadges} type="text">
            Close
          </Button>
        }
        onCancel={handleCloseBadges}
        open={isBadgesOpen}
        title={badges?.title ? <span className={styles.badgeTitle}>{badges.title}</span> : null}
        width={1216}
      >
        <div className={classNames(styles.badgeContainer, styles.modalContent)}>
          <div className={styles.badgeDescription}>
            {badges?.descriptionAbout ? <Markdown>{badges.descriptionAbout}</Markdown> : null}
            {images.length ? (
              <div className={styles.badgeWrapper}>
                {[firstColumn, secondColumn].map((column, columnIndex) =>
                  column.length ? (
                    <div className={styles.badgeColumn} key={columnIndex === 0 ? 'first' : 'second'}>
                      {column.map((img, index) => {
                        const source = getBadgeSource(img.source)
                        const isSquare = img.file.includes('square')

                        return (
                          <div className={styles.badgeCard} key={`${img.file}-${columnIndex}-${index}`}>
                            <div className={styles.badgeImgWrapper}>
                              <Image
                                alt={badges?.title ?? 'CORE badge'}
                                className={classNames(styles.badgeImage, isSquare && styles.badgeImageHeight)}
                                height={isSquare ? 90 : 40}
                                src={img.file}
                                unoptimized
                                width={isSquare ? 90 : 200}
                              />
                            </div>
                            {source ? (
                              <div className={styles.badgeTextAlignment}>
                                <span className={styles.badgeText}>{source}</span>
                              </div>
                            ) : null}
                          </div>
                        )
                      })}
                    </div>
                  ) : null,
                )}
              </div>
            ) : null}
          </div>
        </div>
      </Modal>
    </ResourcesSection>
  )
}

export default AboutResources
