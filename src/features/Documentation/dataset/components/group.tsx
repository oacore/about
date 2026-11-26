'use client'

import type { DatasetAccentColor, DatasetGroup } from '@features/Documentation/dataset/types'

import DatasetCard from './card'
import DatasetSection from './section'

const ACCENTS: Record<string, DatasetAccentColor> = {
  other: 'green',
  archived: 'blue',
}

type DatasetGroupSectionProps = {
  group?: DatasetGroup
}

const DatasetGroupSection = ({ group }: DatasetGroupSectionProps) => {
  if (!group) {
    return null
  }

  const accentColor = ACCENTS[group.id]

  return (
    <DatasetSection accentColor={accentColor} id={group.id} title={group.title}>
      {group.boxes?.map((box) => (
        <DatasetCard {...box} accentColor={accentColor} key={`${box.title}-${box.caption}`} />
      ))}
    </DatasetSection>
  )
}

export default DatasetGroupSection
