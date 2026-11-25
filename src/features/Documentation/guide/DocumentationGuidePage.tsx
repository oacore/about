'use client'

import {
  DocumentationGuidePage as CoreDocumentationGuidePage,
  type DocumentationGuidePageProps as CoreDocumentationGuidePageProps,
} from '@core/core-ui'
import { usePathname, useRouter } from 'next/navigation'

import Markdown from '@components/Markdown/Markdown'

import { DOCUMENTATION_SWITCHER_OPTIONS, DOCUMENTATION_SWITCHER_TITLES } from './constants'

export type DocumentationGuidePageProps = Omit<
  CoreDocumentationGuidePageProps,
  'switcher' | 'markdownComponent'
>

/**
 * core-ui's DocumentationGuidePage with the about site's parts: the switcher opens each guide's
 * own page, and section text uses the site Markdown (resolves `~route` links).
 */
const DocumentationGuidePage = (props: DocumentationGuidePageProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const switcher = {
    options: DOCUMENTATION_SWITCHER_TITLES,
    onChange: (title: string) => {
      const target = DOCUMENTATION_SWITCHER_OPTIONS.find((option) => option.title === title)

      if (target && target.href !== pathname) {
        router.push(target.href)
      }
    },
  }

  return <CoreDocumentationGuidePage {...props} markdownComponent={Markdown} switcher={switcher} />
}

export default DocumentationGuidePage
