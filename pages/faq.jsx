import React from 'react'
import { Page, Section, Accordion, Markdown, Content } from 'components'

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
      <Content>
        <Accordion onToggle={itemToURL}>
          {items.map(({ slug, question, answer }) => (
            <Accordion.Item id={slug} title={question} key={slug}>
              <Markdown>{answer}</Markdown>
            </Accordion.Item>
          ))}
        </Accordion>
      </Content>
      {sections.map(section => (
        <FAQsSection key={section.title} level={level + 1} {...section} />
      ))}
    </Section>
  )
}

const FAQsPage = () => (
  <Page
    title={faqData.title}
    description={faqData.description}
    keywords={faqData.keywords}
    nav
  >
    <h1>{faqData.title}</h1>
    {faqData.sections.map(section => (
      <FAQsSection key={section.title} {...section} />
    ))}
  </Page>
)

export default FAQsPage
