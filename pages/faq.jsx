import React from 'react'
import { Layout, Article, Section, Accordion, Content } from '../components'

import faqData from '../data/faq.yml'

const FAQsPage = () => (
  <Layout>
    <Article container>
      <h1>{faqData.title}</h1>
      {faqData.sections.map(section => (
        <Section caption={section.title} key={section.title}>
          <h2>{section.title}</h2>
          <Accordion>
            {section.items.map(({ slug, question, answer }) => (
              <Accordion.Item id={slug} title={question} key={slug}>
                <Content markdown>{answer}</Content>
              </Accordion.Item>
            ))}
          </Accordion>
        </Section>
      ))}
    </Article>
  </Layout>
)

export default FAQsPage
