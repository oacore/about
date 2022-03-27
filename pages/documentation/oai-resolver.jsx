import retrieveContent from 'content'
import { DocumentationPageOaiResolver } from 'templates'

const PAGES_BASE = 'docs'
const PAGE_SLUG = 'oai-resolver'

async function getStaticProps({ previewData }) {
  const ref = previewData?.ref
  const filepath = `${PAGES_BASE}/${PAGE_SLUG}.md`
  const data = await retrieveContent(filepath, { ref })

  return {
    props: {
      data,
    },
  }
}

async function getStatPaths() {
  const paths = [{ params: { slug: 'oai-resolver' } }]

  return {
    paths,
    fallback: false,
  }
}

// This bare import could be composed with a page created here
// if more props needed to process
export default DocumentationPageOaiResolver
export { getStaticProps, getStatPaths }
