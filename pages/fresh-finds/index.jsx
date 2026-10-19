import React from 'react'
import { Button } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'

import styles from './styles.module.scss'

import heroStyles from 'design-v2/components/hero/styles.module.scss'
import serviceStyles from 'design-v2/components/pages/styles.module.scss'
import { Markdown, Page } from 'components'
import { Hero, Layout, Section } from 'design-v2/components'
import content from 'data/fresh-finds.yml'

const Feature = ({ title, description }) => (
  <div className={serviceStyles.feature}>
    <h6 className={serviceStyles.featureTitle}>{title}</h6>
    <Markdown>{description}</Markdown>
  </div>
)

const RelatedService = ({ title, picture, url }) => (
  <a className={serviceStyles.service} href={url}>
    <img className={serviceStyles.image} src={picture} alt="" />
    <Markdown className={serviceStyles.title}>{title}</Markdown>
  </a>
)

const FreshFindsPage = () => {
  const {
    meta,
    headerLink,
    header,
    features,
    howItWorks,
    workflow,
    start,
    relatedServices,
  } = content

  return (
    <Page
      title={meta.title}
      description={meta.tagline}
      className={serviceStyles.servicePage}
    >
      <Layout>
        <div className={serviceStyles.navWrapper}>
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
          <h3>{howItWorks.title}</h3>
          <Markdown>{howItWorks.description}</Markdown>
        </Section>
        <Section
          id="workflow"
          className={classNames
            .use(serviceStyles.howSection)
            .join(`${serviceStyles.howSectionSix} ${styles.anchor}`)}
        >
          <h2 className={serviceStyles.howSectionTitle}>{workflow.title}</h2>
          <div className={serviceStyles.howSectionInnerWrapper}>
            {workflow.steps.map((item) => (
              <div key={item.step} className={serviceStyles.howSectionItem}>
                <div className={serviceStyles.step}>{item.step}</div>
                <div>
                  <h5 className={serviceStyles.stepTitle}>{item.title}</h5>
                  <p className={serviceStyles.stepDes}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
        <Section className={styles.flow}>
          <img src={workflow.image} alt={workflow.imageAlt} />
        </Section>
        <Section
          id="how-to-apply"
          className={`${styles.start} ${styles.anchor}`}
        >
          <h3>{start.title}</h3>
          <div className={styles.box}>
            <p>{start.caption}</p>
            <div className={styles.actions}>
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
        </Section>
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

export default FreshFindsPage
