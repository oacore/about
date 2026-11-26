import { cache } from 'react'
import { parseAllDocuments } from 'yaml'

import {
  ASSETS_BASE_URL,
  SITE_BASE_URL,
  getSections,
  isContentAssetPath,
  toContentAssetUrl,
} from 'content'
import { deepCamelize } from '@/lib/content/camelize'

import type { OutreachMaterial, OutreachMaterialOption } from '@components/outreach-materials/types'
import { BADGES_ACTION_HREF } from '@features/ambassadors/constants'
import type {
  AmbassadorLocation,
  AmbassadorMember,
  AmbassadorRegion,
  AmbassadorsPageData,
} from '@features/ambassadors/types'
import { asNumber, asString, compareMembers, getRegionsWithQuantity, getStandaloneMembers, isRecord } from '@features/ambassadors/utils'

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

const loadContentBundle = async (section: string, yamlPath: string): Promise<Record<string, unknown>> => {
  if (!process.env.GITHUB_TOKEN) {
    return fetchYamlFromContentRepo(yamlPath)
  }

  try {
    return await getSections(section)
  } catch {
    return fetchYamlFromContentRepo(yamlPath)
  }
}

const toAssetUrl = (value: string): string =>
  value.startsWith('http') ? value : new URL(value.replace(/^\/?/, './'), ASSETS_BASE_URL).href

const toSiteUrl = (value: string): string => {
  if (value.startsWith('http')) return value
  if (isContentAssetPath(value)) return toContentAssetUrl(value)

  return new URL(value.replace(/^\/?/, './'), SITE_BASE_URL).href
}

const toLocation = (value: unknown): AmbassadorLocation | undefined => {
  if (!isRecord(value)) {
    return undefined
  }

  const latitude = asNumber(value.latitude)
  const longitude = asNumber(value.longitude)

  if (latitude == null || longitude == null) {
    return undefined
  }

  return { latitude, longitude }
}

const toMembers = (value: unknown): AmbassadorMember[] => {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .flatMap((item): AmbassadorMember[] => {
      if (!isRecord(item)) {
        return []
      }

      const id = asString(item.id)
      const name = asString(item.name)
      const country = asString(item.country)
      const location = toLocation(item.location)
      const picture = asString(item.picture)

      if (!id || !name || !country || !location) {
        return []
      }

      return [
        {
          id,
          name,
          country,
          location,
          role: asString(item.role),
          organization: asString(item.organization),
          region: asString(item.region),
          picture: picture ? toAssetUrl(picture) : undefined,
        },
      ]
    })
    .sort(compareMembers)
}

const toRegions = (value: unknown): Omit<AmbassadorRegion, 'quantity'>[] => {
  if (!Array.isArray(value)) {
    return []
  }

  return value.flatMap((item): Omit<AmbassadorRegion, 'quantity'>[] => {
    if (!isRecord(item)) {
      return []
    }

    const id = asString(item.id)
    const name = asString(item.name)
    const location = toLocation(item.location)

    if (!id || !name || !location) {
      return []
    }

    return [{ id, name, location }]
  })
}

const toResourceOptions = (value: unknown): OutreachMaterialOption[] | undefined => {
  if (!Array.isArray(value)) {
    return undefined
  }

  const options = value.flatMap((item): OutreachMaterialOption[] => {
    if (!isRecord(item)) {
      return []
    }

    const title = asString(item.title)
    const optionValue = asString(item.value) ?? asString(item.url) ?? asString(item.href)

    if (!title || !optionValue) {
      return []
    }

    return [{ title, value: toSiteUrl(optionValue) }]
  })

  return options.length ? options : undefined
}

const toResources = (bundle: Record<string, unknown>): { title?: string; resources: OutreachMaterial[] } => {
  const source = isRecord(bundle.resources) ? bundle.resources : bundle
  const list = Array.isArray(source.resources)
    ? source.resources
    : Array.isArray(bundle.resources)
      ? bundle.resources
      : []

  const resources = list.flatMap((item): OutreachMaterial[] => {
    if (!isRecord(item)) {
      return []
    }

    const id = asString(item.id)
    const name = asString(item.name)

    if (!id || !name) {
      return []
    }

    const urlValue = item.url
    const nestedLink = isRecord(urlValue) ? urlValue : undefined
    const url = asString(urlValue)
    const picture = asString(item.picture)
    const action = asString(item.action)
    const options = toResourceOptions(nestedLink?.options) ?? toResourceOptions(item.options)

    return [
      {
        id,
        name,
        type: asString(item.type),
        url: url ? toSiteUrl(url) : undefined,
        picture: picture ? toAssetUrl(picture) : undefined,
        label: asString(nestedLink?.label) ?? asString(item.label),
        itemName: asString(nestedLink?.itemName) ?? asString(item.itemName),
        options,
        action,
        actionHref: action ? BADGES_ACTION_HREF : undefined,
      },
    ]
  })

  return {
    title: asString(source.title),
    resources,
  }
}

/** Content lives in oacore/content `ambasadors/` (folder name as published). */
export const loadAmbassadorsPage = cache(async (): Promise<AmbassadorsPageData> => {
  const [ambassadorsBundle, resourcesBundle] = await Promise.all([
    loadContentBundle('ambasadors', 'ambasadors/ambassadors.yml'),
    loadContentBundle('resources', 'resources/resources.yml'),
  ])

  const ambassadorsSection = isRecord(ambassadorsBundle.ambassadors)
    ? ambassadorsBundle.ambassadors
    : ambassadorsBundle
  const members = toMembers(ambassadorsSection.members)
  const { title: resourcesTitle, resources } = toResources(resourcesBundle)

  return {
    title: asString(ambassadorsBundle.title),
    description: asString(ambassadorsBundle.description),
    keywords:
      typeof ambassadorsBundle.keywords === 'string' || Array.isArray(ambassadorsBundle.keywords)
        ? ambassadorsBundle.keywords
        : undefined,
    content: asString(ambassadorsBundle.content),
    ambassadorsTitle: asString(ambassadorsSection.title),
    members,
    mapMembers: getStandaloneMembers(members),
    regions: getRegionsWithQuantity(toRegions(ambassadorsBundle.regions), members),
    resourcesTitle,
    resources,
  }
})
