import React from 'react'

import hatSrc from './assets/hat.svg'
import styles from './history.module.scss'

import { Markdown, Page, Logo } from 'components'
import historyData from 'data/history.yml'
import retrieveContent from 'content'

const parseDataAttributes = (data = {}) =>
  Object.fromEntries(
    Object.entries(data).map(([key, value]) => [`data-${key}`, value])
  )

const LinkCard = ({ link }) => (
  <div className={styles.card}>
    <h4>
      <a href={link.href} target="_blank" rel="noreferrer">
        {link.label}
      </a>
    </h4>
    <p>{link.type}</p>
  </div>
)

const Milestone = ({
  milestone,
  data,
  tag: Tag = 'div',
  className = '',
  ...htmlProps
}) => (
  <Tag
    className={`${styles.milestone} ${className}`}
    {...htmlProps}
    {...parseDataAttributes(data)}
  >
    <div className={styles['milestone-image-container']}>
      {milestone.image && (
        <img
          src={milestone.image.src}
          alt={milestone.image.alt}
          className={styles['milestone-image']}
        />
      )}
    </div>
    <div className={styles['milestone-text-content']}>
      <time className={styles.date} dateTime={milestone.date.numeric}>
        {milestone.date.long}
      </time>
      <h3 className={styles['milestone-title']}>{milestone.title}</h3>
      <Markdown>{milestone.body}</Markdown>
      {milestone.link && <LinkCard link={milestone.link} />}
    </div>
  </Tag>
)

const RootMilestone = ({ children, className = '', ...htmlProps }) => (
  <Markdown
    className={`${styles['root-milestone']} ${className}`}
    {...htmlProps}
  >
    {children}
  </Markdown>
)

const Hero = ({ data, tag: Tag = 'div', className = '', ...htmlProps }) => (
  <Tag className={`${styles.hero} ${className}}`} {...htmlProps}>
    <RootMilestone className={styles.top}>{data?.body}</RootMilestone>
  </Tag>
)

const AnniversaryLogo = () => (
  <div className={styles['anniversary-logo']}>
    <div className={styles['logo-circles']}>
      <div className={`${styles['logo-circle']} ${styles['logo-circle-1']}`} />
      <div className={`${styles['logo-circle']} ${styles['logo-circle-2']}`} />
      <div className={`${styles['logo-circle']} ${styles['logo-circle-3']}`} />
    </div>
    <div className={styles['logo-content']}>
      <Logo />
      <div className={styles['logo-side-text']}>
        <div className={styles['logo-1st-line']}>10</div>
        <div className={styles['logo-2nd-line']}>years</div>
      </div>
    </div>
    <img src={hatSrc} alt="" className={styles['logo-hat']} />
  </div>
)

// TODO: Fix `id` attribute not being rendered to html
const HistoryPage = ({ data }) => (
  <Page
    title={data.title}
    description={data.description}
    className={styles.article}
  >
    <AnniversaryLogo />
    <Hero data={data} />
    {data.milestones
      .slice(1)
      .reverse()
      .map((milestone) => (
        <Milestone key={milestone.id} milestone={milestone} />
      ))}
    <RootMilestone className={styles.bottom} id="root">
      {data.milestones[0]?.body}
    </RootMilestone>
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
