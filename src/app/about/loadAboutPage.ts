import { cache } from 'react'

import {
  ASSETS_BASE_URL,
  SITE_BASE_URL,
  getSections,
  isContentAssetPath,
  toContentAssetUrl,
} from 'content'

import { fetchCoreStatistics } from '@/lib/statistics/fetchCoreStatistics'
import type { ServicesPageData } from '@/app/services/types'

import { CORE_BLOG_FEED_URL } from '@features/about/constants'
import type {
  AboutBadge,
  AboutBadgeImage,
  AboutBlogPost,
  AboutContactCase,
  AboutContacts,
  AboutPageData,
  AboutPastTeamMember,
  AboutRelatedSection,
  AboutResource,
  AboutResourceOption,
  AboutServiceSection,
  AboutTeamMember,
  AboutTeamMembers,
} from '@features/about/types'
import { isRecord } from '@features/about/utils'

const toAssetUrl = (value: string): string =>
  value.startsWith('http') ? value : new URL(value.replace(/^\/?/, './'), ASSETS_BASE_URL).href

const toSiteUrl = (value: string): string => {
  if (value.startsWith('http')) return value
  if (isContentAssetPath(value)) return toContentAssetUrl(value)

  return new URL(value.replace(/^\/?/, './'), SITE_BASE_URL).href
}

const asString = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim() ? value : undefined

const resolveUrlKeys = (section: Record<string, unknown>): void => {
  Object.entries(section).forEach(([key, value]) => {
    if (/Url$/.test(key) && typeof value === 'string' && value) {
      section[key] = toAssetUrl(value)
    }
  })
}

const toRelatedSection = (value: unknown): AboutRelatedSection | undefined => {
  if (!isRecord(value)) {
    return undefined
  }

  resolveUrlKeys(value)

  const extraAction = isRecord(value.extraAction)
    ? {
        label: asString(value.extraAction.label),
        href: asString(value.extraAction.href),
      }
    : undefined

  return {
    title: asString(value.title),
    shortTitle: asString(value.shortTitle),
    description: asString(value.description),
    body: asString(value.body),
    iconUrl: asString(value.iconUrl),
    actionLabel: asString(value.actionLabel),
    urlRedirect: asString(value.urlRedirect),
    href: asString(value.href),
    extraAction,
  }
}

const toTeamMembers = (bundle: Record<string, unknown>): AboutTeamMembers => {
  const rawMembers = Object.values(bundle).filter(isRecord)

  const compareTeamMembers = (first: Record<string, unknown>, second: Record<string, unknown>) => {
    const firstOrder = typeof first.order === 'number' ? first.order : 0
    const secondOrder = typeof second.order === 'number' ? second.order : 0

    if (firstOrder !== secondOrder) {
      return secondOrder - firstOrder
    }

    const firstLastName = asString(first.lastName) ?? ''
    const secondLastName = asString(second.lastName) ?? ''
    return firstLastName.localeCompare(secondLastName)
  }

  const current: AboutTeamMember[] = rawMembers
    .filter((member) => !member.past && asString(member.firstName) && asString(member.lastName))
    .sort(compareTeamMembers)
    .map((member) => {
      const firstName = asString(member.firstName) ?? ''
      const lastName = asString(member.lastName) ?? ''
      const photo = asString(member.photo)

      return {
        id: asString(member.id) ?? `${firstName}-${lastName}`,
        name: `${firstName} ${lastName}`.trim(),
        role: asString(member.role),
        description: asString(member.body),
        photoUrl: photo ? toAssetUrl(photo) : undefined,
        order: typeof member.order === 'number' ? member.order : undefined,
      }
    })

  const past: AboutPastTeamMember[] = rawMembers
    .filter((member) => Boolean(member.past) && asString(member.firstName) && asString(member.lastName))
    .sort(compareTeamMembers)
    .map((member) => {
      const firstName = asString(member.firstName) ?? ''
      const lastName = asString(member.lastName) ?? ''

      return {
        id: asString(member.id) ?? `${firstName}-${lastName}`,
        name: `${firstName} ${lastName}`.trim(),
      }
    })

  return { current, past }
}

const toContacts = (bundle: Record<string, unknown>): AboutContacts => {
  const source = isRecord(bundle.contacts) ? bundle.contacts : bundle
  const cases = Array.isArray(source.cases) ? source.cases : []

  return {
    title: asString(source.title) ?? asString(bundle.title),
    shortTitle: asString(source.shortTitle) ?? asString(bundle.shortTitle),
    outro: asString(source.outro),
    cases: cases.flatMap((item): AboutContactCase[] => {
      if (!isRecord(item)) {
        return []
      }

      const slug = asString(item.slug)
      const purpose = asString(item.purpose)

      if (!slug || !purpose) {
        return []
      }

      return [{ slug, purpose, description: asString(item.description) }]
    }),
  }
}

const toResourceOptions = (value: unknown): AboutResourceOption[] | undefined => {
  if (!Array.isArray(value)) {
    return undefined
  }

  const options = value.flatMap((item): AboutResourceOption[] => {
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

const toMaterials = (bundle: Record<string, unknown>): AboutResource[] => {
  const list = Array.isArray(bundle.resources)
    ? bundle.resources
    : isRecord(bundle.resources) && Array.isArray(bundle.resources.resources)
      ? bundle.resources.resources
      : []

  return list.flatMap((item): AboutResource[] => {
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

    return [
      {
        id,
        name,
        type: asString(item.type),
        url: url ? toSiteUrl(url) : undefined,
        picture: asString(item.picture),
        label: asString(nestedLink?.label) ?? asString(item.label),
        itemName: asString(nestedLink?.itemName) ?? asString(item.itemName),
        options: toResourceOptions(nestedLink?.options) ?? toResourceOptions(item.options),
        action: asString(item.action),
      },
    ]
  })
}

const toBadgeImages = (value: unknown): AboutBadgeImage[] | undefined => {
  if (!Array.isArray(value)) {
    return undefined
  }

  const images = value.flatMap((item): AboutBadgeImage[] => {
    if (!isRecord(item)) {
      return []
    }

    const file = asString(item.file)
    if (!file) {
      return []
    }

    return [
      {
        file: toAssetUrl(file),
        source: asString(item.source) ?? null,
      },
    ]
  })

  return images.length ? images : undefined
}

const toBadges = (bundle: Record<string, unknown>): AboutBadge | undefined => {
  const docs = isRecord(bundle.docs) ? bundle.docs : bundle
  const items = Array.isArray(docs.items) ? docs.items : []

  const badgesItem = items.find((item) => isRecord(item) && item.id === 'core-badges')
  if (!isRecord(badgesItem)) {
    return undefined
  }

  return {
    id: asString(badgesItem.id),
    title: asString(badgesItem.title),
    descriptionAbout: asString(badgesItem.descriptionAbout),
    images: toBadgeImages(badgesItem.images),
  }
}

const toServiceSections = (bundle: Record<string, unknown>): AboutServiceSection[] => {
  const page = bundle as ServicesPageData

  return (page.services?.sections ?? []).map((section) => ({
    id: section.id,
    title: section.title,
    features: (section.features ?? []).map((feature) => ({
      id: feature.id,
      title: feature.title,
      shortDescription: feature.shortDescription,
      action: feature.action ? { url: feature.action.url } : undefined,
    })),
  }))
}

const toBlogPosts = (value: unknown): AboutBlogPost[] => {
  if (!Array.isArray(value)) {
    return []
  }

  return value.flatMap((item): AboutBlogPost[] => {
    if (!isRecord(item)) {
      return []
    }

    const title = asString(item.title)
    const link = asString(item.link)

    if (!title || !link) {
      return []
    }

    return [
      {
        title,
        link,
        pubDate: asString(item.pubDate),
      },
    ]
  })
}

const fetchBlogPosts = async (): Promise<AboutBlogPost[]> => {
  const response = await fetch(CORE_BLOG_FEED_URL, {
    next: { revalidate: 60 * 60 },
  })

  if (!response.ok) {
    throw new Error(`Could not fetch CORE blog feed: ${response.status} ${response.statusText}`)
  }

  return toBlogPosts(await response.json())
}

export const loadAboutPage = cache(async (): Promise<AboutPageData> => {
  const [about, teamBundle, contactsBundle, resourcesBundle, servicesBundle, docsBundle, statistics, blogPosts] =
    await Promise.all([
      getSections('about'),
      getSections('team'),
      getSections('contacts'),
      getSections('resources'),
      getSections('services'),
      getSections('docs-membership'),
      fetchCoreStatistics().catch(() => ({})),
      fetchBlogPosts().catch(() => []),
    ])

  Object.values(about).forEach((section) => {
    if (isRecord(section)) {
      resolveUrlKeys(section)
    }
  })

  const meta = isRecord(about.meta) ? about.meta : undefined
  const core = isRecord(about.core) ? about.core : undefined
  const blog = isRecord(about.blog) ? about.blog : undefined
  const mission = isRecord(about.mission) ? about.mission : undefined
  const yearsActive = isRecord(about.yearsActive) ? about.yearsActive : undefined
  const howItWorks = isRecord(about.howItWorks) ? about.howItWorks : undefined
  const team = isRecord(about.team) ? about.team : undefined
  const resources = isRecord(about.resources) ? about.resources : undefined
  const missionVideo = isRecord(mission?.video) ? mission.video : undefined
  const missionVideoSrc = asString(missionVideo?.src)
  const missionVideoTitle = asString(missionVideo?.title)
  const howItWorksActions = isRecord(howItWorks?.actionLabels) ? howItWorks.actionLabels : undefined

  return {
    meta: meta
      ? {
          title: asString(meta.title),
          headline: asString(meta.headline),
          description: asString(meta.description),
          tagline: asString(meta.tagline),
          keywords: typeof meta.keywords === 'string' || Array.isArray(meta.keywords) ? meta.keywords : undefined,
        }
      : undefined,
    core: core
      ? {
          title: asString(core.title),
          description: asString(core.description),
        }
      : undefined,
    blog: blog
      ? {
          title: asString(blog.title),
          shortTitle: asString(blog.shortTitle),
          actionLabel: asString(blog.actionLabel),
        }
      : undefined,
    blogPosts,
    characteristics: toRelatedSection(about.characteristics),
    mission: mission
      ? {
          title: asString(mission.title),
          shortTitle: asString(mission.shortTitle),
          body: asString(mission.body),
          video:
            missionVideoSrc && missionVideoTitle
              ? { src: missionVideoSrc, title: missionVideoTitle }
              : undefined,
        }
      : undefined,
    fair: toRelatedSection(about.fair),
    yearsActive: yearsActive
      ? {
          title: asString(yearsActive.title),
          description: asString(yearsActive.description),
        }
      : undefined,
    endorsements: toRelatedSection(about.endorsements),
    howItWorks: howItWorks
      ? {
          title: asString(howItWorks.title),
          shortTitle: asString(howItWorks.shortTitle),
          body: asString(howItWorks.body),
          actionLabels: howItWorksActions
            ? {
                primary: asString(howItWorksActions.primary),
                secondary: asString(howItWorksActions.secondary),
              }
            : undefined,
        }
      : undefined,
    communities: toRelatedSection(about.communities),
    services: toRelatedSection(about.services),
    serviceSections: toServiceSections(servicesBundle),
    research: toRelatedSection(about.research),
    team: team
      ? {
          title: asString(team.title),
          shortTitle: asString(team.shortTitle),
        }
      : undefined,
    teamMembers: toTeamMembers(teamBundle),
    resources: resources
      ? {
          title: asString(resources.title),
          shortTitle: asString(resources.shortTitle),
          content: asString(resources.content),
          body: asString(resources.body),
        }
      : undefined,
    materials: toMaterials(resourcesBundle),
    contacts: toContacts(contactsBundle),
    badges: toBadges(docsBundle),
    statistics,
  }
})
