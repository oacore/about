'use client'

import ResearchSection, { ResearchSectionItem } from '@components/ResearchSection'
import type { ResearchOutputsSection as ResearchOutputsSectionType } from '@features/research-outputs/types'

import ResearchPaperCard from './ResearchPaperCard'

type ResearchOutputsSectionProps = ResearchOutputsSectionType & {
  className?: string
}

const ResearchOutputsSection = ({
  id,
  title,
  subTitle,
  papers,
  className,
}: ResearchOutputsSectionProps) => {
  if (!papers?.length) {
    return null
  }

  return (
    <ResearchSection className={className} id={id} subTitle={subTitle} title={title}>
      {papers.map((paper, index) => (
        <ResearchSectionItem
          half={papers.length > 1}
          key={`${id}-${paper.id ?? paper.title ?? 'paper'}-${index}`}
        >
          <ResearchPaperCard
            citationModalId={`${id}-${index}-citations-modal`}
            paper={paper}
            paperId={id}
            papersLength={papers.length > 1}
          />
        </ResearchSectionItem>
      ))}
    </ResearchSection>
  )
}

export default ResearchOutputsSection
