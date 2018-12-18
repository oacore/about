import React from 'react'
import { Container } from 'reactstrap'

import {
  Layout,
  Hero,
  KeyFeature,
  KeyFeatureList,
  Switcher,
  Content,
  Section,
} from '../components'

import page from '../data/home.yml'
import { testimonials } from '../data/endorsements.yml'

import './index.scss'

const TestimonialsSwitcher = ({ limit, ...restProps }) => (
  <Switcher {...restProps}>
    {testimonials.slice(0, limit).map(({ quote, author }, i) => {
      const id = `quote-${i}`
      const title = /^([\w\s.]+),/.exec(author)[1] || author
      return (
        <Switcher.Item
          id={id}
          title={title}
          key={author}
          className="home-switcher"
        >
          <blockquote className="blockquote">
            <Content markdown>{quote}</Content>
            <footer className="blockquote-footer">{author}</footer>
          </blockquote>
        </Switcher.Item>
      )
    })}
  </Switcher>
)

class IndexPage extends React.Component {
  // TODO: Avoid this hack
  // TODO: Override Document class
  componentDidMount() {
    document.body.classList.add('home')
  }

  componentWillUnmount() {
    document.body.classList.remove('home')
  }

  render() {
    return (
      <Layout>
        <Hero>{page.hero}</Hero>

        <Section tag="div">
          <Container>
            <KeyFeatureList>
              {page.keyFeatures.map(({ title, description, picture }) => (
                <KeyFeature title={title} icon={picture}>
                  <Content markdown>{description}</Content>
                </KeyFeature>
              ))}
            </KeyFeatureList>
          </Container>
        </Section>

        <Section id="endorsements" container>
          <Container>
            <h2>{page.endorsements.title}</h2>
          </Container>

          <Section id="enterprise">
            <Container>
              <h3>{page.endorsements.enterprise.title}</h3>
              <p>{page.endorsements.enterprise.description}</p>
              <TestimonialsSwitcher
                limit={page.endorsements.enterprise.limit}
              />
            </Container>
          </Section>

          <Section id="academic-institutions">
            <Container>
              <h3>{page.endorsements.academic.title}</h3>
              <p>{page.endorsements.academic.description}</p>
              <TestimonialsSwitcher
                limit={page.endorsements.enterprise.limit}
              />
            </Container>
          </Section>
        </Section>

        <Section id="partner-projects">
          <Container>
            <h2>{page.partnerProjects.title}</h2>
            <TestimonialsSwitcher />
          </Container>
        </Section>
      </Layout>
    )
  }
}

export default IndexPage
