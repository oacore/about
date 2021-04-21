import React from 'react'

const LinkCard = ({ link }) => (
  <div>
    <h4>{link.caption}</h4>
    <p>{link.source}</p>
    <a href={link.href} target="_blank" rel="noreferrer"></a>
  </div>
)

const HistoryEvent = ({ event }) => (
  <div>
    <div>
      <img src={event.image.src} alt={event.image.alt} />
    </div>
    <div>
      <time dateTime={event.fullDate}>{event.date}</time>
      <h3>{event.title}</h3>
      <p>{event.body}</p>
      <LinkCard link={event.link} />
    </div>
  </div>
)

const HistoryPage = ({ data }) => (
  <>
    <p>{data?.body}</p>
    {data.events.slice(1).map((event, index) => (
      <HistoryEvent key={index} event={event} />
    ))}
    <p>{data.events[0]?.body}</p>
  </>
)

const getPageData = async () => {
  const data = {}

  return data
}

const getEvents = async () => {
  const events = []

  const formatDate = (date) => {
    // Assuming format: 'YYYY.MM.DD'
    const getMonth = (dateString) => +dateString.slice(5, 7)

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    return `${monthNames[getMonth(date)]} ${date.slice(0, 4)}`
  }

  const processedEvents = events.map((event) => ({
    ...event,
    fullDate: event.date,
    date: formatDate(event.date),
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
