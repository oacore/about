'use client'

import { Button } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import type { ReactNode } from 'react'

import GuidelineCard from '@components/GuidelineCard'
import Markdown from '@components/Markdown/Markdown'
import { Layout, Section } from '@components/layout'
import type { DataPageData, DataPageSection } from '@features/data/types'
import { patchStats } from '@utils/patchStats'

import styles from './styles.module.css'

type DataPageProps = {
  data: DataPageData
}

const resolveActionHref = (url: string): string => {
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('#') || url.startsWith('/')) {
    return url
  }

  return `/${url}`
}

const resolveExternalTarget = (url?: string): string | undefined =>
  url?.startsWith('http') ? '_blank' : undefined

type DataHighlightSectionProps = {
  image?: string
  actionUrl?: string
  reverse?: boolean
  fullBleed?: boolean
  children: ReactNode
}

const DataHighlightSection = ({
  image,
  actionUrl,
  reverse = false,
  fullBleed = false,
  children,
}: DataHighlightSectionProps) => {
  const picture = image ? (
    <Image
      alt=""
      className={styles.highlightPicture}
      height={400}
      role="presentation"
      src={image}
      unoptimized
      width={400}
    />
  ) : null

  const media = picture && actionUrl ? (
    <a
      aria-label="Open related page"
      className={styles.highlightMedia}
      href={resolveActionHref(actionUrl)}
      rel={resolveExternalTarget(actionUrl) ? 'noopener noreferrer' : undefined}
      target={resolveExternalTarget(actionUrl)}
    >
      {picture}
    </a>
  ) : picture ? (
    <div className={styles.highlightMedia}>{picture}</div>
  ) : null

  return (
    <Section
      className={classNames(
        styles.highlight,
        reverse && styles.highlightReverse,
        fullBleed && styles.highlightFullBleed,
      )}
    >
      {media}
      <div className={styles.highlightContent}>{children}</div>
    </Section>
  )
}

type DataSectionProps = {
  section: DataPageSection
  sectionIndex: number
  statistics?: DataPageData['statistics']
  reverse: boolean
}

const DataSection = ({ section, sectionIndex, statistics, reverse }: DataSectionProps) => {
  const serviceLinks = section.data ?? []
  const stats = section.stats ?? []
  const patchedTitle = patchStats(section.title, statistics)
  const patchedContent = patchStats(section.content, statistics)
  const hasServiceLinks = Boolean(serviceLinks.length)

  return (
    <DataHighlightSection
      actionUrl={section.link?.url}
      fullBleed={hasServiceLinks}
      image={section.image}
      reverse={reverse}
    >
      <div className={classNames(hasServiceLinks && styles.centering)}>
        {patchedTitle ? (
          <h3 className={classNames(styles.sectionTitle, hasServiceLinks && styles.textCenter)}>
            <Markdown >{patchedTitle}</Markdown>
          </h3>
        ) : null}

        {hasServiceLinks ? (
          <div className={styles.dataItemWrapper}>
            {serviceLinks.map((item, itemIndex) => {
              if (!item.link) {
                return null
              }

              return (
                <a
                  aria-label={item.type ?? 'Open service'}
                  className={styles.dataItem}
                  href={resolveActionHref(item.link)}
                  key={item.type ?? `service-${sectionIndex}-${itemIndex}`}
                  rel={resolveExternalTarget(item.link) ? 'noopener noreferrer' : undefined}
                  tabIndex={0}
                  target={resolveExternalTarget(item.link)}
                >
                  {item.image ? (
                    <Image
                      alt=""
                      className={styles.dataItemImage}
                      height={40}
                      src={item.image}
                      unoptimized
                      width={40}
                    />
                  ) : null}
                  <span className={styles.itemLink}>{item.type}</span>
                </a>
              )
            })}
          </div>
        ) : null}

        {patchedContent ? <Markdown className={styles.sectionDescription}>{patchedContent}</Markdown> : null}

        {stats.length ? (
          <div className={styles.statWrapper}>
            <ul className={styles.statList}>
              {stats.map((item, index) => (
                <li className={styles.statListItems} key={`${item.description ?? 'stat'}-${index}`}>
                  <div>
                    <Markdown className={styles.statCount}>
                      {patchStats(item.title, statistics)}
                    </Markdown>
                    {item.description}
                  </div>
                </li>
              ))}
            </ul>
            {section.subTitle ? <span className={styles.subTitle}>{section.subTitle}</span> : null}
          </div>
        ) : null}

        {section.link?.url ? (
          <Button
            href={resolveActionHref(section.link.url)}
            target={resolveExternalTarget(section.link.url)}
            variant="outlined"
            className={styles.actionButton}
          >
            {section.link.caption}
          </Button>
        ) : null}
      </div>
    </DataHighlightSection>
  )
}

const getReverseFlags = (items: DataPageSection[]): boolean[] => {
  let imageSectionCount = 0

  return items.map((section) => {
    if (!section.image) {
      return false
    }

    const reverse = imageSectionCount % 2 === 1
    imageSectionCount += 1
    return reverse
  })
}

const DataPage = ({ data }: DataPageProps) => {
  const sections = data.sections ?? []
  const reverseFlags = getReverseFlags(sections)
  const guideline = data.guideline

  return (
    <Layout className={styles.page}>
      <Section className={styles.sectionBanner} id="header">
        <div className={styles.headerText}>
          {data.headline ? <h1 className={styles.headline}>{data.headline}</h1> : null}
          {data.tagline ? <Markdown className={styles.tagline}>{data.tagline}</Markdown> : null}
        </div>

        {guideline ? (
          <GuidelineCard {...guideline} buttonType="primary" className={styles.guideline} />
        ) : null}
      </Section>

      {sections.map((section, sectionIndex) => (
        <DataSection
          key={section.title ?? `section-${sectionIndex}`}
          reverse={reverseFlags[sectionIndex]}
          section={section}
          sectionIndex={sectionIndex}
          statistics={data.statistics}
        />
      ))}

      {data.disclaimer ? (
        <Section className={styles.disclaimer} id="disclaimer">
          <Markdown>{data.disclaimer}</Markdown>
        </Section>
      ) : null}
    </Layout>
  )
}

export default DataPage
