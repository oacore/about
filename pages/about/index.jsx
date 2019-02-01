import React, { Component } from 'react'
import { Collapse, Row, Col, Card, CardBody } from 'reactstrap'
import { bind } from 'decko'
import { Article, Content, Section, Collapsed, Button } from 'components'
import Link from 'components/link'
import TeamMember from 'components/team-member'
import ContactForm from 'components/contact-form'
import aboutData from 'data/about.yml'
import teamData from 'data/team.yml'

import mapImage from '../../images/map.png'

import './about.scss'

class ContactFormCard extends Component {
  state = {
    isOpen: false,
  }

  @bind
  toggle() {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }))
  }

  @bind
  process(event) {
    event.preventDefault()
    setTimeout(this.toggle, 500)
  }

  render() {
    const { isOpen } = this.state
    const { className = '', tag, ...restProps } = this.props

    return (
      <Card
        className={`contact-card ${isOpen ? 'active' : ''} ${className}`}
        tag={tag}
      >
        <Button
          type="button"
          color="primary"
          outline
          className="contact-card-toggle"
          active={isOpen}
          disabled={isOpen}
          onClick={this.toggle}
        >
          &#9993; Send us a message
        </Button>
        <Collapse isOpen={isOpen}>
          <CardBody>
            <ContactForm
              action="/contact"
              onSubmit={this.process}
              onCancel={this.toggle}
              {...restProps}
            />
          </CardBody>
        </Collapse>
      </Card>
    )
  }
}

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
        <Col xs="12" sm="6" md="7" lg="9" tag="section">
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

        <Col xs="12" sm="6" md="5" lg="3" className="mt-3 mt-sm-0" tag="aside">
          <h4>{aboutData.blog.title}</h4>
          <Content markdown>{aboutData.blog.content}</Content>
          <div className="text-center">
            <Button color="primary" outline>
              {aboutData.blog.visitButton}
            </Button>
          </div>
        </Col>
      </Row>
    </Section>

    <Section className="about-endorsements-section" id="endorsements">
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
            <img src={mapImage} alt="Map" className="w-100 m-auto" />
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
                <a className="btn btn-link" href="https://www.google.com/">
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

    <Section id="contact" caption="Contact us">
      <Row>
        <Col md="9">
          <h2>{aboutData.contacts.title}</h2>
          <ContactFormCard />
          <Row className="py-3">
            <Col md="3" className="font-weight-bold">
              {aboutData.contacts.address.caption}
            </Col>

            <Col md="9">
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
        </Col>
      </Row>
    </Section>

    <Section id="resources" caption="Resources">
      <Row>
        <Col md="9">
          <h2>{aboutData.resources.title}</h2>
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
        </Col>
      </Row>
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
            <ul className="list-unstyled">
              {teamData.pastMembers.map(({ name, role, picture }) => (
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
        </Col>
      </Row>
    </Section>
  </Article>
)

export default AboutPage
