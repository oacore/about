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
    {data.iconUrl && (
      <img className={styles['related-icon']} src={data.iconUrl} alt="" />
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
    title={data.meta.title}
    description={data.meta.description}
    keywords={data.meta.keywords}
    nav
  >
    <h1>{data.meta.headline}</h1>

    <Section id="our-mission" caption={data.mission.shortTitle} tag="div">
      <Row>
        <Col xs="12" md="7" lg="8" tag="section">
          <h2>{data.mission.title}</h2>

          <Video
            src={data.mission.video.src}
            title={data.mission.video.title}
            tag="p"
          />

          <Markdown>{data.mission.body}</Markdown>
        </Col>

        <Col
          xs="12"
          md="5"
          lg="4"
          className="d-none d-md-block mt-3 mt-sm-0"
          tag="aside"
        >
          <h4 className="mt-md-3">{data.blog.title}</h4>
          <Blog endpoint="https://api.core.ac.uk/internal/blog/feed" />
          <ButtonToolbar align="center">
            <Button href="~blog" className="mt-3" color="primary" outline>
              {data.blog.visitButton}
            </Button>
          </ButtonToolbar>
        </Col>
      </Row>
    </Section>

    <RelatedContentSection
      id="endorsements"
      data={{
        ...data.endorsements,
        action: {
          label: data.endorsements.actionLabel,
          href: '~about/endorsements',
        },
      }}
    />

    <Section id="how-it-works" caption="How it works">
      <h2>{data.howItWorks.title}</h2>
      <Row className="mb-3">
        <Col xs="12" md="6">
          <Markdown>
            {patchStats(data.howItWorks.body, data.statistics)}
          </Markdown>
        </Col>

        <Col xs="12" md="6">
          <RepositoriesMap endpoint={repositoriesUrl} />
        </Col>
      </Row>

      <ButtonToolbar align="center" className="flex-row-reverse">
        <Button color="primary" outline href="~benefits">
          {data.howItWorks.actionLabels.primary}
        </Button>

        <Button color="link" href="~data-providers">
          {data.howItWorks.actionLabels.secondary}
        </Button>
      </ButtonToolbar>
    </Section>

    <RelatedContentSection
      id="services"
      data={{
        ...data.services,
        action: {
          label: data.services.actionLabel,
          href: '~services',
        },
      }}
    >
      <ServiceGroups className="text-left" items={servicesData.sections} />
    </RelatedContentSection>

    <Section id="team" caption={data.team.shortTitle}>
      <h2>{data.team.title}</h2>
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
        ...data.research,
        action: {
          label: data.research.actionLabel,
          href: '~research-outputs',
        },
      }}
    />

    <Section id="resources" caption={data.resources.shortTitle}>
      <h2>{data.resources.title}</h2>
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
      <Markdown>{data.resources.content}</Markdown>
    </Section>

    <RelatedContentSection
      id="ambassadors"
      caption={data.ambassadors.shortTitle}
      data={{
        ...data.ambassadors,
        action: {
          label: data.ambassadors.actionLabel,
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

// TODO: Move this to a global configuration file or process.env
// when move other pages to the CMS and getStaticProps
const CORE_STATISTICS_URL = 'https://api.core.ac.uk/internal/statistics'
const ASSETS_BASE_URL = 'https://oacore.github.io/content/'

const fetchStats = (url = CORE_STATISTICS_URL) =>
  new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => {
        if (res.status >= 400)
          throw new Error('Could not fetch actual statistics')
        return res
      })
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch(reject)
  })

const getSections = async ({ ref } = {}) => {
  const content = await retrieveContent('about', { ref, transform: 'object' })

  Object.values(content).forEach((section) => {
    // Resolve paths to absolute URLs **in-place**
    Object.entries(section).forEach(([key, value]) => {
      if (/Url$/.test(key)) section[key] = new URL(value, ASSETS_BASE_URL).href
    })
  })

  return content
}

const getTeamMembers = async ({ ref } = {}) => {
  const allTeamMembers = (await retrieveContent('team', { ref })).map(
    (member) => ({
      ...member,
      photoUrl: ASSETS_BASE_URL + member.photo,
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

  const sections = await getSections({ ref })
  const teamMembers = await getTeamMembers({ ref })
  const statistics = await fetchStats()

  const data = {
    ...sections,
    team: {
      ...sections.team,
      members: teamMembers,
    },
    statistics,
  }

  return {
    props: {
      data,
    },
  }
}

export default AboutPage
