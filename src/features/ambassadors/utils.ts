import type { AmbassadorMember, AmbassadorRegion } from './types'

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export const asString = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim() ? value.trim() : undefined

export const asNumber = (value: unknown): number | undefined => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string' && value.trim()) {
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : undefined
  }

  return undefined
}

export const compareMembers = (first: AmbassadorMember, second: AmbassadorMember): number => {
  const country = first.country.localeCompare(second.country)
  if (country !== 0) {
    return country
  }

  return first.name.localeCompare(second.name)
}

export const getStandaloneMembers = (members: AmbassadorMember[]): AmbassadorMember[] =>
  members.filter((member) => member.region == null)

export const getRegionsWithQuantity = (
  regions: Omit<AmbassadorRegion, 'quantity'>[],
  members: AmbassadorMember[],
): AmbassadorRegion[] =>
  regions.flatMap((region) => {
    const quantity = members.filter((member) => member.region === region.id).length

    if (!quantity) {
      return []
    }

    return [{ ...region, quantity }]
  })
