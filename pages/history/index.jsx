import React from 'react'

import styles from './history.module.scss'

import { Markdown, Page } from 'components'
import historyData from 'data/history.yml'
import retrieveContent from 'content'

const LinkCard = ({ link }) => (
  <div>
    <h4>
      <a href={link.href} target="_blank" rel="noreferrer">
        {link.caption}
      </a>
    </h4>
    <p>{link.source}</p>
  </div>
)

const Milestone = ({ milestone }) => (
  <section>
    <div>
      <img src={milestone.image.src} alt={milestone.image.alt} />
    </div>
    <div>
      <time dateTime={milestone.id}>{milestone.date}</time>
      <h3>{milestone.title}</h3>
      <Markdown>{milestone.body}</Markdown>
      <LinkCard link={milestone.link} />
    </div>
  </section>
)

const HistoryPage = ({ data }) => (
  <Page
    title={data.title}
    description={data.description}
    className={styles.article}
  >
    <section className={styles['front-section']}>
      <Markdown className={`${styles['root-milestone']} ${styles.top}`}>
        {data?.body}
      </Markdown>
    </section>
    {data.milestones.slice(1).map((milestone) => (
      <Milestone key={milestone.id} milestone={milestone} />
    ))}
    <section id="root">
      <Markdown>{data.milestones[0]?.body}</Markdown>
    </section>
  </Page>
)

const ASSETS_BASE_URL = 'https://oacore.github.io/content/'

const getPageData = async () => historyData

const getMilestones = async () => {
  const milestones = await retrieveContent('history', { ref: 'history' })

  milestones.forEach((milestone) => {
    if ('image' in milestone)
      milestone.image.src = new URL(milestone.image.src, ASSETS_BASE_URL).href
  })

  const formatter = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
  })

  const processedMilestones = milestones
    .sort((milestone1, milestone2) =>
      milestone1.date < milestone2.date ? -1 : 1
    )
    .map((milestone) => ({
      ...milestone,
      date: formatter.format(milestone.date),
    }))

  return processedMilestones
}

export async function getStaticProps() {
  const data = await getPageData()
  const milestones = await getMilestones()

  return {
    props: {
      data: {
        ...data,
        milestones,
      },
    },
  }
}

export default HistoryPage
