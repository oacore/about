import React, { useCallback, useState } from 'react'
import { Card, Form, TextField } from '@oacore/design/lib'
import { useRouter } from 'next/router'
import { Button } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'
import { Popover } from '@oacore/design/lib/modules'

import styles from './styles.module.scss'
import { Layout, Section } from '../layout'
import Hero from '../hero'
// eslint-disable-next-line import/no-cycle
import { Video } from '../index'
import ExperiencesCard from '../../../components/experiences-card/experiencesCard'

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

const Testimonial = ({ content, author, action }) => (
  <article className={styles.testimonial}>
    <div className={styles.header}>
      <img src={author.picture} alt={author.name} className={styles.picture} />
      <div className={styles.info}>
        <Markdown>{author.name}</Markdown>
        <Markdown className={styles.infoRole}>{author.role}</Markdown>
      </div>
    </div>
    <Markdown className={styles.content}>{content}</Markdown>
    {action && (
      <Button
        className={styles.button}
        href={action.url}
        variant={action.variant || 'contained'}
      >
        {action.title}
      </Button>
    )}
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
    features,
    header,
    howItWorks,
    logos,
    main, // @optional
    meta,
    moreAboutUs, // @optional
    register, // @optional
    relatedServices,
    stats, // @optional
    testimonials, // @optional
    whatIsIncluded, // @optional
    additional, // @optional
    benefits, // @optional
    tutorials, // @optional
    howItWorksDescription,
    id,
    actionButton,
    keywords,
    statistics, // @optional
    contact, // @optional
    hideButtons = false, // @optional
  }) => {
    const [visibleVideo, setVisibleVideo] = useState(false)

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

    const handleContentOpen = useCallback((condition) => {
      if (condition) setVisibleVideo(condition)
    }, [])

    return (
      <Page
        title={meta.title}
        description={meta.tagline}
        keywords={keywords}
        className={styles.servicePage}
      >
        <Layout className={styles.unsetBottom}>
          <Hero
            actionButton={actionButton}
            hideButtons={hideButtons}
            {...header.header}
          />
          <Section id="features" className={styles.features}>
            {features.features.map((item) => (
              <Feature key={item.title} {...item} />
            ))}
          </Section>
          <Section id="how-it-works" className={styles.howItWorks}>
            <div className={styles.imageWrapper}>
              <img
                src={howItWorks.howItWorks.image}
                alt={howItWorks.howItWorks.title}
              />
            </div>
            <article className={styles.content}>
              <h3>{howItWorks.howItWorks.title}</h3>
              <Markdown>{howItWorks.howItWorks.description}</Markdown>
              {howItWorks.howItWorks.action &&
              Array.isArray(howItWorks.howItWorks.action)
                ? howItWorks.howItWorks.action.map((item) => (
                    <Button
                      href={item.url}
                      target={item.target}
                      variant={item.variant}
                      key={item.title}
                      download={item.download}
                      className={styles.button}
                    >
                      {item.title}
                    </Button>
                  ))
                : howItWorks.howItWorks.action && (
                    <Button
                      className={styles.button}
                      href={howItWorks.howItWorks.action.url}
                      variant={
                        howItWorks.howItWorks.action.variant || 'contained'
                      }
                    >
                      {howItWorks.howItWorks.action.title}
                    </Button>
                  )}
            </article>
          </Section>
          {howItWorksDescription && (
            <Section id="testimonial" className={styles.main}>
              <div className={styles.mainDescription}>
                {howItWorksDescription.howItWorksDescription.description}
              </div>
              <div>
                {howItWorksDescription.howItWorksDescription.main.items.map(
                  (item) => (
                    <Collapsed
                      key={item.title}
                      id={`${id}-details`}
                      title={item.title}
                    >
                      <Markdown>{item.content}</Markdown>
                    </Collapsed>
                  )
                )}
                <Markdown className={styles.mainNote}>
                  {howItWorksDescription.howItWorksDescription.main.note}
                </Markdown>
                <Button
                  className={styles.action}
                  variant="outlined"
                  href={
                    howItWorksDescription.howItWorksDescription.main.action.url
                  }
                >
                  {
                    howItWorksDescription.howItWorksDescription.main.action
                      .title
                  }
                </Button>
              </div>
            </Section>
          )}
          {benefits && (
            <Section id="benefits">
              <h3>{benefits.benefits.title}</h3>
              <div className={styles.benefits}>
                {benefits.benefits.items.map((benefit) => (
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
              {testimonials.testimonials.map((testimonial) => (
                <Testimonial key={testimonial.author.name} {...testimonial} />
              ))}
              {main && (
                <div>
                  {main.main.items.map((item) => (
                    <Collapsed
                      key={item.title}
                      id={`${id}-details`}
                      title={item.title}
                    >
                      <Markdown>{item.content}</Markdown>
                    </Collapsed>
                  ))}
                  <Markdown className={styles.note}>{main.main.note}</Markdown>
                  <Button
                    className={styles.action}
                    variant="outlined"
                    href={main.main.action.url}
                  >
                    {main.main.action.title}
                  </Button>
                </div>
              )}
            </Section>
          )}
          {logos && (
            <section className={styles.carouselWrapper}>
              <div className={styles.carouselItems}>
                {logos.logos.items.map((slide) => (
                  <div className={styles.carouselItemWrapper}>
                    <img
                      className={classNames.use(styles.carouselItem, {
                        [styles.carouselItemUnset]: slide.full,
                        [styles.background]: slide.background,
                      })}
                      src={slide.img}
                      alt="logo"
                      key={slide.alt}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.linkWrapper}>
                <a className={styles.link} href={logos.logos.action.url}>
                  {logos.logos.action.caption}
                </a>
              </div>
            </section>
          )}
          {whatIsIncluded && (
            <Section id="what-is-included" className={styles.whatIsIncluded}>
              <div className={styles.section}>
                <h3>{whatIsIncluded.whatIsIncluded.title}</h3>
                <Markdown>{whatIsIncluded.whatIsIncluded.content}</Markdown>
                <ul className={styles.listItem}>
                  {whatIsIncluded.whatIsIncluded?.list?.map((item) => (
                    <div className={styles.listTitleWrapper}>
                      <li>{item.item}</li>
                      {/* eslint-disable-next-line max-len */}
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                      <img
                        onClick={() => handleContentOpen(item?.video)}
                        className={styles.videoIcon}
                        src={item?.video?.image}
                        alt=""
                      />
                    </div>
                  ))}
                </ul>
                {whatIsIncluded.whatIsIncluded.action && (
                  <Button
                    className={styles.contactBtn}
                    variant="contained"
                    href={whatIsIncluded.whatIsIncluded.action.url}
                  >
                    {whatIsIncluded.whatIsIncluded.action.caption}
                  </Button>
                )}
              </div>
              <img
                src={whatIsIncluded.whatIsIncluded.image}
                alt={whatIsIncluded.whatIsIncluded.title}
              />
            </Section>
          )}
        </Layout>
        {moreAboutUs && (
          <ExperiencesCard
            title={moreAboutUs.institutionBenefit.title}
            data={moreAboutUs.institutionBenefit.item}
          />
        )}
        <Layout className={styles.unsetTop}>
          {tutorials && (
            <div className={styles.layoutMiniWrapper}>
              <Section id="membership-materials">
                <h4>{tutorials.materials.title}</h4>
                <div className={styles.cardsWrapper}>
                  {tutorials.materials.cards.map((card) => (
                    <article className={styles.materialsCard} key={card.key}>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a
                        target={card.action.target}
                        href={!card.video ? card.action.url : null}
                        onClick={() => handleContentOpen(card.video)}
                        className={styles.materialWrapper}
                      >
                        <div className={styles.materialInnerWrapper}>
                          <img src={card.image} alt="" />
                          <div className={styles.materialTitle}>
                            {card.title}
                          </div>
                        </div>
                      </a>
                      <div className={styles.buttonWrapper}>
                        <Button
                          className={styles.materialButton}
                          variant="outlined"
                          href={!card.video ? card.action.url : null}
                          target={card.action.target}
                          onClick={() => handleContentOpen(card.video)}
                        >
                          {card.action.caption}
                        </Button>
                      </div>
                    </article>
                  ))}
                  {visibleVideo && (
                    <Video
                      visibleModal={visibleVideo}
                      closeModal={() => setVisibleVideo(false)}
                      video={visibleVideo}
                    />
                  )}
                </div>
              </Section>
            </div>
          )}
          {statistics && stats && (
            <>
              <Section id="statistics" className={styles.statistics}>
                {stats.stats.items.map((stat) => (
                  <StatisticBox
                    key={`${stat.caption}-${stat.count}`}
                    title={stat.title}
                    caption={stat.caption}
                    url={stat?.url}
                    badge={stat?.badge}
                    tag={stat.url ? 'a' : 'div'}
                    count={patchStats(stat.count, statistics.statistics)}
                  />
                ))}
              </Section>
              {stats.stats.action && (
                <Button
                  className={styles.statsButton}
                  href={stats.stats.action.url}
                  variant={stats.stats.action.variant || 'contained'}
                >
                  {stats.stats.action.title}
                </Button>
              )}
            </>
          )}
          {register && (
            <Section id="form">
              <h3>{register.form.title}</h3>
              <Card variant="outlined" className={styles.form}>
                <p className={styles.caption}>{register.form.subtitle}</p>
                <Form onSubmit={onHandleSubmit}>
                  <TextField
                    id={elemEmail}
                    name={elemEmail}
                    value={email}
                    label="Email"
                    placeholder="e.g. john.doe@ac.uk"
                    type="email"
                    required
                    helper={register.form.helper}
                    className={styles.textfield}
                    {...bindEmail}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    className={styles.button}
                  >
                    {register.form.action}
                  </Button>
                </Form>
              </Card>
              <Markdown className={styles.note}>{register.form.note}</Markdown>
              <RegistrationModals />
            </Section>
          )}
          {additional && (
            <Section
              id="additional"
              className={classNames.use(styles.additional, {
                [styles.additionalReverse]:
                  additional.additional.id === 'discovery',
              })}
            >
              <img
                src={additional.additional.image}
                alt={additional.additional.title}
              />
              <div className={styles.section}>
                <h3>{additional.additional.title}</h3>
                <Markdown>{additional.additional.content}</Markdown>
                <div className={styles.group}>
                  {additional.additional.actions.map((action) => (
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
              <h3>{relatedServices.relatedServices.title}</h3>
              <div className={styles.services}>
                {relatedServices.relatedServices.services?.map((service) => (
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
