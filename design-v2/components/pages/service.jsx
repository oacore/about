import React from 'react'
import { Card, Form, TextField } from '@oacore/design/lib'
import { useRouter } from 'next/router'
import { Button } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'
import { Popover } from '@oacore/design/lib/modules'

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

const StatisticBox = ({
  title,
  count,
  caption,
  url,
  badge,
  tag: Tag = 'div',
}) => (
  <Tag
    className={classNames.use(styles.statisticsBox, {
      [styles.active]: badge,
      [styles.link]: url,
    })}
    href={url}
  >
    {badge && <span className={styles.badge}>{badge}</span>}
    <Markdown className={styles.title}>{title}</Markdown>
    <Markdown className={styles.count}>{count}</Markdown>
    <Markdown className={styles.caption}>{caption}</Markdown>
  </Tag>
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
    <Markdown className={styles.content}>{content}</Markdown>
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
    stats, // @optional
    additional, // @optional
    testimonials, // @optional
    form, // @optional
    uniqueness, // @optional
    relatedServices,
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
              {howItWorks.action && (
                <Button
                  className={styles.button}
                  href={howItWorks.action.url}
                  variant="contained"
                >
                  {howItWorks.action.title}
                </Button>
              )}
            </article>
          </Section>
          {testimonials && (
            <Section id="testimonial" className={styles.additional}>
              {testimonials.map((testimonial) => (
                <Testimonial key={testimonial.id} {...testimonial} />
              ))}
              {additional && (
                <div>
                  {additional.items.map((item) => (
                    <Collapsed
                      key={item.title}
                      id={`${id}-details`}
                      title={item.title}
                    >
                      <Markdown>{item.content}</Markdown>
                    </Collapsed>
                  ))}
                  <Markdown className={styles.note}>{additional.note}</Markdown>
                  <Button
                    className={styles.action}
                    variant="outlined"
                    href={additional.action.url}
                  >
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
                  key={`${stat.caption}-${stat.count}`}
                  title={stat.title}
                  caption={stat.caption}
                  url={stat?.url}
                  badge={stat?.badge}
                  tag={stat.url ? 'a' : 'div'}
                  count={patchStats(stat.count, statistics)}
                />
              ))}
            </Section>
          )}
          {form && (
            <Section id="form">
              <h3>{form.title}</h3>
              <Card variant="outlined" className={styles.form}>
                <p className={styles.caption}>{form.subtitle}</p>
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
          {uniqueness && (
            <Section id="uniqueness" className={styles.uniqueness}>
              <img src={uniqueness.image} alt={whatIsIncluded.title} />
              <div className={styles.section}>
                <h3>{uniqueness.title}</h3>
                <Markdown>{uniqueness.content}</Markdown>
                <div className={styles.group}>
                  {uniqueness.actions.map((action) => (
                    <Popover
                      key={action.caption}
                      placement="bottom"
                      content={action.hint}
                    >
                      <Button
                        href={action.url}
                        variant={action.primary ? 'contained' : 'outlined'}
                        className={styles.action}
                      >
                        {action.caption}
                      </Button>
                    </Popover>
                  ))}
                </div>
              </div>
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