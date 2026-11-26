'use client'

import { Layout, PageNav, RepositoriesMap, Section, Video } from '@core/core-ui'
import { Button, Col, Row } from 'antd'

import Markdown from '@components/Markdown/Markdown'
import TeamSection from '@components/TeamSection'
import { HOW_IT_WORKS_HREFS, RELATED_HREFS } from '@features/about/constants'
import type { AboutPageData } from '@features/about/types'
import { getRelatedActionHref } from '@features/about/utils'
import { patchStats } from '@utils/patchStats'

import AboutResources from './AboutResources'
import BlogFeed from './BlogFeed'
import ContactSection from './ContactSection'
import RelatedContentSection from './RelatedContentSection'
import ServiceGroups from './ServiceGroups'
import TimelineSection from './TimelineSection'

import styles from './styles.module.css'

type AboutPageProps = {
  data: AboutPageData
}

const AboutPage = ({ data }: AboutPageProps) => {
  const pageTitle = data.meta?.headline || data.core?.title || 'About CORE'
  const howItWorksBody = patchStats(data.howItWorks?.body, data.statistics)

  const navLinks = [
    { href: 'mission', title: data.mission?.shortTitle ?? data.core?.title },
    { href: 'characteristics', title: data.characteristics?.shortTitle ?? data.characteristics?.title },
    { href: 'fair', title: data.fair?.shortTitle ?? data.fair?.title },
    { href: 'how-it-works', title: data.howItWorks?.shortTitle ?? data.howItWorks?.title },
    { href: 'communities', title: data.communities?.shortTitle ?? data.communities?.title },
    { href: 'services', title: data.services?.shortTitle ?? data.services?.title },
    { href: 'research-outputs', title: data.research?.shortTitle ?? data.research?.title },
    { href: 'team', title: data.team?.shortTitle ?? data.team?.title },
    { href: 'resources', title: data.resources?.shortTitle ?? data.resources?.title },
    { href: 'contact', title: data.contacts.shortTitle ?? data.contacts.title },
  ].flatMap((link) => (link.title ? [{ href: link.href, title: link.title }] : []))

  return (
    <Layout>
      {navLinks.length ? <PageNav ariaLabel="About page sections" links={navLinks} /> : null}

      <Section>
        <Row gutter={[48, 32]}>
          <Col lg={16} md={14} xs={24}>
            {data.core?.title ? <h2 className={styles.sectionTitle}>{data.core.title}</h2> : null}
            {data.core?.description ? <Markdown className={styles.aboutDescription}>{data.core.description}</Markdown> : null}
          </Col>
          <Col className={styles.blogColumn} lg={8} md={10} xs={24}>
            <BlogFeed copy={data.blog} posts={data.blogPosts} />
          </Col>
        </Row>
      </Section>

      <RelatedContentSection
        action={{
          label: data.characteristics?.actionLabel,
          href: getRelatedActionHref(data.characteristics, RELATED_HREFS.characteristics),
        }}
        data={data.characteristics}
        id="characteristics"
      />

      <Section id="mission">
        <Row className={styles.spacingB} gutter={[48, 32]}>
          <Col lg={16} md={14} xs={24}>
            {data.mission?.title ? <h2 className={styles.sectionTitle}>{data.mission.title}</h2> : null}
            {data.mission?.video ? (
              <Video src={data.mission.video.src} title={data.mission.video.title} />
            ) : null}
            {data.mission?.body ? <Markdown className={styles.mission}>{data.mission.body}</Markdown> : null}
          </Col>
        </Row>
      </Section>

      <RelatedContentSection
        action={{
          label: data.fair?.actionLabel,
          href: getRelatedActionHref(data.fair, RELATED_HREFS.fair),
        }}
        data={data.fair}
        id="fair"
      />

      <Section>
        <Row className={styles.spacingT} gutter={[48, 32]}>
          <Col lg={16} md={14} xs={24}>
            {data.yearsActive?.title ? <h2 className={styles.sectionTitle}>{data.yearsActive.title}</h2> : null}
            {data.yearsActive?.description ? (
              <Markdown className={styles.mission}>{data.yearsActive.description}</Markdown>
            ) : null}
          </Col>
        </Row>
      </Section>

      <TimelineSection />

      <RelatedContentSection
        action={{
          label: data.endorsements?.actionLabel,
          href: getRelatedActionHref(data.endorsements, RELATED_HREFS.endorsements),
        }}
        data={data.endorsements}
        id="endorsements"
      />

      <Section id="how-it-works">
        {data.howItWorks?.title ? <h2 className={styles.sectionTitle}>{data.howItWorks.title}</h2> : null}
        <Row gutter={[48, 32]}>
          <Col md={12} xs={24}>
            {howItWorksBody ? <Markdown>{howItWorksBody}</Markdown> : null}
            <div className={styles.howButtonWrapper}>
              {data.howItWorks?.actionLabels?.primary ? (
                <Button href={HOW_IT_WORKS_HREFS.primary} type="primary">
                  {data.howItWorks.actionLabels.primary}
                </Button>
              ) : null}
              {data.howItWorks?.actionLabels?.secondary ? (
                <Button href={HOW_IT_WORKS_HREFS.secondary} type="link">
                  {data.howItWorks.actionLabels.secondary}
                </Button>
              ) : null}
            </div>
          </Col>
          <Col md={12} xs={24}>
            <RepositoriesMap dataUrl="/data/formap.json" />
          </Col>
        </Row>
      </Section>

      <RelatedContentSection
        action={{
          label: data.communities?.actionLabel,
          href: getRelatedActionHref(data.communities, RELATED_HREFS.communities),
        }}
        data={data.communities}
        id="communities"
        renderImage
      />

      <RelatedContentSection
        action={{
          label: data.services?.actionLabel,
          href: getRelatedActionHref(data.services, RELATED_HREFS.services),
        }}
        className={styles.services}
        data={data.services}
        id="services"
      >
        <ServiceGroups sections={data.serviceSections} />
      </RelatedContentSection>

      <RelatedContentSection
        action={{
          label: data.research?.actionLabel,
          href: getRelatedActionHref(data.research, RELATED_HREFS.research),
        }}
        data={data.research}
        id="research-outputs"
      />

      <TeamSection
        id="team"
        members={(data.teamMembers.current ?? []).map((member) => ({
          key: member.id,
          name: member.name,
          role: member.role,
          description: member.description,
          picture: member.photoUrl,
        }))}
        title={data.team?.title}
      >
        {data.teamMembers.past?.length ? (
          <>
            <h3 className={styles.pastTitle}>Past team members</h3>
            <ul className={styles.pastMembers}>
              {data.teamMembers.past.map((member) => (
                <li id={member.id} key={member.id}>
                  {member.name}
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </TeamSection>
      <AboutResources badges={data.badges} copy={data.resources} materials={data.materials} />
      <ContactSection contacts={data.contacts} />
    </Layout>
  )
}

export default AboutPage
