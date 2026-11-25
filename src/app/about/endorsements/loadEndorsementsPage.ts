import { cache } from 'react'
import { parseAllDocuments } from 'yaml'

import { ASSETS_BASE_URL, getSections } from 'content'
import { deepCamelize } from '@/lib/content/camelize'

import type {
  EndorsementAction,
  EndorsementAuthor,
  EndorsementOrganization,
  EndorsementSection,
  EndorsementTestimonial,
  EndorsementsPageData,
} from '@features/endorsements/types'
import { asString, isRecord, resolveContentHref } from '@features/endorsements/utils'

const CONTENT_OWNER = process.env.GITHUB_CONTENT_OWNER ?? 'oacore'
const CONTENT_REPO = process.env.GITHUB_CONTENT_REPO ?? 'content'
const CONTENT_REF = process.env.GITHUB_CONTENT_REF ?? 'main'

const fetchYamlFromContentRepo = async (filePath: string): Promise<Record<string, unknown>> => {
  const url = `https://raw.githubusercontent.com/${CONTENT_OWNER}/${CONTENT_REPO}/${CONTENT_REF}/${filePath}`
  const response = await fetch(url, { next: { revalidate: 60 * 60 } })

  if (!response.ok) {
    throw new Error(`Could not fetch ${filePath}: ${response.status} ${response.statusText}`)
  }

  const parsed = parseAllDocuments(await response.text())[0]?.toJS()
  if (!isRecord(parsed)) {
    throw new Error(`Invalid YAML payload for ${filePath}`)
  }

  return deepCamelize(parsed) as Record<string, unknown>
}

const loadEndorsementsBundle = async (): Promise<Record<string, unknown>> => {
  if (!process.env.GITHUB_TOKEN) {
    return fetchYamlFromContentRepo('endorsements/endorsements.yml')
  }

  try {
    return await getSections('endorsements')
  } catch {
    return fetchYamlFromContentRepo('endorsements/endorsements.yml')
  }
}

const toAssetUrl = (value: string): string =>
  value.startsWith('http') ? value : new URL(value.replace(/^\/?/, './'), ASSETS_BASE_URL).href

const toIllustrationUrl = (value: string): string => {
  if (value.startsWith('http')) {
    return value
  }

  if (value.includes('/images/')) {
    return toAssetUrl(value)
  }

  return toAssetUrl(`images/illustrations/${value}`)
}

const toLogoUrl = (value: string): string => {
  if (value.startsWith('http')) {
    return value
  }

  if (value.includes('/images/')) {
    return toAssetUrl(value)
  }

  return toAssetUrl(`images/logos/${value}`)
}

const toAuthor = (value: unknown): EndorsementAuthor | undefined => {
  if (!isRecord(value)) {
    return undefined
  }

  const name = asString(value.name)

  if (!name) {
    return undefined
  }

  const picture = asString(value.picture)

  return {
    name,
    role: asString(value.role),
    picture: picture ? toAssetUrl(picture) : undefined,
  }
}

const toTestimonial = (value: unknown): EndorsementTestimonial | undefined => {
  if (!isRecord(value)) {
    return undefined
  }

  const content = asString(value.content)
  const author = toAuthor(value.author)

  if (!content || !author) {
    return undefined
  }

  return {
    id: asString(value.id),
    content,
    author,
  }
}

const toOrganization = (value: unknown): EndorsementOrganization | undefined => {
  if (!isRecord(value)) {
    return undefined
  }

  const name = asString(value.name)

  if (!name) {
    return undefined
  }

  const logo = asString(value.logo)

  return {
    id: asString(value.id),
    name,
    url: asString(value.url),
    logo: logo ? toLogoUrl(logo) : undefined,
    full: value.full === true,
    testimonial: toTestimonial(value.testimonial),
  }
}

const toAction = (value: unknown): EndorsementAction | undefined => {
  if (!isRecord(value)) {
    return undefined
  }

  const name = asString(value.name)
  const url = asString(value.url)

  if (!name || !url) {
    return undefined
  }

  return {
    title: asString(value.title),
    name,
    url: resolveContentHref(url),
  }
}

const toOrganizations = (value: unknown): EndorsementOrganization[] => {
  const source = isRecord(value) && Array.isArray(value.items) ? value.items : Array.isArray(value) ? value : []

  return source.flatMap((item): EndorsementOrganization[] => {
    const organization = toOrganization(item)
    return organization ? [organization] : []
  })
}

const toSections = (value: unknown): EndorsementSection[] => {
  if (!isRecord(value)) {
    return []
  }

  return Object.entries(value).flatMap(([key, item]): EndorsementSection[] => {
    if (!isRecord(item)) {
      return []
    }

    const title = asString(item.title)

    if (!title) {
      return []
    }

    const testimonials = isRecord(item.testimonials) ? item.testimonials : undefined
    const illustration = asString(item.illustration)

    return [
      {
        id: asString(item.id) ?? key,
        title,
        caption: asString(item.caption),
        description: asString(item.description),
        illustration: illustration ? toIllustrationUrl(illustration) : undefined,
        action: toAction(item.action),
        organizations: toOrganizations(item.organizations),
        testimonialsTitle: asString(testimonials?.title),
      },
    ]
  })
}

/** Content lives in oacore/content `endorsements/endorsements.yml`. */
export const loadEndorsementsPage = cache(async (): Promise<EndorsementsPageData> => {
  const bundle = await loadEndorsementsBundle()

  return {
    title: asString(bundle.title),
    description: asString(bundle.description),
    keywords:
      typeof bundle.keywords === 'string' || Array.isArray(bundle.keywords) ? bundle.keywords : undefined,
    sections: toSections(bundle.sections),
  }
})
