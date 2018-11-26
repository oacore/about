import React from 'react'
import { Container } from 'reactstrap'
import NextLink from 'next/link'

import {
  Layout,
  Hero,
  KeyFeature,
  KeyFeatureList,
  Switcher,
} from '../components'

import apiIcon from '../images/api.svg'
import globeIcon from '../images/globe.svg'
import hallIcon from '../images/hall.svg'

import './index.scss'

/* eslint-disable jsx-a11y/anchor-is-valid */
const Link = ({ children, ...args }) => (
  <NextLink {...args}>
    <a>{children}</a>
  </NextLink>
)
/* eslint-enable jsx-a11y/anchor-is-valid */

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
        <Hero>
          Seamless access to the worldʼs biggest collection of open access
          research papers
        </Hero>

        <div className="home-key-features">
          <Container>
            <KeyFeatureList>
              <KeyFeature title="Worldwide data" icon={globeIcon}>
                We aggregate and enrich open access research papers from around
                the world
                <br />
                <Link href="/services/data">Read about our data</Link>
              </KeyFeature>
              <KeyFeature title="Unique APIs" icon={apiIcon}>
                We provide seamless access to content and data, through our
                unique&nbsp;<Link href="/services/api">APIs</Link>
                <br />
                <Link href="/services/api">Perfect for text mining!</Link>
              </KeyFeature>
              <KeyFeature title="Powerful Services" icon={hallIcon}>
                We create powerful <Link href="/services">services</Link> for
                researchers, universities, and industry
              </KeyFeature>
            </KeyFeatureList>
          </Container>
        </div>

        <Container className="py-5">
          <h2 className="text-center">Partner projects</h2>
          <p className="mt-3 text-center">
            Organizations from around the world have worked with us
          </p>
          <Switcher className="home-switcher">
            <Switcher.Item id="lorem-company" title="Lorem company">
              <blockquote className="blockquote">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.
                <footer className="blockquote-footer">
                  Someone famous in Source Title
                </footer>
              </blockquote>
            </Switcher.Item>
            <Switcher.Item id="ipsum-company" title="Ipsum company" active>
              <blockquote className="blockquote">
                Ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.
                <footer className="blockquote-footer">
                  Someone famous in Source Title
                </footer>
              </blockquote>
            </Switcher.Item>
          </Switcher>
        </Container>
      </Layout>
    )
  }
}

export default IndexPage
