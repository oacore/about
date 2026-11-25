'use client'

import { Button, Col, Row } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import { useState } from 'react'

import Markdown from '@components/Markdown/Markdown'
import { Section } from '@components/layout'
import Testimonial from '@components/testimonial'
import type { EndorsementOrganization, EndorsementSection as EndorsementSectionData } from '@features/endorsements/types'
import {
  getQuotedOrganizations,
  resolveExternalTarget,
  toTestimonial,
} from '@features/endorsements/utils'

import styles from './styles.module.css'

const PREVIEW_LOGO_COUNT = 6

type OrganizationLogoProps = {
  organization: EndorsementOrganization
}

const OrganizationLogo = ({ organization }: OrganizationLogoProps) => {
  if (!organization.logo) {
    return null
  }

  return (
    <div className={classNames(styles.logoCard, organization.full && styles.logoCardFull)} title={organization.name}>
      <Image
        alt={organization.name}
        className={styles.logoImage}
        fill
        sizes="(max-width: 576px) 50vw, (max-width: 992px) 33vw, 16vw"
        src={organization.logo}
        unoptimized
      />
    </div>
  )
}

type LogoGridProps = {
  organizations: EndorsementOrganization[]
}

const LogoGrid = ({ organizations }: LogoGridProps) => {
  if (!organizations.length) {
    return null
  }

  return (
    <Row className={styles.logoGrid} gutter={[24, 24]}>
      {organizations.map((organization, index) => (
        <Col key={`${organization.id ?? organization.name}-${index}`} lg={4} sm={8} xs={12}>
          <OrganizationLogo organization={organization} />
        </Col>
      ))}
    </Row>
  )
}

type TestimonialsPreviewProps = {
  organizations: EndorsementOrganization[]
}

const TestimonialsPreview = ({ organizations }: TestimonialsPreviewProps) => {
  const quoted = getQuotedOrganizations(organizations)
  const previewTestimonial = quoted[0] ? toTestimonial(quoted[0]) : undefined
  const previewLogos = organizations
    .filter((organization) => organization !== quoted[0])
    .slice(0, PREVIEW_LOGO_COUNT)

  return (
    <>
      {previewTestimonial ? (
        <Testimonial
          author={previewTestimonial.author}
          content={previewTestimonial.content}
          id={previewTestimonial.id}
          organization={previewTestimonial.organization}
        />
      ) : null}
      <LogoGrid organizations={previewLogos} />
    </>
  )
}

type TestimonialsListProps = {
  organizations: EndorsementOrganization[]
}

const TestimonialsList = ({ organizations }: TestimonialsListProps) => {
  const quoted = getQuotedOrganizations(organizations)
  const remaining = organizations.filter((organization) => !quoted.includes(organization))

  return (
    <>
      {quoted.map((organization, index) => {
        const testimonial = toTestimonial(organization)

        if (!testimonial) {
          return null
        }

        return (
          <Testimonial
            author={testimonial.author}
            content={testimonial.content}
            id={testimonial.id}
            key={`${testimonial.id ?? organization.name}-${index}`}
            organization={testimonial.organization}
          />
        )
      })}
      <LogoGrid organizations={remaining} />
    </>
  )
}

type TestimonialsSectionProps = {
  id: string
  title?: string
  organizations: EndorsementOrganization[]
}

const TestimonialsSection = ({ id, title, organizations }: TestimonialsSectionProps) => {
  const [iteration, setIteration] = useState(0)
  const expanded = Boolean(iteration % 2)
  const testimonialsId = `${id}-testimonials`

  const handleToggle = () => {
    setIteration(iteration + 1)
  }

  if (!organizations.length && !title) {
    return null
  }

  return (
    <Section className={styles.testimonialsSection} id={testimonialsId}>
      {title ? <h3 className={styles.testimonialsTitle}>{title}</h3> : null}
      {expanded ? (
        <TestimonialsList organizations={organizations} />
      ) : (
        <TestimonialsPreview organizations={organizations} />
      )}
      {organizations.length ? (
        <p className={styles.toggleWrap}>
          <Button
            aria-controls={testimonialsId}
            aria-expanded={expanded}
            key={expanded ? iteration + 1 : iteration}
            onClick={handleToggle}
            type="default"
          >
            {expanded ? 'Collapse' : 'Show all'}
          </Button>
        </p>
      ) : null}
    </Section>
  )
}

type EndorsementsSectionProps = {
  section: EndorsementSectionData
  priority?: boolean
}

const EndorsementsSection = ({ section, priority = false }: EndorsementsSectionProps) => {
  const actionHref = section.action?.url
  const actionTarget = resolveExternalTarget(actionHref)

  return (
    <div className={styles.sectionBlock} id={section.id}>
      <Section className={styles.introSection}>
        <Row gutter={[48, 32]}>
          <Col lg={12} xs={24}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            {section.description ? <Markdown>{section.description}</Markdown> : null}
            {section.action?.title ? <p className={styles.actionTitle}>{section.action.title}</p> : null}
            {section.action && actionHref ? (
              <Button
                className={styles.actionButton}
                aria-label={section.action.name}
                href={actionHref}
                rel={actionTarget ? 'noopener noreferrer' : undefined}
                target={actionTarget}
                type="primary"
              >
                {section.action.name}
              </Button>
            ) : null}
          </Col>
          {section.illustration ? (
            <Col lg={12} xs={24}>
              <Image
                alt=""
                aria-hidden
                className={styles.illustration}
                height={420}
                priority={priority}
                src={section.illustration}
                unoptimized
                width={560}
              />
            </Col>
          ) : null}
        </Row>
      </Section>
      <TestimonialsSection
        id={section.id}
        organizations={section.organizations}
        title={section.testimonialsTitle}
      />
    </div>
  )
}

export default EndorsementsSection
