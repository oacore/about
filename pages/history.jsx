import React from 'react'

const HistoryEvent = ({ event }) => (
  <div>
    <img src={event.imageUrl} alt="" />
    <div>
      <time dateTime={event.fullDate}>{event.date}</time>
      <h3>{event.title}</h3>
      <p>{event.body}</p>
      <a href={event.link.href} target="_blank" rel="noreferrer">
        <h4>{event.link.caption}</h4>
        <p>{event.link.source}</p>
      </a>
    </div>
  </div>
)

const HistoryPage = ({ data }) => (
  <>
    <p>{data?.body}</p>
    {data.events.slice(1).map((event) => (
      <HistoryEvent event={event} />
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
    const getMonth = (dateString) => dateString.slice(5, 7)

    const monthNames = {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December',
    }

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
