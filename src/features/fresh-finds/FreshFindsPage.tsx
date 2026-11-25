'use client'

import { Button, type ButtonProps } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'

import ContactSection from '@components/ContactSection'
import Header from '@components/Header/Header'
import { Layout, Section } from '@components/layout'
import Markdown from '@components/Markdown/Markdown'
import PageNav from '@components/PageNav'
import {
  RelatedServices,
  ServiceFeatures,
  ServiceSteps,
  ServiceTestimonialCard,
} from '@components/ServiceSections'
import { resolveHref } from '@utils/resolveHref'

import Faqs from './Faqs'
import type { FreshFindsAction, FreshFindsContent, FreshFindsPageData } from './types'

import styles from './styles.module.css'

type FreshFindsPageProps = {
  data: FreshFindsPageData
}

// same mapping as the shared Header for @oacore/design Button variants
const BUTTON_PROPS: Record<
  NonNullable<FreshFindsAction['variant']>,
  Pick<ButtonProps, 'type' | 'variant'>
> = {
  contained: { type: 'primary' },
  outlined: { type: 'primary', variant: 'outlined' },
  text: { type: 'link' },
}

const buttonProps = (variant: FreshFindsAction['variant'] = 'contained') => BUTTON_PROPS[variant]

type HighlightedTitleProps = {
  title: string
  highlight?: string
}

const HighlightedTitle = ({ title, highlight }: HighlightedTitleProps) => {
  if (!highlight || !title.includes(highlight)) {
    return <h2>{title}</h2>
  }

  const [before, after] = title.split(highlight)

  return (
    <h2>
      {before}
      <span className={styles.highlight}>{highlight}</span>
      {after}
    </h2>
  )
}

type UseCasesProps = {
  useCases: NonNullable<FreshFindsContent['useCases']>
}

const UseCases = ({ useCases }: UseCasesProps) => (
  <section className={classNames(styles.useCases, styles.anchor)} id="use-cases">
    <div className={styles.useCasesInner}>
      <div className={styles.useCasesTitle}>
        <HighlightedTitle highlight={useCases.highlight} title={useCases.title} />
      </div>
      {useCases.items.map((item) => (
        <article className={styles.caseCard} key={item.title}>
          <div className={styles.caseBody}>
            <h3 className={styles.caseTitle}>{item.title}</h3>
            <Markdown className={styles.caseDescription}>{item.description}</Markdown>
          </div>
          <div className={styles.caseFooter}>
            <div className={styles.person}>
              {item.img ? (
                <Image alt="" className={styles.avatar} height={48} src={item.img} width={48} />
              ) : null}
              <div>
                <h4 className={styles.personName}>{item.user}</h4>
                <p className={styles.personRole}>{item.position}</p>
              </div>
            </div>
            {item.action ? (
              <Button
                href={resolveHref(item.action.url)}
                rel="noopener noreferrer"
                target="_blank"
                {...buttonProps(item.action.variant)}
              >
                {item.action.title ?? item.action.caption}
              </Button>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  </section>
)

type TestimonialsProps = {
  testimonials: NonNullable<FreshFindsContent['testimonials']>
}

const Testimonials = ({ testimonials }: TestimonialsProps) => (
  <Section className={styles.anchor} id="testimonials">
    <h3 className={styles.sectionTitle}>{testimonials.title}</h3>
    <div className={styles.testimonials}>
      {testimonials.items.map((item) => (
        <ServiceTestimonialCard
          key={item.name}
          name={item.name}
          picture={item.picture}
          quote={`“${item.quote.trim()}”`}
          quoteClassName={styles.contentSpace}
          role={item.role}
        />
      ))}
    </div>
  </Section>
)

const FreshFindsPage = ({ data }: FreshFindsPageProps) => {
  const {
    headerLink,
    header,
    features,
    howItWorks,
    workflow,
    start,
    useCases,
    testimonials,
    faqs,
    relatedServices,
  } = data

  return (
    <Layout>
      <PageNav
        ariaLabel="Page sections"
        className={styles.nav}
        links={headerLink}
        variant="muted"
      />
      <Header
        actions={header.actions}
        className={styles.split}
        description={header.description}
        caption={header.caption}
        icon={header.icon}
        image={header.image}
        logoAlt={header.imageAlt}
        spacing
        title={header.title}
      />

      <ServiceFeatures features={features} />

      <Section className={classNames(styles.howItWorks, styles.anchor)} id="how-it-works">
        <div className={styles.imageWrapper}>
          {howItWorks.image ? (
            <Image alt={howItWorks.title} height={329} src={howItWorks.image} width={358} />
          ) : null}
        </div>
        <article className={styles.content}>
          <h3 className={styles.sectionTitle}>{howItWorks.title}</h3>
          <Markdown>{howItWorks.description}</Markdown>
          {howItWorks.action ? (
            <Button
              className={styles.button}
              href={resolveHref(howItWorks.action.url)}
              {...buttonProps(howItWorks.action.variant)}
            >
              {howItWorks.action.caption ?? howItWorks.action.title}
            </Button>
          ) : null}
        </article>
      </Section>

      <ServiceSteps
        className={classNames(styles.anchor, styles.workflow)}
        id="workflow"
        image={workflow.image}
        imageAlt={workflow.imageAlt}
        steps={workflow.steps}
        title={workflow.title}
      />

      <ContactSection
        actions={start.actions?.map((action) => ({
          title: action.caption ?? action.title,
          url: action.url,
          variant: action.variant,
          target: action.target,
        }))}
        className={classNames(styles.anchor, styles.start)}
        description={start.caption}
        id="how-to-apply"
        image={start.image}
        imageHeight={348}
        imageWidth={402}
        title={start.title}
      />

      {useCases ? <UseCases useCases={useCases} /> : null}

      {testimonials ? <Testimonials testimonials={testimonials} /> : null}
      {faqs ? <Faqs faqs={faqs} /> : null}
      <RelatedServices
        services={relatedServices.services}
        title={relatedServices.title}
      />
    </Layout>
  )
}

export default FreshFindsPage
