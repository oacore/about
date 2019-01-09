import React from 'react'
import { Article, Section, Accordion, Content } from 'components'

import faqData from 'data/faq.yml'

const itemToURL = id => {
  const url = new URL(window.location)
  url.hash = id ? `#${id}` : ''
  window.history.replaceState({}, null, url.toString())
}

const FAQsSection = ({
  id,
  title,
  items = [],
  sections = [],
  caption = title,
  level = 2,
}) => {
  const Heading = `h${level}`
  return (
    <Section id={id} caption={caption}>
      <Heading>{title}</Heading>
      <Accordion onToggle={itemToURL}>
        {items.map(({ slug, question, answer }) => (
          <Accordion.Item id={slug} title={question} key={slug}>
            <Content markdown>{answer}</Content>
          </Accordion.Item>
        ))}
      </Accordion>
      {sections.map(section => (
        <FAQsSection key={section.title} level={level + 1} {...section} />
      ))}
    </Section>
  )
}

const FAQsPage = () => (
  <Article nav>
    <h1>{faqData.title}</h1>
    {faqData.sections.map(section => (
      <FAQsSection key={section.title} {...section} />
    ))}
    <p>Something to test</p>
    <p>Something else to test</p>
  </Article>
)

export default FAQsPage
