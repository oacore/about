import React from 'react'
import { Layout, Article, Section, Content } from '../../components'

import apiText from './api.md'

const ServicesPage = () => (
  <Layout container>
    <Article nav>
      <h1>Services</h1>
      <Section id="api" caption="API">
        <Content markdown>{apiText}</Content>
      </Section>
    </Article>
  </Layout>
)

export default ServicesPage
