import React from 'react'
import { Row, Col } from 'reactstrap'
import { Article, Content, Section, Collapsed, Button } from 'components'
import Link from 'components/link'
import TeamMember from 'components/team-member'
import RepositoriesMap from 'components/repositories-map'
import Blog from 'components/blog'
import aboutData from 'data/about.yml'
import teamData from 'data/team.yml'
import contactData from 'data/contact.md'

import { repositoriesUrl } from '../data-providers'

import './about.scss'

const Video = ({ src, title, className = '', tag: Tag = 'div' }) => (
  <Tag className={`embed-responsive embed-responsive-16by9 ${className}`}>
    <iframe
      className="embed-responsive-object"
      src={src}
      title={title}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
      allowFullScreen
    />
  </Tag>
)

const AboutPage = () => (
  <Article nav tag="main">
    <h1>{aboutData.title}</h1>

    <Section id="our-mission" caption="Our mission" tag="div">
      <Row>
        <Col xs="12" sm="6" md="7" lg="8" tag="section">
          <h2>{aboutData.mission.title}</h2>

          <Video
            src={aboutData.video.src}
            title={aboutData.video.title}
            tag="p"
          />

          <Content markdown>{aboutData.mission.short}</Content>

          <Collapsed id="full-mission" title={aboutData.mission.full.caption}>
            <Content markdown>{aboutData.mission.full.content}</Content>
          </Collapsed>
        </Col>

        <Col xs="12" sm="6" md="5" lg="4" className="mt-3 mt-sm-0" tag="aside">
          <h4 className="mt-md-3">{aboutData.blog.title}</h4>
          <Blog endpoint="https://api.core.ac.uk/internal/blog/feed" />
          <div className="text-center">
            <Button href="~blog" className="mt-3" color="primary" outline>
              {aboutData.blog.visitButton}
            </Button>
          </div>
        </Col>
      </Row>
    </Section>

    <Section className="about-endorsements-section">
      <h2>{aboutData.endorsements.title}</h2>
      <Content markdown>{aboutData.endorsements.content}</Content>
      <Link href="~about/endorsements" passHref>
        <Button color="primary" outline>
          {aboutData.endorsements.action}
        </Button>
      </Link>
    </Section>

    <Section id="how-it-works" caption="How it works">
      <h2>{aboutData.howItWorks.title}</h2>
      <Section>
        <h3>{aboutData.howItWorks.harvesting.title}</h3>
        <Row>
          <Col xs="12" md="6">
            <Content markdown>
              {aboutData.howItWorks.harvesting.content}
            </Content>
          </Col>

          <Col xs="12" md="6">
            <RepositoriesMap endpoint={repositoriesUrl} />
          </Col>
        </Row>

        <Row className="align-items-center mt-3">
          <Col xs="6" className="text-right">
            <Button href="~data-providers">
              See the full list of data providers
            </Button>
          </Col>

          <Col xs="6">
            <Button color="primary" outline>
              Become a data provider
            </Button>
          </Col>
        </Row>
      </Section>

      <Section className="about-services-section" id="section">
        <Row>
          <Col md="9">
            <h3>{aboutData.howItWorks.services.title}</h3>
            <Content markdown>{aboutData.howItWorks.services.content}</Content>

            <Row className="align-items-center mt-3">
              <Col xs="6" className="text-right">
                <a className="btn btn-link" href="~services">
                  Explore our services
                </a>
              </Col>

              <Col xs="6">
                <Link href="~join" passHref>
                  <Button color="primary">
                    {aboutData.howItWorks.joinButton}
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Section>
    </Section>

    <Section id="resources" caption="Resources">
      <h2>{aboutData.resources.title}</h2>
      <Content markdown>{aboutData.resources.content}</Content>
    </Section>

    <Section id="team" caption="The team">
      <Row>
        <Col md="9">
          <h2>{teamData.title}</h2>
          <Collapsed
            id="current-members"
            title="Current members of the CORE team"
            open
          >
            <ul className="list-unstyled">
              {teamData.members.map(({ name, role, picture }) => (
                <TeamMember
                  key={`${name}, ${role}`}
                  name={name}
                  role={role}
                  picture={picture ? `/static/images/team/${picture}` : null}
                  tag="li"
                />
              ))}
            </ul>
          </Collapsed>
          <Collapsed id="past-members" title="Past members of the CORE team">
            <ul className="list-comma-separated">
              {teamData.pastMembers.map(({ name }) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </Collapsed>
        </Col>
      </Row>
    </Section>

    <Section id="contact" caption="Contact us">
      <h2>{contactData.attributes.title}</h2>
      <Content markdown>{contactData.body}</Content>
    </Section>
  </Article>
)

export default AboutPage
