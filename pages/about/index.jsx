import React from 'react'
import { Row, Col } from 'reactstrap'
import { classNames } from '@oacore/design/lib/utils'

import styles from './about.module.scss'

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
  OutreachMaterials,
  RepositoriesMap,
  ServiceGroups,
  Video,
} from 'components'
import { patchStats } from 'components/utils'
import aboutData from 'data/about.yml'
import servicesData from 'data/services.yml'
import { resources } from 'data/resources.yml'
import contactData from 'data/contacts.yml'
import retrieveContent from 'content'

const repositoriesUrl = 'https://api.core.ac.uk/internal/repositories/formap'

const RelatedContentSection = ({ children, data, className, ...passProps }) => (
  <Section
    className={classNames.use(styles.related).join(className)}
    tag="aside"
    {...passProps}
  >
    {data.picture && (
      <img
        className={styles['related-icon']}
        src={`/images/icons/${data.picture}`}
        alt=""
      />
    )}
    <h2>{data.title}</h2>
    {children || <Markdown>{data.body}</Markdown>}
    <p>
      <Button color="primary" outline href={data.action.href}>
        {data.action.label}
      </Button>
    </p>
  </Section>
)

const AboutPage = ({ data }) => (
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

          <Markdown>{aboutData.mission.content}</Markdown>
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

    <RelatedContentSection
      id="endorsements"
      data={{
        ...aboutData.endorsements,
        action: {
          label: aboutData.endorsements.action,
          href: '~about/endorsements',
        },
      }}
    />

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
          <Button color="primary" outline href="~register-data-provider">
            {aboutData.howItWorks.harvesting.actions.primary}
          </Button>

          <Button color="link" href="~data-providers">
            {aboutData.howItWorks.harvesting.actions.secondary}
          </Button>
        </ButtonToolbar>
      </Section>
    </Section>

    <RelatedContentSection
      id="services"
      data={{
        ...aboutData.howItWorks.services,
        action: {
          label: aboutData.howItWorks.services.action,
          href: '~services',
        },
      }}
    >
      <ServiceGroups className="text-left" items={servicesData.sections} />
    </RelatedContentSection>

    <Section id="team" caption={aboutData.team.shortTitle}>
      <h2>{aboutData.team.title}</h2>
      <Row className="list-unstyled" tag="ul">
        {data.team.members.current.map((member) => (
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
              description={member.body}
              picture={member.photoUrl}
            />
          </Col>
        ))}
      </Row>

      <h3 className="mt-5">Past team members</h3>
      <Content>
        <ul className="list-comma-separated">
          {data.team.members.past.map(({ id, name }) => (
            <li id={id} key={id}>
              {name}
            </li>
          ))}
        </ul>
      </Content>
    </Section>

    <RelatedContentSection
      id="research-outputs"
      data={{
        ...aboutData.research,
        action: {
          label: aboutData.research.action,
          href: '~research-outputs',
        },
      }}
    />

    <Section id="resources" caption={aboutData.resources.shortTitle}>
      <h2>{aboutData.resources.title}</h2>
      <Row className="list-unstyled" tag="ul">
        {resources.slice(0, 3).map((resource) => (
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

    <RelatedContentSection
      id="ambassadors"
      caption={aboutData.ambassadors.shortTitle}
      data={{
        ...aboutData.ambassadors,
        action: {
          label: aboutData.ambassadors.action,
          href: '~about/ambassadors',
        },
      }}
    />

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

        {contactData.outro && <Markdown>{contactData.outro}</Markdown>}
      </Content>
    </Section>
  </Page>
)

const getTeamMembers = async ({ ref } = {}) => {
  const allTeamMembers = (await retrieveContent('team', { ref })).map(
    (member) => ({
      ...member,
      // TODO: Move to the global domains configuration
      photoUrl: new URL(member.photo, 'https://oacore.github.io/content/').href,
    })
  )

  const compareTeamMembers = (first, second) =>
    first.order !== second.order
      ? (second.order || 0) - (first.order || 0) // bigger number goes first
      : first.lastName.localeCompare(second.lastName)

  const currentTeamMembers = allTeamMembers
    .filter(({ past }) => !past)
    .sort(compareTeamMembers)
    .map(({ firstName, lastName, ...member }) => ({
      ...member,
      name: `${firstName} ${lastName}`,
    }))

  const pastTeamMembers = allTeamMembers
    .filter(({ past }) => past)
    .sort(compareTeamMembers)
    // Optimising data transferring cutting out data that won't be rendered
    .map(({ id, firstName, lastName }) => ({
      id,
      name: `${firstName} ${lastName}`,
    }))

  return {
    current: currentTeamMembers,
    past: pastTeamMembers,
  }
}

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref

  const teamMembers = await getTeamMembers({ ref })

  return {
    props: {
      data: {
        team: {
          members: teamMembers,
        },
      },
    },
  }
}

export default AboutPage
