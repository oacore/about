import type { FeatureBoxAction } from '@components/FeatureBox'

export type LabsFeature = {
  id: string
  logo?: string
  title: string
  description: string
  tag?: string
  action: FeatureBoxAction
}

export type LabsHeaderInner = {
  title?: string
  description?: string
  hero?: string
}

export type LabsHeaderDocument = {
  header?: LabsHeaderInner
}

/** Shape returned by `getSections('coreLabs')` (matches oacore/content `coreLabs/` bundle). */
export type LabsPageData = {
  header?: LabsHeaderDocument
  services: {
    features?: LabsFeature[]
  }
}
