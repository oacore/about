'use client'

import ResearchSection from '@components/ResearchSection'
import type { RefSection } from '@features/ref/types'

import RefContentCard from './RefContentCard'

type RefContentSectionProps = RefSection & {
  className?: string
}

const hasSectionContent = (section: RefSection): boolean =>
  Boolean(
    section.content ||
      section.content2 ||
      section.subContent ||
      section.subContent2 ||
      section.subHeaderContent ||
      section.subHeader ||
      section.items?.length ||
      section.images?.length,
  )

const RefContentSection = ({ className, caption, ...section }: RefContentSectionProps) => {
  if (!hasSectionContent(section)) {
    return null
  }

  return (
    <ResearchSection className={className} id={section.id} title={section.title} titleAlign="start">
      <RefContentCard
        content={section.content}
        content2={section.content2}
        images={section.images}
        items={section.items}
        subContent={section.subContent}
        subContent2={section.subContent2}
        subHeader={section.subHeader}
        subHeaderContent={section.subHeaderContent}
        title={caption ?? section.title}
      />
    </ResearchSection>
  )
}

export default RefContentSection
