import React from 'react'
import { Layout, Article, Section, Content } from '../../components'

import apiText from './api.md'
import datasetsText from './datadumps.md'
import dashboardText from './dashboard.md'
import recommenderText from './plugin.md'
import connectorText from './connector.md'

const ServicesPage = () => (
  <Layout container>
    <Article nav>
      <h1>Services</h1>
      <Content>
        If you use CORE in your work, we kindly request that you cite our
        [publications](path_core_about_research_outputs)
      </Content>
      <Section id="api" caption="API">
        <Content markdown>{apiText}</Content>
      </Section>
      <Section id="datasets" caption="Datasets">
        <Content markdown>{datasetsText}</Content>
      </Section>
      <Section id="dashboard" caption="Dashboard">
        <Content markdown>{dashboardText}</Content>
      </Section>
      <Section id="recommender" caption="CORE Recommender">
        <Content markdown>{recommenderText}</Content>
      </Section>
      <Section id="connector" caption="Publisher connector">
        <Content markdown>{connectorText}</Content>
      </Section>
    </Article>
  </Layout>
)

export default ServicesPage
