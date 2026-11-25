import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { cache } from 'react'
import { parse } from 'yaml'

import { deepCamelize } from '@/lib/content/camelize'
import { fetchCoreStatistics } from '@/lib/statistics/fetchCoreStatistics'
import { resolveHref, toImageUrl } from '@utils/resolveHref'
import { patchStats } from '@utils/patchStats'

import type {
  HomeAction,
  HomeAudience,
  HomeFeature,
  HomeJoinItem,
  HomePageData,
  HomeService,
  HomeSlide,
  HomeSpotlight,
  HomeUserGroup,
  HomeUserLogo,
} from './types'

const homePath = join(process.cwd(), 'src/data/home.yml')

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const asString = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim() ? value : undefined

const asArray = (value: unknown): unknown[] => (Array.isArray(value) ? value : [])

const toMarkdown = (value: unknown): string => {
  const text = asString(value) ?? ''

  return text.replace(/\]\((\/[^)\s]+)\)/g, (_, href: string) => `](${resolveHref(href)})`)
}

const toAction = (value: unknown): HomeAction | undefined => {
  if (!isRecord(value)) {
    return undefined
  }

  const title = asString(value.title)
  const url = asString(value.url)

  if (!title || !url) {
    return undefined
  }

  return {
    title,
    url: resolveHref(url),
  }
}

const toSlides = (value: unknown): HomeSlide[] => {
  if (!isRecord(value)) {
    return []
  }

  return asArray(value.children).flatMap((item): HomeSlide[] => {
    if (!isRecord(item)) {
      return []
    }

    const title = asString(item.title)
    const image = asString(item.image)
    const label = asString(item.label)
    const action = asString(item.action)

    if (!title || !image || !label || !action) {
      return []
    }

    const statisticAction = asString(item.statisticAction)

    return [
      {
        title,
        image: toImageUrl(image),
        label,
        action: action === 'Search' ? action : resolveHref(action),
        actionLabel: asString(item.actionLabel),
        description: asString(item.description),
        statisticAction: statisticAction ? resolveHref(statisticAction) : undefined,
        statisticActionLabel: asString(item.statisticActionLabel),
      },
    ]
  })
}

const toFeatures = (value: unknown): HomeFeature[] => {
  if (!isRecord(value)) {
    return []
  }

  return asArray(value.children).flatMap((item): HomeFeature[] => {
    if (!isRecord(item)) {
      return []
    }

    const title = asString(item.title)
    const description = asString(item.description)
    const picture = asString(item.picture)

    if (!title || !description || !picture) {
      return []
    }

    const url = asString(item.url)
    const titleUrl = asString(item.titleUrl)

    return [
      {
        title,
        description: toMarkdown(description),
        picture: toImageUrl(picture),
        status: asString(item.status),
        url: url ? resolveHref(url) : undefined,
        titleUrl: titleUrl ? resolveHref(titleUrl) : undefined,
      },
    ]
  })
}

const toJoinItems = (value: unknown): HomeJoinItem[] =>
  asArray(value).flatMap((item): HomeJoinItem[] => {
    if (!isRecord(item)) {
      return []
    }

    const caption = asString(item.caption)
    const url = asString(item.url)
    const picture = asString(item.picture)

    if (!caption || !url || !picture) {
      return []
    }

    return [
      {
        caption,
        url: resolveHref(url),
        picture: toImageUrl(picture),
      },
    ]
  })

const toSpotlight = (value: unknown, fallbackImage: string): HomeSpotlight => {
  const source = isRecord(value) ? value : {}
  const action = toAction(source.action)

  return {
    image: toImageUrl(asString(source.image) ?? fallbackImage),
    title: asString(source.title) ?? '',
    description: toMarkdown(source.description),
    action: action ?? { title: '', url: '' },
  }
}

const toAudiences = (value: unknown): HomeAudience[] =>
  asArray(value).flatMap((item): HomeAudience[] => {
    if (!isRecord(item)) {
      return []
    }

    const title = asString(item.title)
    const description = asString(item.description)
    const logo = asString(item.logo)
    const author = asString(item.author)
    const content = asString(item.citation) ?? asString(item.temporaryText) ?? description

    if (!title || !description || !logo || !author || !content) {
      return []
    }

    return [
      {
        title,
        description,
        logo: toImageUrl(logo),
        content: toMarkdown(content),
        author,
        extraText: asString(item.extraText),
      },
    ]
  })

const toServices = (value: unknown): HomeService[] =>
  asArray(value).flatMap((item): HomeService[] => {
    if (!isRecord(item)) {
      return []
    }

    const title = asString(item.title)
    const subtitle = asString(item.subtitle)
    const imgUrl = asString(item.imgUrl)
    const action = asString(item.action)

    if (!title || !subtitle || !imgUrl || !action) {
      return []
    }

    return [
      {
        title,
        subtitle,
        imgUrl: toImageUrl(imgUrl),
        action: resolveHref(action),
      },
    ]
  })

const toLogos = (value: unknown): HomeUserLogo[] =>
  asArray(value).flatMap((item): HomeUserLogo[] => {
    if (!isRecord(item)) {
      return []
    }

    const img = asString(item.img)

    if (!img) {
      return []
    }

    return [
      {
        img: toImageUrl(img),
        alt: asString(item.alt) ?? 'Organisation logo',
        full: item.full === true,
        background: item.background === true,
      },
    ]
  })

const toUsers = (value: unknown): HomeUserGroup[] =>
  asArray(value).flatMap((item): HomeUserGroup[] => {
    if (!isRecord(item)) {
      return []
    }

    const title = asString(item.title)
    const testimonial = isRecord(item.testimonial) ? item.testimonial : undefined
    const author = testimonial && isRecord(testimonial.author) ? testimonial.author : undefined
    const userList = isRecord(item.userList) ? item.userList : undefined
    const action = userList && isRecord(userList.action) ? userList.action : undefined
    const authorName = asString(author?.name)
    const content = testimonial ? asString(testimonial.content) : undefined
    const caption = asString(action?.caption)
    const url = asString(action?.url)

    if (!title || !authorName || !content || !caption || !url || !userList) {
      return []
    }

    const picture = asString(author?.picture)
    const id = asString(testimonial?.id) ?? authorName

    return [
      {
        id,
        title: toMarkdown(title),
        testimonial: {
          id,
          content: toMarkdown(content),
          author: {
            name: authorName,
            role: asString(author?.role),
            picture: picture ? toImageUrl(picture) : undefined,
          },
        },
        logos: toLogos(userList.items),
        action: {
          caption,
          url: resolveHref(url),
        },
      },
    ]
  })

const toHomePage = (
  data: Record<string, unknown>,
  statistics: Record<string, number>,
): HomePageData => {
  const features = isRecord(data.features) ? data.features : {}
  const join = isRecord(data.join) ? data.join : {}
  const testimonials = isRecord(data.testimonials) ? data.testimonials : {}
  const services = isRecord(data.services) ? data.services : {}
  const characteristics = isRecord(data.characteristics) ? data.characteristics : {}
  const characteristicsHref = asString(characteristics.href)

  return {
    title: asString(data.title) ?? 'CORE',
    description: asString(data.description) ?? '',
    keywords: asString(data.keywords),
    // If the statistics API is unavailable, drop the number rather than show a raw {{token}}
    searchPlaceholder: patchStats(asString(data.searchPlaceholder), statistics).replace(
      /\s*\{\{\w+\}\}/g,
      '',
    ),
    posiImage: toImageUrl('/images/posi.svg'),
    slides: toSlides(data.slides),
    features: {
      title: asString(features.title),
      hidden: features.hidden === true,
      items: toFeatures(features),
    },
    join: {
      title: asString(join.title) ?? '',
      subTitle: asString(join.subTitle),
      subPart: toMarkdown(join.subPart),
      items: toJoinItems(join.children),
    },
    oai: toSpotlight(data.oai, '/images/heros/oai.svg'),
    testimonials: {
      title: asString(testimonials.title) ?? '',
      subtitle: asString(testimonials.subtitle),
      actionLabel: asString(testimonials.actionLabel) ?? '',
      action: resolveHref(asString(testimonials.action) ?? '/about/endorsements'),
      items: toAudiences(testimonials.children),
    },
    characteristics: {
      title: asString(characteristics.title) ?? '',
      description: toMarkdown(characteristics.description),
      action: asString(characteristics.action) ?? '',
      href: characteristicsHref ? resolveHref(characteristicsHref) : '/distinctive-characteristics',
      image: toImageUrl('/images/characteristics.svg'),
    },
    services: {
      title: asString(services.title) ?? '',
      actionLabel: asString(services.actionLabel) ?? '',
      action: resolveHref(asString(services.action) ?? '/services'),
      items: toServices(services.children),
    },
    ref: toSpotlight(data.ref, '/images/heros/ref.svg'),
    users: toUsers(data.users),
  }
}

export const loadHomePage = cache(async (): Promise<HomePageData> => {
  const raw = parse(readFileSync(homePath, 'utf8'))
  const data = deepCamelize(raw)

  if (!isRecord(data)) {
    throw new Error('Invalid home page content')
  }

  const statistics = await fetchCoreStatistics().catch(() => ({}))

  return toHomePage(data, statistics)
})
