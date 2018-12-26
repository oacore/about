import React from 'react'
import { Article, Section, Accordion, Content } from '../components'

import faqData from '../data/faq.yml'

const itemToURL = id => {
  const url = new URL(window.location)
  url.hash = id ? `#${id}` : ''
  window.history.replaceState({}, null, url.toString())
}

const FAQsPage = () => (
  <Article container>
    <h1>{faqData.title}</h1>
    {faqData.sections.map(section => (
      <Section caption={section.title} key={section.title}>
        <h2>{section.title}</h2>
        <Accordion onToggle={itemToURL}>
          {section.items.map(({ slug, question, answer }) => (
            <Accordion.Item id={slug} title={question} key={slug}>
              <Content markdown>{answer}</Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </Section>
    ))}
  </Article>
)

export default FAQsPage
