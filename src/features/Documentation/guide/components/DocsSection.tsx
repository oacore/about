'use client'

import { ExportOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { Button, Divider, Flex, Tag, Typography } from 'antd'
import classNames from 'classnames'
import { memo } from 'react'

import Markdown from '@components/Markdown/Markdown'

import type { DocsImage, DocsItem, DocsTutorial } from '../types'

import styles from './DocsSection.module.css'

export type DocsSectionProps = {
  item: DocsItem
  /** The section currently in view (driven by the nav's scroll-spy). */
  active: boolean
  imageSource?: boolean
  onOpenTutorial: (tutorial: DocsTutorial) => void
}

const DocsFigure = ({
  image,
  itemId,
  imageSource,
}: {
  image: DocsImage
  itemId: string
  imageSource?: boolean
}) => (
  <figure className={classNames(styles.figure, image.source && styles.figureWithCaption)}>
    <div
      className={classNames(
        image.source && styles.figureMedia,
        imageSource && styles.figureMediaSpread,
      )}
    >
      {/* Content images (screenshots, badges, banners) at their own size; not a UI element */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={image.source ?? 'Documentation image'}
        className={classNames(styles.image, {
          [styles.imageHalf]: itemId === 'logo-banner' || itemId === 'personalised-banner',
          [styles.imageBadge]: Boolean(image.source),
          [styles.imageBadgeSquare]: image.source?.includes('square'),
        })}
        src={image.file}
      />
    </div>
    {image.source ? (
      <figcaption className={styles.caption}>
        <Typography.Text>{image.source}</Typography.Text>
      </figcaption>
    ) : null}
  </figure>
)

const DocsSection = ({ item, active, imageSource, onOpenTutorial }: DocsSectionProps) => {
  const membershipTypes = item.membershipTypes ?? item['membership-types']
  const hasMeta = Boolean(membershipTypes || item.redirect)

  return (
    <>
      {item.divider ? <Divider className={styles.groupDivider} /> : null}
      <section className={styles.section} data-doc-section id={item.id}>
        <Typography.Title className={classNames(styles.title, active && styles.titleActive)} level={3}>
          {item.title}
        </Typography.Title>

        {hasMeta ? (
          <Flex align="center" className={styles.meta} gap={24} wrap>
            {membershipTypes ? (
              <Flex align="center" gap={4} wrap>
                {Object.entries(membershipTypes).map(([label, value]) => (
                  <Tag
                    className={classNames(
                      styles.membership,
                      value === 'Yes' ? styles.membershipEnabled : styles.membershipDisabled,
                    )}
                    key={label}
                  >
                    {label}
                  </Tag>
                ))}
                {item.tutorial ? (
                  <Button
                    aria-label={`Open tutorial: ${item.tutorial.title ?? item.tutorial.text}`}
                    className={styles.tutorial}
                    icon={<PlayCircleOutlined />}
                    iconPosition="end"
                    onClick={() => item.tutorial && onOpenTutorial(item.tutorial)}
                    type="link"
                  >
                    {item.tutorial.text}
                  </Button>
                ) : null}
              </Flex>
            ) : null}

            {item.redirect ? (
              <Typography.Link
                aria-label={`Open ${item.redirect.text} in new tab`}
                className={styles.redirect}
                href={item.redirect.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                {item.redirect.text} <ExportOutlined />
              </Typography.Link>
            ) : null}
          </Flex>
        ) : null}

        <Markdown className={styles.body}>{item.descriptionAbout}</Markdown>

        {item.images?.length
          ? item.images.map((image, index) => (
              <DocsFigure
                image={image}
                imageSource={imageSource}
                itemId={item.id}
                key={`${item.id}-image-${index}`}
              />
            ))
          : null}

        {item.subTitle ? <Markdown className={styles.subTitle}>{item.subTitle}</Markdown> : null}

        {item.subDescription ? (
          <Markdown className={classNames(styles.subDescription, item.border && styles.bordered)}>
            {item.subDescription}
          </Markdown>
        ) : null}
      </section>
    </>
  )
}

// Sections only re-render when their own "active" flag flips during scroll
export default memo(DocsSection)
