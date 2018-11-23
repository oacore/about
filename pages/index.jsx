import React from 'react'
import { Container } from 'reactstrap'
import NextLink from 'next/link'

import { Layout, Hero, KeyFeature, KeyFeatureList } from '../components'

import apiIcon from '../images/api.svg'
import globeIcon from '../images/globe.svg'
import hallIcon from '../images/hall.svg'

/* eslint-disable jsx-a11y/anchor-is-valid */
const Link = ({ children, ...args }) => (
  <NextLink {...args}>
    <a>{children}</a>
  </NextLink>
)
/* eslint-enable jsx-a11y/anchor-is-valid */

const IndexPage = () => (
  <Layout>
    <Hero>
      Seamless access to the worldʼs biggest collection of open access research
      papers
    </Hero>

    <Container>
      <KeyFeatureList className="my-5">
        <KeyFeature title="Worldwide data" icon={globeIcon}>
          We aggregate and enrich open access research papers from around the
          world
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
  </Layout>
)

export default IndexPage
