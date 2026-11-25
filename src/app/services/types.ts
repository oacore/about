export type RecommenderItem = {
  title: string
}

export type FeatureAction = {
  caption: string
  url: string
}

export type ServiceFeature = {
  id: string
  logo?: string
  title: string
  description?: string
  shortDescription?: string
  recommender: RecommenderItem[]
  action: FeatureAction
}

export type SectionVideo = {
  src: string
  title: string
  description?: string
}

export type ServiceSection = {
  id: string
  title: string
  description?: string
  video?: SectionVideo
  features: ServiceFeature[]
}

export type ServicesYamlDocument = {
  sections: ServiceSection[]
}

export type ServicesHeaderInner = {
  title?: string
  description?: string
  hero?: string
  headline?: string[]
}

export type ServicesHeaderDocument = {
  header?: ServicesHeaderInner
}

export type ServicesMetaDocument = {
  id?: string
  title?: string
  tagline?: string
}

/** Shape returned by `getSections('services')` (matches oacore/content `services/` bundle). */
export type ServicesPageData = {
  header?: ServicesHeaderDocument
  meta?: ServicesMetaDocument
  services: ServicesYamlDocument
}
