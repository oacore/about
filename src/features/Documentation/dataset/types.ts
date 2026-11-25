export type DatasetAccentColor = 'primary' | 'blue' | 'green'

export type DatasetMeta = {
  title?: string
  tagline?: string
}

export type DatasetNavLink = {
  label: string
  link: string
}

export type DatasetHeaderLinks = {
  title?: string
  items?: DatasetNavLink[]
}

export type DatasetHeader = {
  title?: string
  image?: string
  id?: string
  caption?: string
  links?: DatasetHeaderLinks
}

export type DatasetSize = {
  count: string
  dataType: string
}

export type DatasetAction = {
  caption: string
  url: string
  variant?: 'contained' | 'outlined' | 'text'
  target?: string
}

export type DatasetBox = {
  title?: string
  icon?: string
  dataSizes?: DatasetSize[]
  actions?: DatasetAction[]
  text?: string
}

export type DatasetLatest = {
  title?: string
  id?: string
  box?: DatasetBox
}

export type DatasetCardData = {
  title: string
  caption?: string
  dataSizes?: DatasetSize[]
  footer?: string
  license?: string
  note?: string
  action?: DatasetAction
}

export type DatasetGroup = {
  title?: string
  id: string
  boxes?: DatasetCardData[]
}

export type DatasetAdditional = {
  items?: DatasetGroup[]
}

export type DatasetInstructionReminder = {
  title?: string
  description?: string
}

export type DatasetInstruction = {
  title?: string
  id?: string
  recommended?: string
  reminder?: DatasetInstructionReminder
}

export type DatasetStructure = {
  id: string
  title: string
  text?: string
  fields?: string
}

export type DatasetStructures = {
  title?: string
  items?: DatasetStructure[]
}

/** Shape returned by `getSections('dataset')` (matches oacore/content `dataset/` bundle). */
export type DatasetDocumentationData = {
  meta?: DatasetMeta
  header?: DatasetHeader
  instruction?: DatasetInstruction
  latestInstruction?: DatasetInstruction
  datasetLatest?: DatasetLatest
  additionalDatasets?: DatasetAdditional
  structures?: DatasetStructures
}

export type DatasetDocumentationProps = DatasetDocumentationData
