import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import { Article, Content, Layout, Section, Collapsed } from '../../components'

import mapImage from '../../images/map.png'

import aboutData from '../../data/about.yml'
import teamData from '../../data/team.yml'

const AboutPage = () => (
  <Layout container>
    <Article nav tag="main">
      <h1 className="mb-3">{aboutData.title}</h1>

      <Section id="our-mission" caption="Our mission">
        <Row>
          <Col xs="12" sm="6" md="7" lg="9">
            <h2>{aboutData.mission.title}</h2>
            <Content markdown>{aboutData.mission.short}</Content>

            <Collapsed id="full-mission" title={aboutData.mission.full.caption}>
              <Content markdown>{aboutData.mission.full.content}</Content>
            </Collapsed>
            <hr className="my-5" />
          </Col>

          <Col xs="12" sm="6" md="5" lg="3">
            <p className="h4 mb-3">{aboutData.blog.title}</p>
            <Content markdown>{aboutData.blog.content}</Content>
            <div className="text-center">
              <Button color="primary" outline>
                Visit the blog
              </Button>
            </div>
          </Col>
        </Row>
      </Section>

      <Section id="how-it-works" caption="How it works">
        <h2 className="mb-5">{aboutData.howitworks.title}</h2>
        <h3 className="mb-3">{aboutData.howitworks.harvesting.title}</h3>
        <Row>
          <Col xs="12" md="6">
            <Content markdown>
              {aboutData.howitworks.harvesting.content}
            </Content>
          </Col>

          <Col xs="12" md="6">
            <img src={mapImage} alt="Map" className="w-100 m-auto" />
          </Col>
        </Row>

        <Row className="align-items-center py-5 ">
          <Col xs="6" className="text-right">
            <a href="https://www.google.com/">
              See the full list of data providers
            </a>
          </Col>

          <Col xs="6">
            <Button color="primary" outline>
              Become a data provider
            </Button>
          </Col>
        </Row>

        <hr className="m-5" />

        <Row>
          <Col md="9">
            <h3 className="mb-3">{aboutData.howitworks.services.title}</h3>
            <Content markdown>{aboutData.howitworks.services.content}</Content>

            <Row className="align-items-center py-3">
              <Col xs="6" className="text-right">
                <a href="https://www.google.com/">Explore our services</a>
              </Col>

              <Col className="my-3" xs="6">
                <Button color="primary">Join CORE today for free</Button>
              </Col>
            </Row>
            <hr className="my-5" />
          </Col>
        </Row>
      </Section>

      <Section id="contact" caption="Contact us">
        <Row>
          <Col md="9">
            <h2 className="mb-5">{aboutData.contacts.title}</h2>
            <Row className="my-5">
              <Col xs="6">
                <Button color="primary" className="btn-send" outline>
                  &nbsp; Send us a message
                </Button>
              </Col>
            </Row>
            <Row>
              <Col md="4" className="font-weight-bold">
                {aboutData.contacts.address.caption}
              </Col>

              <Col md="8">
                <address>
                  {aboutData.contacts.address.name}
                  <br />
                  {aboutData.contacts.address.org}
                  <br />
                  {aboutData.contacts.address.city}
                  <br />
                  {aboutData.contacts.address.country}
                </address>
              </Col>
            </Row>

            <hr className="my-5" />
          </Col>
        </Row>
      </Section>

      <Section id="resources" caption="Resources">
        <Row>
          <Col md="9">
            <h2 className="mb-5">{aboutData.resources.title}</h2>
            <Collapsed
              id="promotion-materials"
              title={aboutData.resources.promotionmaterials.title}
            >
              <Content markdown>
                {aboutData.resources.promotionmaterials.content}
              </Content>
            </Collapsed>
            <Collapsed
              id="researchoutputs"
              title={aboutData.resources.researchoutputs.title}
            >
              <Content markdown>
                {aboutData.resources.researchoutputs.content}
              </Content>
            </Collapsed>

            <hr className="my-5" />
          </Col>
        </Row>
      </Section>

      <Section id="team" caption="The team" className="mb-5">
        <Row>
          <Col md="9">
            <h2 className="mb-5">{teamData.title}</h2>
            <Collapsed
              id="current-members"
              title="Current members of the CORE team"
              open
            >
              {teamData.members.map(({ name, job }) => (
                <p key={`${name}, ${job}`}>
                  {name}, {job}
                </p>
              ))}
            </Collapsed>
            <Collapsed id="past-members" title="Past members of the CORE team">
              {teamData['past-members'].map(({ name, job }) => (
                <p key={`${name}, ${job}`}>
                  {name}, {job}
                </p>
              ))}
            </Collapsed>
          </Col>
        </Row>
      </Section>
    </Article>
  </Layout>
)

export default AboutPage
