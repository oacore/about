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

const Benefit = ({ title, icon, description }) => (
  <article className={styles.benefit}>
    <img src={icon} alt={title} className={styles.benefitIcon} />
    <div className={styles.benefitContent}>
      <h5>{title}</h5>
      <Markdown>{description}</Markdown>
    </div>
  </article>
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
    whatIsIncluded, // @optional
    statistics, // @optional
    main, // @optional
    benefits, // @optional
    contact, // @optional
    stats, // @optional
    additional, // @optional
    testimonials, // @optional
    form, // @optional
    relatedServices,
    hideButtons = false, // @optional
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
          <Hero {...header} hideButtons={hideButtons} />
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
                  variant={howItWorks.action.variant || 'contained'}
                >
                  {howItWorks.action.title}
                </Button>
              )}
            </article>
          </Section>
          {benefits && (
            <Section id="benefits">
              <h3>{benefits.title}</h3>
              <div className={styles.benefits}>
                {benefits.items.map((benefit) => (
                  <Benefit key={benefit.title} {...benefit} />
                ))}
              </div>
            </Section>
          )}
          {contact && (
            <Section id="contact" className={styles.contact}>
              <div className={styles.content}>
                <h3>{contact.title}</h3>
                <div className={styles.box}>
                  <Markdown>{contact.caption}</Markdown>
                  <Button variant="contained" href={contact.action.url}>
                    {contact.action.caption}
                  </Button>
                </div>
              </div>
              <img
                className={classNames.use(styles.banner, styles.image)}
                src={contact.image}
                alt="Contact"
              />
            </Section>
          )}
          {testimonials && (
            <Section id="testimonial" className={styles.main}>
              {testimonials.map((testimonial) => (
                <Testimonial key={testimonial.author.name} {...testimonial} />
              ))}
              {main && (
                <div>
                  {main.items.map((item) => (
                    <Collapsed
                      key={item.title}
                      id={`${id}-details`}
                      title={item.title}
                    >
                      <Markdown>{item.content}</Markdown>
                    </Collapsed>
                  ))}
                  <Markdown className={styles.note}>{main.note}</Markdown>
                  <Button
                    className={styles.action}
                    variant="outlined"
                    href={main.action.url}
                  >
                    {main.action.title}
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
          {additional && (
            <Section id="additional" className={styles.additional}>
              <img src={additional.image} alt={additional.title} />
              <div className={styles.section}>
                <h3>{additional.title}</h3>
                <Markdown>{additional.content}</Markdown>
                <div className={styles.group}>
                  {additional.actions.map((action) => (
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
          {relatedServices && (
            <Section id="related-services">
              <h3>{relatedServices.title}</h3>
              <div className={styles.services}>
                {relatedServices.services?.map((service) => (
                  <RelatedService key={service.title} {...service} />
                ))}
              </div>
            </Section>
          )}
        </Layout>
      </Page>
    )
  }
)

ServicePage.create = (pageContext) => () => <ServicePage {...pageContext} />

export default ServicePage
