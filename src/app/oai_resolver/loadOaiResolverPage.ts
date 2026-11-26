import { cache } from 'react'

import { getSections } from 'content'

import type { OaiResolverPageData } from '@features/oai-resolver/types'

export const loadOaiResolverPage = cache(async (): Promise<OaiResolverPageData> => {
  return (await getSections('oai-resolver')) as OaiResolverPageData
})
