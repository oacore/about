'use client'

import { Collapsed, Layout, Section } from '@core/core-ui'
import { Button } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import GuidelineCard from '@components/GuidelineCard'
import Markdown from '@components/Markdown/Markdown'
import ServiceMainWrapper from '@components/ServiceMainWrapper'
import StepFlow from '@components/StepFlow'
import RegistrationModal from '@features/benefits/RegistrationModal'
import type {
  BenefitsJoinBlock,
  BenefitsPageData,
} from '@features/benefits/types'
import {
  prepareBenefitsMarkdown,
  resolveActionHref,
  resolveExternalTarget,
  resolveFaqHref,
} from '@features/benefits/utils'
import { updateLocationHash } from '@features/faq/utils'
import type { FaqItem } from '@features/faq/types'
import { patchStats } from '@utils/patchStats'

import styles from './styles.module.css'

type BenefitsPageProps = {
  data: BenefitsPageData
}

const FAQ_PREVIEW_COUNT = 3

const visibleStatValue = (
  value: string | undefined,
  statistics: BenefitsPageData['statistics'],
): string | null => {
  const patched = patchStats(value, statistics).trim()
  const plain = patched.replace(/<[^>]+>/g, '').trim()

  if (!plain || plain === '0' || plain.includes('{{')) {
    return null
  }

  return patched
}

type ContentLinkProps = {
  title?: string
  url?: string
  type?: 'primary' | 'default' | 'link'
  variant?: 'outlined' | 'solid' | 'link' | 'text'
  className?: string
}

const ContentLink = ({ title, url, type = 'primary', variant, className }: ContentLinkProps) => {
  if (!title || !url) {
    return null
  }

  const href = resolveActionHref(url)
  const target = resolveExternalTarget(href)

  return (
    <Button
      className={className}
      href={href}
      rel={target ? 'noopener noreferrer' : undefined}
      target={target}
      type={type}
      variant={variant}
    >
      {title}
    </Button>
  )
}

const JoinBlock = ({ block }: { block: BenefitsJoinBlock }) => {
  const additional = block.additional
  const additionalHref = additional?.href ? resolveFaqHref(additional.href) : undefined

  return (
    <article className={styles.joinBlock}>
      {block.picture ? (
        <Image
          alt={block.title ?? ''}
          className={styles.joinPicture}
          height={320}
          src={block.picture}
          unoptimized
          width={480}
        />
      ) : null}
      <div className={styles.joinContent}>
        {block.title ? <h3 className={styles.joinBlockTitle}>{block.title}</h3> : null}
        {block.description ? (
          <Markdown className={styles.copy}>{prepareBenefitsMarkdown(block.description)}</Markdown>
        ) : null}
        {additional?.Info ? (
          <div className={styles.infoRow}>
            <p className={styles.infoText}>{additional.Info}</p>
            {additional.picture && additionalHref ? (
              <a
                aria-label={additional.Info}
                className={styles.badgeLink}
                href={additionalHref}
              >
                <Image
                  alt=""
                  className={styles.badgeImage}
                  height={52}
                  src={additional.picture}
                  unoptimized
                  width={250}
                />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  )
}

const FaqList = ({ items }: { items: FaqItem[] }) => {
  const [showAll, setShowAll] = useState(false)
  const visibleItems = showAll ? items : items.slice(0, FAQ_PREVIEW_COUNT)
  const canToggle = items.length > FAQ_PREVIEW_COUNT

  const handleToggle = () => {
    setShowAll((current) => !current)
  }

  return (
    <>
      {visibleItems.map((item) => (
        <Collapsed
          id={item.slug}
          key={item.slug}
          onChange={(keys) => {
            const isOpen = Array.isArray(keys) ? keys.includes(item.slug) : keys === item.slug
            updateLocationHash(item.slug, isOpen)
          }}
          title={item.question}
        >
          {item.answer ? <Markdown>{prepareBenefitsMarkdown(item.answer)}</Markdown> : null}
        </Collapsed>
      ))}
      {canToggle ? (
        <Button className={styles.showMore} onClick={handleToggle} type="default" variant="outlined">
          {showAll ? 'See less FAQs' : 'See more FAQs'}
        </Button>
      ) : null}
    </>
  )
}

const BenefitsPage = ({ data }: BenefitsPageProps) => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const banner = data.banner
  const guideline = banner?.guideline
  const joinBlocks = data.sections?.blocks ?? []
  const howToItems = data.HowTo?.items ?? []
  // ServiceMainWrapper needs complete cards; content fields are optional in the CMS types
  const services = (data.services ?? []).flatMap((service) =>
    service.title && service.picture && service.description
      ? [
          {
            title: service.title,
            picture: service.picture,
            description: service.description,
            action: (service.action ?? []).flatMap((action) =>
              action.title && action.url ? [{ title: action.title, url: action.url }] : [],
            ),
          },
        ]
      : [],
  )
  const statBlocks = (data.stat?.blocks ?? []).flatMap((block) => {
    const value = visibleStatValue(block.value, data.statistics)
    if (!value) {
      return []
    }

    return [{ title: block.title, value }]
  })

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === '#join-core') {
        setIsRegistrationOpen(true)
      }
    }

    openFromHash()
    window.addEventListener('hashchange', openFromHash)

    return () => {
      window.removeEventListener('hashchange', openFromHash)
    }
  }, [])

  const handleOpenRegistration = () => {
    setIsRegistrationOpen(true)
    const url = new URL(window.location.href)
    url.hash = 'join-core'
    window.history.replaceState({}, '', url.toString())
    document.getElementById('join-core')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCloseRegistration = () => {
    setIsRegistrationOpen(false)

    if (window.location.hash !== '#join-core') {
      return
    }

    const url = new URL(window.location.href)
    url.hash = ''
    window.history.replaceState({}, '', `${url.pathname}${url.search}`)
  }

  return (
    <Layout>
      <Section className={styles.sectionBanner} id="banner">
        <div className={styles.bannerCopy}>
          {data.headerLink?.length ? (
            <nav aria-label="Benefits sections" className={styles.nav}>
              {data.headerLink.map((item) => {
                if (!item.link || !item.href) {
                  return null
                }

                return (
                  <a href={resolveActionHref(item.href)} key={`${item.link}-${item.href}`}>
                    {item.link}
                  </a>
                )
              })}
            </nav>
          ) : null}
          {banner?.title ? <h1 className={styles.headline}>{banner.title}</h1> : null}
          {banner?.description ? <p className={styles.bannerDescription}>{banner.description}</p> : null}
          <div className={styles.bannerActions}>
            {banner?.actions?.links?.form?.text ? (
              <Button onClick={handleOpenRegistration} type="primary">
                {banner.actions.links.form.text}
              </Button>
            ) : null}
            <ContentLink
              className={styles.bannerLink}
              title={banner?.actions?.links?.Link?.text}
              type="default"
              url={banner?.actions?.links?.Link?.url}
            />
          </div>
        </div>

        {guideline ? (
          <GuidelineCard
            {...guideline}
            description={prepareBenefitsMarkdown(guideline.description)}
          />
        ) : null}
      </Section>

      {joinBlocks.length ? (
        <Section id="join">
          {data.sections?.title ? <h2 className={styles.sectionTitle}>{data.sections.title}</h2> : null}
          <div className={styles.joinList}>
            {joinBlocks.map((block) => (
              <JoinBlock block={block} key={block.id ?? block.title} />
            ))}
          </div>
        </Section>
      ) : null}

      {statBlocks.length ? (
        <Section className={styles.statistic} id="statistic">
          {data.stat?.title ? <h2 className={styles.sectionTitle}>{data.stat.title}</h2> : null}
          <div className={styles.statGrid}>
            {statBlocks.map((block) => (
              <div className={styles.statItem} key={block.title ?? block.value}>
                {block.title ? <p className={styles.statTitle}>{block.title}</p> : null}
                <Markdown className={styles.statValue}>{block.value}</Markdown>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {howToItems.length ? (
        <Section id="how-to-join">
          {data.HowTo?.title ? <h2 className={styles.sectionTitle}>{data.HowTo.title}</h2> : null}
          <StepFlow
            steps={howToItems.map((item, index) => ({
              key: item.title ?? `step-${index}`,
              title: item.title,
              icon: item.titlePicture,
              description: prepareBenefitsMarkdown(item.description),
            }))}
          />
          <div className={styles.howToActions}>
            <ContentLink title={data.HowTo?.action?.title} type="primary" url={data.HowTo?.action?.url} />
          </div>
        </Section>
      ) : null}

      <Section className={styles.joinCore} id="join-core">
        <div className={styles.joinCopy}>
          {data.join?.title ? <h2 className={styles.joinTitle}>{data.join.title}</h2> : null}
          {data.join?.description ? (
            <Markdown className={classNames(styles.copy, styles.muted)}>
              {prepareBenefitsMarkdown(data.join.description)}
            </Markdown>
          ) : null}
          {data.join?.action ? (
            <Button className={styles.joinButton} onClick={handleOpenRegistration} type="primary">
              {data.join.action}
            </Button>
          ) : null}
        </div>
        {data.join?.picture ? (
          <Image
            alt={data.join.title ?? 'Join CORE'}
            className={styles.joinCorePicture}
            height={320}
            src={data.join.picture}
            unoptimized
            width={420}
          />
        ) : null}
      </Section>

      {services.length ? (
        <Section id="services">
          <ServiceMainWrapper services={services} />
        </Section>
      ) : null}

      {data.faqItems.length ? (
        <Section id="join-faq">
          <FaqList items={data.faqItems} />
        </Section>
      ) : null}

      <RegistrationModal
        onClose={handleCloseRegistration}
        open={isRegistrationOpen}
        secondStep={data.secondStep}
        subOai={data.join?.subOai}
      />
    </Layout>
  )
}

export default BenefitsPage
