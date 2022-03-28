import { PAGE_SLUG } from './oai-resolver'

import retrieveContent from 'content'
import { MarkdownPage } from 'templates'

const PAGES_BASE = 'docs'

async function getStaticProps({ params, previewData }) {
  const ref = previewData?.ref
  const { slug } = params

  const filepath = `${PAGES_BASE}/${slug}.md`
  const data = await retrieveContent(filepath, { ref })

  return {
    props: {
      data,
    },
  }
}

async function getStaticPaths() {
  const pages = await retrieveContent(PAGES_BASE)

  const paths = pages.reduce((result, item) => {
    if (item.id !== PAGE_SLUG) {
      result.push({
        params: { slug: item.id },
      })
    }
    return result
  }, [])

  return {
    paths,
    fallback: false,
  }
}

// This bare import could be composed with a page created here
// if more props needed to process
export default MarkdownPage
export { getStaticProps, getStaticPaths }
