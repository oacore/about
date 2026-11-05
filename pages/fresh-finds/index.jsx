import React, { useState } from 'react'
import { Button } from '@oacore/design/lib/elements'
import { Popover } from '@oacore/design/lib/modules'
import { classNames } from '@oacore/design/lib/utils'

import styles from './styles.module.scss'

import heroStyles from 'design-v2/components/hero/styles.module.scss'
import serviceStyles from 'design-v2/components/pages/styles.module.scss'
import accordionStyles from 'components/accordion/accordion.module.scss'
import AccordionItem from 'components/accordion/item'
import { Markdown, Page } from 'components'
import { patchStats } from 'components/utils'
import { Hero, Layout, Section } from 'design-v2/components'
import { getSections } from 'hooks/retriveContent'

const FeatureDescription = ({ description, tooltip, tooltipLabel }) => {
  if (
    !tooltip ||
    !tooltipLabel ||
    !description ||
    !description.includes(tooltipLabel)
  )
    return <Markdown>{description}</Markdown>

  const [before, after] = description.split(tooltipLabel)

  return (
    <p>
      {before}
      <Popover
        tag="span"
        placement="top"
        interactive
        className={styles.tooltip}
        content={<Markdown>{tooltip}</Markdown>}
      >
        <button type="button" className={styles.tooltipTrigger}>
          {tooltipLabel}
        </button>
      </Popover>
      {after}
    </p>
  )
}

const Feature = ({ title, description, tooltip, tooltipLabel }) => (
  <div className={serviceStyles.feature}>
    <h6 className={serviceStyles.featureTitle}>{title}</h6>
    <FeatureDescription
      description={description}
      tooltip={tooltip}
      tooltipLabel={tooltipLabel}
    />
  </div>
)

const RelatedService = ({ title, picture, url }) => (
  <a className={serviceStyles.service} href={url}>
    <img className={serviceStyles.image} src={picture} alt={title} />
    <Markdown className={serviceStyles.title}>{title}</Markdown>
  </a>
)

const HighlightedTitle = ({ title, highlight, className }) => {
  if (!highlight || !title?.includes(highlight))
    return <h2 className={className}>{title}</h2>

  const [before, after] = title.split(highlight)

  return (
    <h2 className={className}>
      {before}
      <span className={styles.highlight}>{highlight}</span>
      {after}
    </h2>
  )
}

const UseCases = ({ useCases }) => (
  <section id="use-cases" className={`${styles.useCases} ${styles.anchor}`}>
    <div className={styles.useCasesInner}>
      <div className={styles.useCasesTitle}>
        <HighlightedTitle
          title={useCases.title}
          highlight={useCases.highlight}
        />
      </div>
      {useCases.items.map((item) => (
        <article key={item.title} className={styles.caseCard}>
          <div className={styles.caseBody}>
            <h3 className={styles.caseTitle}>{item.title}</h3>
            <Markdown className={styles.caseDescription}>
              {item.description}
            </Markdown>
          </div>
          <div className={styles.caseFooter}>
            <div className={styles.person}>
              <img className={styles.avatar} src={item.img} alt="" />
              <div>
                <h4 className={styles.personName}>{item.user}</h4>
                <p className={styles.personRole}>{item.position}</p>
              </div>
            </div>
            {item.action && (
              <Button
                href={item.action.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.action.title}
              </Button>
            )}
          </div>
        </article>
      ))}
    </div>
  </section>
)

const Testimonials = ({ testimonials }) => (
  <Section id="testimonials" className={styles.anchor}>
    <h3>{testimonials.title}</h3>
    <div className={styles.testimonials}>
      {testimonials.items.map((item) => (
        <article key={item.name} className={serviceStyles.testimonial}>
          <div className={serviceStyles.header}>
            <img
              src={item.picture}
              alt={item.name}
              className={serviceStyles.picture}
            />
            <div className={serviceStyles.info}>
              <Markdown>{item.name}</Markdown>
              <Markdown className={serviceStyles.infoRole}>
                {item.role}
              </Markdown>
            </div>
          </div>
          <Markdown
            className={classNames.use(styles.content, styles.contentSpace)}
          >
            {`“${item.quote.trim()}”`}
          </Markdown>
        </article>
      ))}
    </div>
  </Section>
)

const Faqs = ({ faqs }) => {
  const [openIds, setOpenIds] = useState([])
  const allOpen = openIds.length === faqs.items.length

  const toggle = (id) => {
    setOpenIds((current) =>
      current.includes(id)
        ? current.filter((openId) => openId !== id)
        : [...current, id]
    )
  }

  const toggleAll = () => {
    setOpenIds(allOpen ? [] : faqs.items.map((item) => item.id))
  }

  return (
    <Section id="faqs" className={styles.anchor}>
      <div className={styles.faqHeader}>
        <h3>{faqs.title}</h3>
        <button type="button" className={styles.expandAll} onClick={toggleAll}>
          {allOpen ? faqs.collapseLabel : faqs.expandLabel}
        </button>
      </div>
      <div className={accordionStyles.accordion}>
        {faqs.items.map((item) => (
          <AccordionItem
            key={item.id}
            id={item.id}
            title={item.question}
            isOpen={openIds.includes(item.id)}
            onToggle={toggle}
          >
            <Markdown>{item.answer}</Markdown>
          </AccordionItem>
        ))}
      </div>
    </Section>
  )
}

const FreshFindsPage = ({ content, statistics }) => {
  const {
    meta,
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
  } = content

  return (
    <Page
      title={meta.title}
      description={meta.tagline}
      className={serviceStyles.servicePage}
    >
      <Layout>
        <div className={`${serviceStyles.navWrapper} ${styles.nav}`}>
          {headerLink.map((item) => (
            <a
              className={serviceStyles.linkItem}
              href={item.href}
              key={item.link}
            >
              {item.link}
            </a>
          ))}
        </div>
        <Hero
          className={heroStyles.split}
          spacing
          title={header.title}
          icon={header.icon}
          description={header.description}
          caption={header.caption}
          image={header.image}
          imageAlt={header.imageAlt}
          actions={header.actions}
        />
        <Section id="features" className={serviceStyles.features}>
          {features.map((item) => (
            <Feature key={item.title} {...item} />
          ))}
        </Section>
        <Section
          id="how-it-works"
          className={`${styles.howItWorks} ${styles.anchor}`}
        >
          <div className={styles.imageWrapper}>
            <img src={howItWorks.image} alt={howItWorks.title} />
          </div>
          <article className={styles.content}>
            <h3>{howItWorks.title}</h3>
            <Markdown>{howItWorks.description}</Markdown>
            {howItWorks.action && (
              <Button
                className={styles.button}
                href={howItWorks.action.url}
                variant={howItWorks.action.variant || 'contained'}
              >
                {howItWorks.action.caption}
              </Button>
            )}
          </article>
        </Section>
        <Section id="workflow" className={styles.anchor}>
          <div className={styles.workflowFrame}>
            <div
              className={classNames
                .use(serviceStyles.howSection)
                .join(
                  `${serviceStyles.howSectionSix} ${serviceStyles.howSectionJoined}`
                )}
            >
              <h2 className={serviceStyles.howSectionTitle}>
                {workflow.title}
              </h2>
              <div className={serviceStyles.howSectionInnerWrapper}>
                {workflow.steps.map((item) => (
                  <div key={item.step} className={serviceStyles.howSectionItem}>
                    <div className={serviceStyles.step}>{item.step}</div>
                    <div>
                      <h5 className={serviceStyles.stepTitle}>{item.title}</h5>
                      <Markdown
                        renderers={{
                          paragraph: ({ children }) => (
                            <p className={serviceStyles.stepDes}>{children}</p>
                          ),
                        }}
                      >
                        {patchStats(item.description, statistics)}
                      </Markdown>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.flow}>
              <img src={workflow.image} alt={workflow.imageAlt} />
            </div>
          </div>
        </Section>
        <Section
          id="how-to-apply"
          className={`${styles.contact} ${styles.anchor}`}
        >
          <div className={styles.content}>
            <h3>{start.title}</h3>
            <div className={styles.box}>
              <Markdown>{start.caption}</Markdown>
              <div className={styles.contentActions}>
                {start.actions.map((action) => (
                  <Button
                    key={action.caption}
                    href={action.url}
                    variant={action.variant}
                    target={action.target}
                  >
                    {action.caption}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <img
            className={classNames.use(styles.banner, styles.image)}
            src={start.image}
            alt="Contact"
          />
        </Section>
      </Layout>
      {useCases && <UseCases useCases={useCases} />}
      <Layout className={serviceStyles.unsetTop}>
        {testimonials && <Testimonials testimonials={testimonials} />}
        {faqs && <Faqs faqs={faqs} />}
        <Section id="related-services">
          <h3>{relatedServices.title}</h3>
          <div className={serviceStyles.services}>
            {relatedServices.services.map((service) => (
              <RelatedService key={service.title} {...service} />
            ))}
          </div>
        </Section>
      </Layout>
    </Page>
  )
}

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref
  const [content, core] = await Promise.all([
    getSections('fresh-finds', { ref }),
    import('data/core.yml'),
  ])

  return {
    props: {
      content,
      statistics: core.default.statistics,
    },
  }
}

export default FreshFindsPage
