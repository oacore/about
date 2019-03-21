import React from 'react'
import { Row, Col } from 'reactstrap'
import {
  Link,
  Button,
  Blog,
  Article,
  Content,
  Markdown,
  Section,
  TeamMember,
  Collapsed,
  RepositoriesMap,
} from 'components'
import { patchStats } from 'components/utils'

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

          <Markdown>{aboutData.mission.short}</Markdown>

          <Collapsed id="full-mission" title={aboutData.mission.full.caption}>
            <Markdown>{aboutData.mission.full.content}</Markdown>
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

    <Section className="about-endorsements-section" id="endorsements">
      <h2 className="about-endorsements-section-title">
        {aboutData.endorsements.title}
      </h2>
      <Markdown>{aboutData.endorsements.content}</Markdown>
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
            <Content>
              <Markdown>{aboutData.howItWorks.services.content}</Markdown>
            </Content>

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
      <Markdown>{aboutData.resources.content}</Markdown>
    </Section>

    <Section id="team" caption="The team">
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
              picture={`/static/images/team/${member.picture}`}
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

    <Section id="contact" caption="Contact us">
      <h2>{contactData.attributes.title}</h2>
      <Content>
        <Markdown>{contactData.body}</Markdown>
      </Content>
    </Section>
  </Article>
)

export default AboutPage
