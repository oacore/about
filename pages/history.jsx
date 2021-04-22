import React from 'react'

import { Markdown } from 'components'
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

const HistoryEvent = ({ event }) => (
  <div>
    <div>
      <img src={event.image.src} alt={event.image.alt} />
    </div>
    <div>
      <time dateTime={event.id}>{event.date}</time>
      <h3>{event.title}</h3>
      <Markdown>{event.body}</Markdown>
      <LinkCard link={event.link} />
    </div>
  </div>
)

const HistoryPage = ({ data }) => (
  <>
    <Markdown>{data?.body}</Markdown>
    {data.events.slice(1).map((event) => (
      <HistoryEvent key={event.id} event={event} />
    ))}
    <div id="root">
      <Markdown>{data.events[0]?.body}</Markdown>
    </div>
  </>
)

const ASSETS_BASE_URL = 'https://oacore.github.io/content/'

const getPageData = async () => historyData

const getEvents = async () => {
  const events = await retrieveContent('history', { ref: 'history' })

  events.forEach((event) => {
    if ('image' in event)
      event.image.src = new URL(event.image.src, ASSETS_BASE_URL).href
  })

  const formatter = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
  })

  const processedEvents = events
    .sort((event1, event2) => (event1.date < event2.date ? -1 : 1))
    .map((event) => ({
      ...event,
      date: formatter.format(event.date),
    }))

  return processedEvents
}

export async function getStaticProps() {
  const data = await getPageData()
  const events = await getEvents()

  return {
    props: {
      data: {
        ...data,
        events,
      },
    },
  }
}

export default HistoryPage
