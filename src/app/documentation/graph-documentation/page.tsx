import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// import { GraphDocumentationPage } from '@features/Documentation/graph-documentation'

// import { loadGraphDocumentationPage } from './loadGraphDocumentationPage'

/*
 * CORE Graph API documentation is ported but DISABLED: this route always returns 404.
 * (The old about repo also returned notFound in production: pages/documentation/graph-documentation.jsx.)
 *
 * Before enabling it:
 * - The guide's DocsSection (src/features/Documentation/guide/components) needs GFM tables,
 *   fenced code blocks, `note` and `contentBlocks` support: the docs-graph content relies on all of them.
 * - Then uncomment the imports above and the code below, delete the `notFound()` call, and
 *   uncomment the Graph option in src/features/Documentation/guide/constants.ts.
 */

export const metadata: Metadata = {
  robots: { index: false },
}

// export const generateMetadata = async (): Promise<Metadata> => {
//   const { meta } = await loadGraphDocumentationPage()
//
//   return {
//     title: meta?.title,
//     description: meta?.description ?? meta?.tagline,
//   }
// }

const GraphDocumentationRoutePage = async () => {
  notFound()

  // const { docs, navigation } = await loadGraphDocumentationPage()
  //
  // return <GraphDocumentationPage docs={docs} navigation={navigation} />
}

export default GraphDocumentationRoutePage
