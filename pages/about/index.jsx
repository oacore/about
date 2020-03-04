import React from 'react'
import { Row, Col } from 'reactstrap'

import { repositoriesUrl } from '../data/providers'

import {
  Accordion,
  Button,
  ButtonToolbar,
  Blog,
  Page,
  Content,
  Markdown,
  Section,
  TeamMember,
  Collapsed,
  OutreachMaterials,
  RepositoriesMap,
  ServiceGroups,
  Video,
} from 'components'
import { patchStats } from 'components/utils'
import aboutData from 'data/about.yml'
import teamData from 'data/team.yml'
import servicesData from 'data/services.yml'
import { resources } from 'data/resources.yml'
import contactData from 'data/contacts.yml'

import './about.scss'

const AboutPage = () => (
  <Page
    title={aboutData.title}
    description={aboutData.description}
    keywords={aboutData.keywords}
    nav
  >
    <h1>{aboutData.title}</h1>

    <Section id="our-mission" caption={aboutData.mission.shortTitle} tag="div">
      <Row>
        <Col xs="12" md="7" lg="8" tag="section">
          <h2>{aboutData.mission.title}</h2>

          <Video
            src={aboutData.video.src}
            title={aboutData.video.title}
            tag="p"
          />

          <Markdown>{aboutData.mission.short}</Markdown>

          <Collapsed id="full-mission" title={aboutData.mission.full.caption}>
            <Markdown>{aboutData.mission.full.content}</Markdown>
          </Collapsed>
        </Col>

        <Col
          xs="12"
          md="5"
          lg="4"
          className="d-none d-md-block mt-3 mt-sm-0"
          tag="aside"
        >
          <h4 className="mt-md-3">{aboutData.blog.title}</h4>
          <Blog endpoint="https://api.core.ac.uk/internal/blog/feed" />
          <ButtonToolbar align="center">
            <Button href="~blog" className="mt-3" color="primary" outline>
              {aboutData.blog.visitButton}
            </Button>
          </ButtonToolbar>
        </Col>
      </Row>
    </Section>

    <Section className="about-endorsements-section" id="endorsements">
      <h2 className="about-endorsements-section-title">
        {aboutData.endorsements.title}
      </h2>
      <Markdown>{aboutData.endorsements.content}</Markdown>
      <Button color="primary" outline href="~about/endorsements">
        {aboutData.endorsements.action}
      </Button>
    </Section>

    <Section id="how-it-works" caption="How it works">
      <h2>{aboutData.howItWorks.title}</h2>
      <Section>
        <h3>{aboutData.howItWorks.harvesting.title}</h3>
        <Row className="mb-3">
          <Col xs="12" md="6">
            <Markdown>
              {patchStats(
                aboutData.howItWorks.harvesting.content,
                aboutData.statistics
              )}
            </Markdown>
          </Col>

          <Col xs="12" md="6">
            <RepositoriesMap endpoint={repositoriesUrl} />
          </Col>
        </Row>

        <ButtonToolbar align="center" className="flex-row-reverse">
          <Button color="primary" outline href="~contact">
            {aboutData.howItWorks.harvesting.actions.primary}
          </Button>

          <Button color="link" href="~data-providers">
            {aboutData.howItWorks.harvesting.actions.secondary}
          </Button>
        </ButtonToolbar>
      </Section>
    </Section>

    <Section className="about-services-section text-center" id="services">
      <h2>{aboutData.howItWorks.services.title}</h2>

      <ServiceGroups items={servicesData.sections} className="text-left" />

      <Button color="primary" outline href="~services">
        {aboutData.howItWorks.services.actions.secondary}
      </Button>
    </Section>

    <Section id="team" caption={teamData.shortTitle}>
      <h2>{teamData.title}</h2>
      <Row className="list-unstyled" tag="ul">
        {teamData.members.map(member => (
          <Col
            className="d-flex flex-column"
            sm="6"
            md="4"
            lg="3"
            tag="li"
            key={member.name}
          >
            <TeamMember
              className="mb-3"
              name={member.name}
              role={member.role}
              description={member.description}
              picture={`/images/team/${member.picture}`}
            />
          </Col>
        ))}
      </Row>

      <h3 className="mt-5">Past team members</h3>
      <Content>
        <ul className="list-comma-separated">
          {teamData.pastMembers.map(name => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </Content>
    </Section>

    <Section
      id="ambassadors"
      className="about-ambassadors-section"
      caption={aboutData.ambassadors.shortTitle}
    >
      <h2>{aboutData.ambassadors.title}</h2>
      <Markdown>{aboutData.ambassadors.body}</Markdown>
      <Button color="primary" outline href="~about/ambassadors">
        {aboutData.ambassadors.action}
      </Button>
    </Section>

    <Section id="resources" caption={aboutData.resources.shortTitle}>
      <h2>{aboutData.resources.title}</h2>
      <Row className="list-unstyled" tag="ul">
        {resources.slice(0, 2).map(resource => (
          <Col
            key={resource.id}
            className="d-flex flex-column"
            sm="6"
            md="4"
            lg="3"
            tag="li"
          >
            <OutreachMaterials
              id={resource.id}
              className="mb-3"
              name={resource.name}
              format={resource.type}
              picture={
                resource.picture && `/images/resources/${resource.picture}`
              }
              link={resource.url}
            />
          </Col>
        ))}
      </Row>
      <Markdown>{aboutData.resources.content}</Markdown>
    </Section>

    <Section id="contact" caption={contactData.title}>
      <h2>{contactData.shortTitle}</h2>

      <Content>
        <Accordion className="mb-3">
          {contactData.cases.map(({ slug, purpose, description }) => (
            <Accordion.Item id={slug} title={purpose} key={slug}>
              <Markdown>{description}</Markdown>
            </Accordion.Item>
          ))}
        </Accordion>

        <Markdown>{contactData.outro}</Markdown>
      </Content>
    </Section>
  </Page>
)

export default AboutPage
