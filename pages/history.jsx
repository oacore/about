import retrieveContent from 'content'
import { patchStats } from 'components/utils'
import { HistoryPage } from 'templates'

const ASSETS_BASE_URL = 'https://oacore.github.io/content/'

const getMilestones = async () => {
  const milestones = await retrieveContent('history')

  milestones.forEach((milestone) => {
    if ('image' in milestone)
      milestone.image.src = new URL(milestone.image.src, ASSETS_BASE_URL).href
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

async function getStaticProps() {
  const { statistics, body: intro, ...page } = (
    await import('data/history.yml')
  ).default
  const milestones = await getMilestones()
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
