'use client'

import { Typography } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'

import oaiResolverLogo from '@/assets/OAI-resolver.png'
import Block from '@components/Block'
import Collapsed from '@components/Collapsed/Collapsed'
import Header from '@components/Header/Header'
import Markdown from '@components/Markdown/Markdown'
import { Layout, Section } from '@components/layout'
import type {
  OaiResolverDocumentationProps,
  OaiResolverFaqItem,
  OaiResolverSection,
} from '@features/Documentation/oai-resolver/types'

import styles from './oai-resolver.module.css'

const { Title } = Typography

const getLines = (content: string) =>
  content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

const extractOaiIdentifiers = (content: string) =>
  getLines(content)
    .map((line) => line.replace(/^[-*]\s*/, ''))
    .filter((line) => line.toLowerCase().startsWith('oai:'))

const getSectionTitle = (title?: string | null) => title?.trim() || undefined

const getSectionVariant = (section: OaiResolverSection) => {
  const title = getSectionTitle(section.title)?.toLowerCase()
  const content = section.content ?? ''

  if (title === 'structure') {
    return 'structure'
  }

  if (title === 'oai resolver') {
    return 'resolver'
  }

  if (extractOaiIdentifiers(content).length) {
    return 'examples'
  }

  return 'markdown'
}

type OaiBarLinkProps = {
  href?: string
  label: string
}

const OaiBarLink = ({ href, label }: OaiBarLinkProps) => (
  <div className={styles.oaiLinkBlock}>
    <div className={styles.oaiLink}>
      {href ? (
        <a aria-label={label} href={href} rel="noopener noreferrer" target="_blank">
          {label}
        </a>
      ) : (
        label
      )}
    </div>
  </div>
)

const OaiStructureDiagram = () => (
  <div aria-hidden>
    <div className={styles.oaiInput}>
      <div className={styles.oaiText}>
        <span className={styles.oaiElem}>oai:oro.open.ac.uk</span>
        <span className={styles.oaiElem}>:</span>
        <span className={styles.oaiElem}>73739</span>
      </div>
    </div>
    <div className={classNames(styles.el, styles.firstPart)}>
      <div className={styles.left} />
      <div className={styles.right} />
    </div>
    <div className={classNames(styles.el, styles.secondPart)}>
      <div className={styles.left} />
      <div className={styles.right} />
    </div>
    <div className={styles.helperBlock}>
      <span className={styles.helperText}>globally unique OAI Prefix</span>
      <span className={styles.helperText}>locally unique identifier</span>
    </div>
  </div>
)

const OaiExamplesList = ({ content }: { content: string }) => {
  const identifiers = extractOaiIdentifiers(content)
  const intro = getLines(content).find(
    (line) => !line.startsWith('-') && !line.toLowerCase().startsWith('oai:'),
  )

  return (
    <>
      {intro ? <Markdown className={styles.bodyMarkdown}>{intro}</Markdown> : null}
      {identifiers.map((identifier) => (
        <OaiBarLink key={identifier} label={identifier} />
      ))}
    </>
  )
}

const ResolverContent = ({ content }: { content: string }) => (
  <>
    {getLines(content).map((line) => {
      const urlMatch = line.match(/https?:\/\/\S+/)

      if (!urlMatch) {
        return (
          <Markdown className={styles.bodyMarkdown} key={line}>
            {line}
          </Markdown>
        )
      }

      const url = urlMatch[0]
      const prefix = line.replace(url, '').trim()
      const label = url.replace('<oai-identifier>', '< oai-identifier>')

      return (
        <div key={line}>
          {prefix ? <Markdown className={styles.bodyMarkdown}>{prefix}</Markdown> : null}
          <OaiBarLink href={url.includes('<') ? undefined : url} label={label} />
        </div>
      )
    })}
    <Image
      alt="OAI resolver illustration"
      className={styles.resolverImg}
      height={255}
      src="https://oacore.github.io/content/images/oai_resolve/explore.png"
      width={375}
    />
  </>
)

type ColumnContentProps = {
  section?: OaiResolverSection
  alignWithSubTitle?: boolean
}

const ColumnContent = ({ section, alignWithSubTitle = false }: ColumnContentProps) => {
  if (!section) {
    return null
  }

  const title = getSectionTitle(section.title)
  const content = section.content ?? ''
  const variant = getSectionVariant(section)

  return (
    <div className={classNames(alignWithSubTitle && styles.textNoSubTitle)}>
      {variant === 'structure' && title ? <p className={styles.structureLabel}>{title}:</p> : null}
      {title && variant !== 'structure' ? <h2 className={styles.subTitle}>{title}</h2> : null}
      {variant === 'structure' ? <OaiStructureDiagram /> : null}
      {variant === 'examples' ? <OaiExamplesList content={content} /> : null}
      {variant === 'resolver' ? <ResolverContent content={content} /> : null}
      {variant === 'markdown' ? (
        <Markdown className={styles.bodyMarkdown}>{content}</Markdown>
      ) : null}
    </div>
  )
}

const FaqsSection = ({ items }: { items: OaiResolverFaqItem[] }) => {
  if (!items.length) {
    return null
  }

  const handleToggle = (id: string) => (keys: string | string[]) => {
    const isOpen = Array.isArray(keys) ? keys.includes(id) : keys === id
    const url = new URL(window.location.href)
    url.hash = isOpen ? id : ''
    window.history.replaceState({}, '', url.toString())
  }

  return (
    <>
      {items.map(({ slug, question, answer }) => (
        <Collapsed id={slug} key={slug} onChange={handleToggle(slug)} title={question}>
          <Markdown>{answer}</Markdown>
        </Collapsed>
      ))}
    </>
  )
}

const OaiResolverDocumentationPage = ({
  header,
  blocks,
  faqItems,
}: OaiResolverDocumentationProps) => (
  <Layout>
    <div className={styles.page}>
      <Header
        description={header?.content}
        descriptionClassName={styles.headerDescription}
        hideButtons
        icon={oaiResolverLogo.src}
        iconClassName={styles.headerLogo}
        logoAlt="OAI resolver"
        metaClassName={styles.headerMeta}
        title={header?.title}
        titleClassName={styles.headerTitle}
      />

      {blocks.map((block, index) => {
        const leftTitle = getSectionTitle(block.left.title)
        const rightTitle = getSectionTitle(block.right?.title)
        const leftHasSubTitle =
          Boolean(leftTitle) && getSectionVariant(block.left) !== 'structure'

        return (
          <Block
            column1={<ColumnContent section={block.left} />}
            column2={
              <ColumnContent
                alignWithSubTitle={leftHasSubTitle && !rightTitle}
                section={block.right}
              />
            }
            isAlternate={index % 2 === 0}
            key={leftTitle ?? block.left.content ?? index}
          />
        )
      })}

      {faqItems.length ? (
        <Section>
          <Title className={styles.faqTitle} level={5}>
            FAQs
          </Title>
          <FaqsSection items={faqItems} />
        </Section>
      ) : null}
    </div>
  </Layout>
)

export default OaiResolverDocumentationPage
