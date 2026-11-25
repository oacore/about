import { resolveRouteAlias } from '@utils/resolveRouteAlias'

import type { EndorsementOrganization, EndorsementTestimonial } from './types'

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export const asString = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim() ? value.trim() : undefined

export const resolveContentHref = (url: string): string => {
  if (url.startsWith('~')) {
    return resolveRouteAlias(url)
  }

  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('#') ||
    url.startsWith('/')
  ) {
    return url
  }

  return `/${url}`
}

export const resolveExternalTarget = (url?: string): '_blank' | undefined =>
  url?.startsWith('http') ? '_blank' : undefined

export const getQuotedOrganizations = (
  organizations: EndorsementOrganization[],
): EndorsementOrganization[] =>
  organizations.filter((organization) => Boolean(organization.testimonial?.author.name))

export const toTestimonial = (
  organization: EndorsementOrganization,
): (EndorsementTestimonial & { organization: EndorsementOrganization }) | undefined => {
  if (!organization.testimonial?.author.name) {
    return undefined
  }

  return {
    ...organization.testimonial,
    organization,
  }
}

export const extractTestimonials = (organizations: EndorsementOrganization[]) =>
  getQuotedOrganizations(organizations)
    .filter(
      (organization) =>
        organizations.find((other) => other.name === organization.name) === organization,
    )
    .flatMap((organization) => {
      const testimonial = toTestimonial(organization)
      return testimonial ? [testimonial] : []
    })
