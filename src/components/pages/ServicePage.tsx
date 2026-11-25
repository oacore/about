'use client'

import { Button, Form, Input, Tooltip } from 'antd'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCallback, useState } from 'react'
import {
  PlayCircleOutlined
} from '@ant-design/icons';

import Collapsed from '@components/Collapsed/Collapsed'
import ContactSection from '@components/ContactSection'
import floating from '@components/FloatingField/FloatingField.module.css'
import Header from '@components/Header/Header'
import HowItWorksSection from '@components/HowItWorksSection'
import { Layout, Section } from '@components/layout'
import MaterialCards from '@components/MaterialCards'
import Markdown from '@components/Markdown/Markdown'
import PageNav from '@components/PageNav'
import {
  RelatedServices,
  ServiceFeatures,
  ServiceSteps,
  ServiceTestimonialCard,
} from '@components/ServiceSections'
import RegistrationModals from '@components/pages/components/modal/registration'
import VideoModal from '@components/VideoModal'
import { useRegistrationStore } from '@stores/registration'
import { patchStats } from '@utils/patchStats'

import ExperiencesCard from './ExperiencesCard'
import type { ServicePageAction, ServicePageProps, ServicePageVideo } from './types'

import styles from './styles.module.css'

const joinClasses = (...classes: Array<string | false | undefined>): string =>
  classes.filter(Boolean).join(' ')

const resolveButtonType = (variant?: string): 'primary' | 'default' =>
  variant === 'outlined' ? 'default' : 'primary'

const resolveActionHref = (url: string): string => url

type StatisticBoxProps = {
  title: string
  count: string
  caption: string
  url?: string
  badge?: string
}

const StatisticBox = ({ title, count, caption, url, badge }: StatisticBoxProps) => {
  const className = joinClasses(
    styles.statisticsBox,
    badge && styles.active,
    url && styles.link,
  )

  const content = (
    <>
      {badge ? <span className={styles.badge}>{badge}</span> : null}
      <Markdown className={styles.title}>{title}</Markdown>
      <Markdown className={styles.count}>{count}</Markdown>
      <Markdown className={styles.caption}>{caption}</Markdown>
    </>
  )

  if (url) {
    return (
      <a className={className} href={resolveActionHref(url)}>
        {content}
      </a>
    )
  }

  return <div className={className}>{content}</div>
}

type BenefitProps = {
  title: string
  icon: string
  description: string
}

const Benefit = ({ title, icon, description }: BenefitProps) => (
  <article className={styles.benefit}>
    <Image alt={title} className={styles.benefitIcon} height={64} src={icon} width={64} />
    <div className={styles.benefitContent}>
      <h5 className={styles.subTitle}>{title}</h5>
      <Markdown className={styles.mainDescription}>{description}</Markdown>
    </div>
  </article>
)

const ServicePage = ({
  features,
  header,
  howItWorks,
  logos,
  main,
  moreAboutUs,
  register,
  relatedServices,
  stats,
  testimonials,
  headerLink,
  whatIsIncluded,
  additional,
  benefits,
  tutorials,
  certificates,
  applicationProcess,
  howItWorksDescription,
  id,
  actionButton,
  statistics,
  contact,
  hideButtons = false,
  registrationCopy,
  countries,
  turnstileSiteKey,
}: ServicePageProps) => {
  const pathname = usePathname()
  const { setData, setIsModalFormActive } = useRegistrationStore()
  const [visibleVideo, setVisibleVideo] = useState<ServicePageVideo | false>(false)

  const handleContentOpen = useCallback((video?: ServicePageVideo) => {
    if (video) {
      setVisibleVideo(video)
    }
  }, [])

  const handleRegistrationSubmit = (values: { email: string }) => {
    const productType = pathname.match(/(?:dataset|api)/)?.join('')

    if (productType !== 'api' && productType !== 'dataset') {
      return
    }

    setData({ productType, email: values.email })
    setIsModalFormActive(true)
  }

  if (!features || !header?.header || !howItWorks?.howItWorks) {
    return null
  }

  const howItWorksActions = howItWorks.howItWorks.action
  const howItWorksActionList = Array.isArray(howItWorksActions)
    ? howItWorksActions
    : howItWorksActions
      ? [howItWorksActions]
      : []

  return (
    <Layout>
      <div className={styles.unsetBottom}>
        <PageNav variant="muted" ariaLabel="Page sections" links={headerLink?.headerLink} />

        {header.header.label ? (
          <div className={styles.headerLabel}>{header.header.label}</div>
        ) : null}

        <Header
          actionButton={actionButton}
          hideButtons={hideButtons}
          logoAlt={header.header.title}
          {...header.header}
        />

        <ServiceFeatures features={features.features} />

        <HowItWorksSection
          actionsClassName={styles.howItWorksActions}
          data={howItWorks.howItWorks}
          imageHeight={900}
          imageWidth={1600}
          actions={
            <>
              {howItWorksActionList.map((item) => (
                <Button
                  key={item.title ?? item.caption}
                  download={item.download}
                  href={resolveActionHref(item.url)}
                  target={item.target}
                  type={resolveButtonType(item.variant)}
                >
                  {item.title ?? item.caption}
                </Button>
              ))}
            </>
          }
        />

        {howItWorksDescription ? (
          <Section className={styles.main} id="how-it-works-details">
            <div className={styles.mainDescription}>
              {howItWorksDescription.howItWorksDescription.description}
            </div>
            <div>
              {howItWorksDescription.howItWorksDescription.main.items.map((item) => (
                <Collapsed id={`${id ?? 'page'}-details-${item.title}`} key={item.title} title={item.title}>
                  <Markdown>{item.content}</Markdown>
                </Collapsed>
              ))}
              <Markdown className={styles.mainNote}>
                {howItWorksDescription.howItWorksDescription.main.note}
              </Markdown>
              <Button
                className={styles.action}
                href={resolveActionHref(howItWorksDescription.howItWorksDescription.main.action.url)}
                type="default"
              >
                {howItWorksDescription.howItWorksDescription.main.action.title ??
                  howItWorksDescription.howItWorksDescription.main.action.caption}
              </Button>
            </div>
          </Section>
        ) : null}

        {certificates ? (
          <Section className={styles.certificateItemWrapper}>
            {certificates.certificates.map((item) => (
              <div className={styles.certificateItem} id="type" key={item.title}>
                <Image alt={item.title} className={styles.icon} height={120} src={item.picture} width={120} />
                <h4 className={styles.title}>{item.title}</h4>
                <p className={styles.subtitle}>{item.description}</p>
              </div>
            ))}
          </Section>
        ) : null}

        {benefits ? (
          <Section id="benefits">
            <h3 className={styles.pageTitle}>{benefits.benefits.title}</h3>
            <div className={styles.benefits}>
              {benefits.benefits.items.map((benefit) => (
                <Benefit key={benefit.title} {...benefit} />
              ))}
            </div>
          </Section>
        ) : null}

        {applicationProcess ? (
          <ServiceSteps
            steps={applicationProcess.applicationProcess.steps}
            title={applicationProcess.applicationProcess.title}
          />
        ) : null}

        {contact ? (
          <ContactSection
            action={{ title: contact.action.caption, url: contact.action.url }}
            description={contact.caption}
            image={contact.image}
            title={contact.title}
          />
        ) : null}

        {testimonials ? (
          <Section className={joinClasses(styles.main, styles.testimonials)} id="testimonial">
            {testimonials.testimonials.map((testimonial) => (
              <ServiceTestimonialCard
                action={testimonial.action}
                key={testimonial.author.name}
                name={testimonial.author.name}
                picture={testimonial.author.picture}
                quote={testimonial.content}
                role={testimonial.author.role}
              />
            ))}
            {main ? (
              <div>
                {main.main.items.map((item) => (
                  <Collapsed id={`${id ?? 'page'}-details-${item.title}`} key={item.title} title={item.title}>
                    <Markdown>{item.content}</Markdown>
                  </Collapsed>
                ))}
                <Markdown className={styles.note}>{main.main.note}</Markdown>
                <Button
                  className={styles.action}
                  href={resolveActionHref(main.main.action.url)}
                  type="default"
                >
                  {main.main.action.title ?? main.main.action.caption}
                </Button>
              </div>
            ) : null}
          </Section>
        ) : null}

        {logos ? (
          <section className={styles.carouselWrapper}>
            <div className={styles.carouselItems}>
              {logos.logos.items.map((slide) => (
                <div className={styles.carouselItemWrapper} key={slide.alt ?? slide.img}>
                  <Image
                    alt={slide.alt ?? 'logo'}
                    className={joinClasses(
                      styles.carouselItem,
                      slide.full && styles.carouselItemUnset,
                      slide.background && styles.background,
                    )}
                    height={104}
                    src={slide.img}
                    width={212}
                  />
                </div>
              ))}
            </div>
            <div className={styles.linkWrapper}>
              <a className={styles.link} href={resolveActionHref(logos.logos.action.url)}>
                {logos.logos.action.caption}
              </a>
            </div>
          </section>
        ) : null}

        {whatIsIncluded ? (
          <Section className={styles.whatIsIncluded} id="what-is-included">
            <div className={styles.section}>
              <h3 className={styles.pageTitle}>{whatIsIncluded.whatIsIncluded.title}</h3>
              <Markdown>{whatIsIncluded.whatIsIncluded.content}</Markdown>
              <ul className={styles.listItem}>
                {whatIsIncluded.whatIsIncluded.list?.map((item) => (
                  <div className={styles.listTitleWrapper} key={item.item}>
                    <li>{item.item}</li>
                    {item.video?.image ? (
                      <PlayCircleOutlined className={styles.videoIcon} onClick={() => handleContentOpen(item.video)} />
                    ) : null}
                  </div>
                ))}
              </ul>
              {whatIsIncluded.whatIsIncluded.action ? (
                <Button
                  className={styles.contactBtn}
                  href={resolveActionHref(whatIsIncluded.whatIsIncluded.action.url)}
                  type="primary"
                >
                  {whatIsIncluded.whatIsIncluded.action.caption}
                </Button>
              ) : null}
            </div>
            {whatIsIncluded.whatIsIncluded.image ? (
              <Image
                alt={whatIsIncluded.whatIsIncluded.title}
                height={480}
                src={whatIsIncluded.whatIsIncluded.image}
                width={310}
              />
            ) : null}
          </Section>
        ) : null}
      </div>

      {moreAboutUs ? (
        <ExperiencesCard
          data={moreAboutUs.institutionBenefit.item}
          title={moreAboutUs.institutionBenefit.title}
        />
      ) : null}

      <div className={styles.unsetTop}>
        {tutorials ? (
          <MaterialCards
            cards={tutorials.materials.cards}
            id="membership-materials"
            reverse={false}
            title={tutorials.materials.title}
          />
        ) : null}

        {stats ? (
          <>
            <Section className={styles.statistics} id="statistics">
              {stats.stats.items.map((stat) => (
                <StatisticBox
                  key={`${stat.caption}-${stat.count}`}
                  badge={stat.badge}
                  caption={stat.caption}
                  count={patchStats(stat.count, statistics?.statistics)}
                  title={stat.title}
                  url={stat.url}
                />
              ))}
            </Section>
            {stats.stats.action ? (
              <Button
                className={styles.statsButton}
                href={resolveActionHref(stats.stats.action.url)}
                type={resolveButtonType(stats.stats.action.variant)}
              >
                {stats.stats.action.title ?? stats.stats.action.caption}
              </Button>
            ) : null}
          </>
        ) : null}

        {register ? (
          <Section id="form">
            <h3 className={styles.pageTitle}>{register.form.title}</h3>
            <div className={styles.form}>
              <p className={styles.caption}>{register.form.subtitle}</p>
              {/* name prefixes the input id ("register_email") so it doesn't clash with the modal's "email" */}
              <Form layout="vertical" name="register" onFinish={handleRegistrationSubmit} requiredMark={false}>
                <Form.Item
                  className={floating.filled}
                  extra={register.form.helper}
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Email is required' },
                    { type: 'email', message: 'Enter a valid email address' },
                  ]}
                >
                  <Input placeholder="e.g. john.doe@ac.uk" type="email" />
                </Form.Item>
                <Button className={styles.button} htmlType="submit" type="primary">
                  {register.form.action}
                </Button>
              </Form>
            </div>
            <Markdown className={styles.formNote}>{register.form.note}</Markdown>
          </Section>
        ) : null}

        {additional ? (
          <Section
            className={joinClasses(
              styles.additional,
              additional.additional.id === 'discovery' && styles.additionalReverse,
            )}
            id="additional"
          >
            <Image
              alt={additional.additional.title}
              height={400}
              src={additional.additional.image}
              width={576}
            />
            <div className={styles.section}>
              <h3 className={styles.pageTitle}>{additional.additional.title}</h3>
              <Markdown>{additional.additional.content}</Markdown>
              <div className={styles.group}>
                {additional.additional.actions.map((action) => {
                  const button = (
                    <Button
                      key={action.caption ?? action.title}
                      className={styles.action}
                      href={resolveActionHref(action.url)}
                      type={action.primary ? 'primary' : 'default'}
                    >
                      {action.caption ?? action.title}
                    </Button>
                  )

                  if (!action.hint) {
                    return button
                  }

                  return (
                    <Tooltip key={action.caption ?? action.title} title={action.hint}>
                      {button}
                    </Tooltip>
                  )
                })}
              </div>
            </div>
          </Section>
        ) : null}

        {relatedServices ? (
          <RelatedServices
            services={relatedServices.relatedServices.services}
            title={relatedServices.relatedServices.title}
          />
        ) : null}
      </div>

      <VideoModal onClose={() => setVisibleVideo(false)} video={visibleVideo} />
      {registrationCopy && countries ? (
        <RegistrationModals
          copy={registrationCopy}
          countries={countries}
          turnstileSiteKey={turnstileSiteKey}
        />
      ) : null}
    </Layout>
  )
}

export default ServicePage
