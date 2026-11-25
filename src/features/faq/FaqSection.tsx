'use client'

import classNames from 'classnames'

import Collapsed from '@components/Collapsed/Collapsed'
import GuidelineCard from '@components/GuidelineCard'
import Markdown from '@components/Markdown/Markdown'
import { Section } from '@components/layout'
import FaqBadge from '@features/faq/FaqBadge'
import type { FaqHeadingLevel, FaqItem, FaqSectionData } from '@features/faq/types'
import { updateLocationHash } from '@features/faq/utils'

import styles from './styles.module.css'

type FaqSectionProps = FaqSectionData & {
  level?: FaqHeadingLevel
}

const FaqHeading = ({
  level,
  className,
  children,
}: {
  level: FaqHeadingLevel
  className?: string
  children: React.ReactNode
}) => {
  if (level === 3) {
    return <h3 className={className}>{children}</h3>
  }

  if (level === 4) {
    return <h4 className={className}>{children}</h4>
  }

  if (level === 5) {
    return <h5 className={className}>{children}</h5>
  }

  return <h2 className={className}>{children}</h2>
}

const getNextLevel = (level: FaqHeadingLevel): FaqHeadingLevel => {
  if (level >= 5) {
    return 5
  }

  return (level + 1) as FaqHeadingLevel
}

const FaqAccordionItem = ({ item }: { item: FaqItem }) => {
  const badge = item.badge?.[0]

  const handleToggle = (keys: string | string[]) => {
    const isOpen = Array.isArray(keys) ? keys.includes(item.slug) : keys === item.slug
    updateLocationHash(item.slug, isOpen)
  }

  return (
    <Collapsed id={item.slug} onChange={handleToggle} title={item.question}>
      {item.answer ? <Markdown>{item.answer}</Markdown> : null}
      {badge ? <FaqBadge badge={badge} /> : null}
    </Collapsed>
  )
}

const FaqSection = ({
  id,
  title,
  updateDate,
  guideline,
  items = [],
  sections = [],
  level = 2,
}: FaqSectionProps) => {
  const isNested = level > 2
  const headingClassName = classNames(styles.sectionTitle, isNested && styles.nestedTitle)

  const content = (
    <>
      <div className={styles.faqHeaderWrapper}>
        {title ? (
          <FaqHeading className={headingClassName} level={level}>
            {title}
          </FaqHeading>
        ) : null}
        {updateDate ? <span className={styles.faqHeaderDate}>{updateDate}</span> : null}
      </div>

      {guideline ? <GuidelineCard {...guideline} className={styles.guideline} /> : null}

      {items.map((item) => (
        <FaqAccordionItem item={item} key={item.slug} />
      ))}

      {sections.map((section) => (
        <FaqSection key={section.id} level={getNextLevel(level)} {...section} />
      ))}
    </>
  )

  if (isNested) {
    return (
      <div className={styles.nestedSection} id={id}>
        {content}
      </div>
    )
  }

  return (
    <Section className={styles.faqSection} id={id}>
      {content}
    </Section>
  )
}

export default FaqSection
