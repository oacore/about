import React from 'react'
import { Card, Form, TextField } from '@oacore/design/lib'
import { useRouter } from 'next/router'
import { Button } from '@oacore/design/lib/elements'

import styles from './styles.module.scss'
import { Layout, Section } from '../layout'
import Hero from '../hero'

import { patchStats } from 'components/utils'
import Collapsed from 'components/collapsed'
import RegistrationModals from 'components/modal/registration'
import Page from 'components/page'
import { Markdown } from 'components'
import { useInput } from 'hooks'
import { observe, useStore } from 'store'

const Feature = ({ title, description }) => (
  <div className={styles.feature}>
    <h6 className={styles.featureTitle}>{title}</h6>
    <Markdown>{description}</Markdown>
  </div>
)

const StatisticBox = ({ title, count, caption }) => (
  <div className={styles.statisticsBox}>
    <Markdown className={styles.title}>{title}</Markdown>
    <Markdown className={styles.count}>{count}</Markdown>
    <Markdown className={styles.caption}>{caption}</Markdown>
  </div>
)

const Testimonial = ({ content, author }) => (
  <article className={styles.testimonial}>
    <div className={styles.header}>
      <img src={author.picture} alt={author.name} className={styles.picture} />
      <div className={styles.info}>
        <Markdown>{author.name}</Markdown>
        <Markdown className={styles.infoRole}>{author.role}</Markdown>
      </div>
    </div>
    <Markdown t className={styles.content}>
      {content}
    </Markdown>
  </article>
)

const RelatedService = ({ title, picture, url }) => (
  <a className={styles.service} href={url}>
    <img className={styles.image} src={picture} alt={title} />
    <Markdown className={styles.title}>{title}</Markdown>
  </a>
)

const ServicePage = observe(
  ({
    id,
    title,
    tagline,
    header,
    features,
    howItWorks,
    keywords,
    whatIsIncluded,
    statistics,
    stats,
    additional, // @optional
    testimonials, // @optional
    relatedServices,
    form,
  }) => {
    const { registration } = useStore()
    const {
      value: email,
      element: elemEmail,
      bind: bindEmail,
    } = useInput('', 'email')

    const router = useRouter()
    const productType = router?.route?.match(/(?:dataset|api)/s)?.join('')

    const onHandleSubmit = (e) => {
      e.preventDefault()
      registration.setData({ productType, email })
      registration.setIsModalFormActive(true)
    }

    return (
      <Page
        title={title}
        description={tagline}
        keywords={keywords}
        className={styles.servicePage}
      >
        <Layout>
          <Hero {...header} />
          <Section id="features" className={styles.features}>
            {features.map((item) => (
              <Feature key={item.title} {...item} />
            ))}
          </Section>
          <Section id="how-it-works" className={styles.howItWorks}>
            <div className={styles.imageWrapper}>
              <img src={howItWorks.image} alt={howItWorks.title} />
            </div>
            <article className={styles.content}>
              <h3>{howItWorks.title}</h3>
              <Markdown>{howItWorks.description}</Markdown>
              <Button className={styles.button} variant="contained">
                {howItWorks.action}
              </Button>
            </article>
          </Section>
          {testimonials && (
            <Section id="testimonial" className={styles.additional}>
              {testimonials.map((testimonial) => (
                <Testimonial key={testimonial.id} {...testimonial} />
              ))}
              {additional && (
                <div>
                  <Collapsed id={`${id}-details`} title={additional.title}>
                    <Markdown>{additional.content}</Markdown>
                  </Collapsed>
                  <Collapsed id={`${id}-details`} title={additional.title}>
                    <Markdown>{additional.content}</Markdown>
                  </Collapsed>
                  <Markdown className={styles.note}>{additional.note}</Markdown>
                  <Button className={styles.action} variant="outlined">
                    {additional.action.title}
                  </Button>
                </div>
              )}
            </Section>
          )}
          {whatIsIncluded && (
            <Section id="what-is-included" className={styles.whatIsIncluded}>
              <div className={styles.section}>
                <h3>{whatIsIncluded.title}</h3>
                <Markdown>{whatIsIncluded.content}</Markdown>
              </div>
              <img src={whatIsIncluded.image} alt={whatIsIncluded.title} />
            </Section>
          )}
          {statistics && stats && (
            <Section id="statistics" className={styles.statistics}>
              {stats.map((stat) => (
                <StatisticBox
                  key={stat.caption}
                  title={stat.title}
                  caption={stat.caption}
                  count={patchStats(stat.count, statistics)}
                />
              ))}
            </Section>
          )}
          {form && (
            <Section id="form">
              <h3>{form.title}</h3>
              <Card variant="outlined" className={styles.form}>
                <p className={styles.cardSubtitle}>{form.subtitle}</p>
                <Form onSubmit={onHandleSubmit}>
                  <TextField
                    id={elemEmail}
                    name={elemEmail}
                    value={email}
                    label="Email"
                    placeholder="e.g. john.doe@ac.uk"
                    type="email"
                    required
                    helper={form.helper}
                    className={styles.textfield}
                    {...bindEmail}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    className={styles.button}
                  >
                    {form.action}
                  </Button>
                </Form>
              </Card>
              <Markdown className={styles.note}>{form.note}</Markdown>
              <RegistrationModals />
            </Section>
          )}
          <Section id="related-services">
            <h3>{relatedServices.title}</h3>
            <div className={styles.services}>
              {relatedServices.services.map((service) => (
                <RelatedService key={service.title} {...service} />
              ))}
            </div>
          </Section>
        </Layout>
      </Page>
    )
  }
)

ServicePage.create = (pageContext) => () => <ServicePage {...pageContext} />

export default ServicePage
