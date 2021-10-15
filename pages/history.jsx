import retrieveContent from 'content'
import { patchStats } from 'components/utils'
import { HistoryPage } from 'templates'

const ASSETS_BASE_URL = 'https://oacore.github.io/content/'

const getMilestones = async ({ ref } = {}) => {
  const milestones = await retrieveContent('history', { ref })

  milestones.forEach((milestone) => {
    if ('image' in milestone) {
      const relativeUrl = milestone.image.src.replace(/^\/?/, './')
      milestone.image.src = new URL(relativeUrl, ASSETS_BASE_URL).href
    }
  })

  const formatter = {
    long: new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
    }),
    numeric: new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'numeric',
    }),
  }

  const processedMilestones = milestones
    .sort((milestone1, milestone2) =>
      milestone1.date < milestone2.date ? -1 : 1
    )
    .map((milestone) => ({
      ...milestone,
      date: {
        numeric: formatter.numeric.format(milestone.date).replace('/', '-'),
        long: formatter.long.format(milestone.date),
      },
    }))

  return processedMilestones
}

async function getStaticProps({ previewData }) {
  const ref = previewData?.ref

  const { statistics, body: intro, ...page } = (
    await import('data/history.yml')
  ).default
  const milestones = await getMilestones({ ref })
  const data = {
    ...page,
    milestones: milestones.slice().reverse(),
  }

  data.searchPlaceholder = patchStats(data.searchPlaceholder, statistics)
  data.intro = patchStats(intro, statistics)

  return {
    props: {
      data,
    },
  }
}

export default HistoryPage
export { getStaticProps }
