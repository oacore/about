import type { OutreachMaterial } from '@components/outreach-materials/types'

export type AmbassadorLocation = {
  latitude: number
  longitude: number
}

export type AmbassadorMember = {
  id: string
  name: string
  country: string
  role?: string
  organization?: string
  region?: string
  picture?: string
  location: AmbassadorLocation
}

export type AmbassadorRegion = {
  id: string
  name: string
  quantity: number
  location: AmbassadorLocation
}

export type AmbassadorsPageData = {
  title?: string
  description?: string
  keywords?: string | string[]
  content?: string
  ambassadorsTitle?: string
  members: AmbassadorMember[]
  mapMembers: AmbassadorMember[]
  regions: AmbassadorRegion[]
  resourcesTitle?: string
  resources: OutreachMaterial[]
}
