import React from 'react'
import { Card, Form, TextField } from '@oacore/design/lib'
import { useRouter } from 'next/router'

import Collapsed from '../collapsed'
import Page from '../page'
import { Section, Content } from '../content'
import Markdown from '../markdown'
import { Button, Link } from '../elements'
import { KeyFeatureList, KeyFeature } from '../key-feature'
import Testimonial from '../testimonial'
import styles from './service.module.scss'
import RegistrationModals from '../modal/registration'

import { useInput } from 'hooks'
import { observe, useStore } from 'store'

const ServicePage = observe(
  ({
    id,
    title,
    tagline,
    features,
    description,
    main,
    keywords,
    whatIsIncluded,
    screenshot, // @optional
    additional, // @optional
    testimonial, // @optional
    documentation, // @optional
    relatedServices,
  }) => {
    const { value: email, element: elemEmail, bind: bindEmail } = useInput(
      '',
      'email'
    )

    const { registration } = useStore()
    const router = useRouter()
    const productType = router.route.match(/(?:dataset|api)/s).join('')

    const onHandleSubmit = (e) => {
      e.preventDefault()
      registration.setData({ productType, email })
      registration.setIsModalFormActive(true)
    }

    return (
      <Page
        title={title}
        description={description}
        keywords={keywords}
        className={styles.servicePage}
        nav
      >
        <RegistrationModals />

        <h1 className={styles.servicePageTitle}>{title}</h1>
        <p className={styles.servicePageTagline}>{tagline}</p>
        <Section tag="div">
          {screenshot && (
            <figure className={styles.servicePageScreenshot}>
              <img src={screenshot.source} alt={`${title}'s screenshot`} />
              {screenshot.caption && (
                <figcaption>
                  <Markdown>{screenshot.caption}</Markdown>
                </figcaption>
              )}
            </figure>
          )}

          <KeyFeatureList className={styles.servicePageFeatures}>
            {features.map((feature) => (
              <KeyFeature
                title={feature.title}
                icon={feature.picture}
                key={feature.title}
              >
                <Markdown>{feature.description}</Markdown>
              </KeyFeature>
            ))}
          </KeyFeatureList>

          <Content className={styles.servicePageContent}>
            <Markdown>{main}</Markdown>

            {documentation && (
              <p>
                <Link href={/documentation/ + id}>
                  {typeof documentation == 'string'
                    ? documentation
                    : 'Looking for documentation?'}
                </Link>
              </p>
            )}

            {additional && (
              <Collapsed id={`${id}-details`} title={additional.title}>
                <Markdown>{additional.content}</Markdown>
              </Collapsed>
            )}
          </Content>

          {testimonial && (
            <Testimonial
              className={`section ${styles.testimonial}`}
              {...testimonial}
            />
          )}
        </Section>

        {whatIsIncluded && (
          <Section caption={whatIsIncluded.title} id="what-is-included">
            <h2>{whatIsIncluded.title}</h2>
            <Content>
              <Markdown>{whatIsIncluded.content}</Markdown>
              {/* {whatIsIncluded.actions && (
              <ButtonToolbar>
                {whatIsIncluded.actions.primary && (
                  <Button
                    color="primary"
                    href={whatIsIncluded.actions.primary.url || '#'}
                    disabled={!whatIsIncluded.actions.primary.url}
                  >
                    {whatIsIncluded.actions.primary.caption}
                  </Button>
                )}
                {whatIsIncluded.actions.secondary && (
                  <Button
                    color="primary"
                    outline
                    href={whatIsIncluded.actions.secondary.url || '#'}
                    disabled={!whatIsIncluded.actions.secondary.url}
                  >
                    {whatIsIncluded.actions.secondary.caption}
                  </Button>
                )}
              </ButtonToolbar>
            )} */}
              <Card variant="outlined">
                <Card.Title tag="h5">Register for an API key</Card.Title>
                <p className={styles.cardSubtitle}>
                  Enter your email address to register new or restore your
                  previous API key:
                </p>
                <Form onSubmit={onHandleSubmit}>
                  <TextField
                    id={elemEmail}
                    name={elemEmail}
                    value={email}
                    label="Email"
                    className={styles.cardInput}
                    placeholder="e.g. john.doe@ac.ck.uk"
                    type="email"
                    required
                    helper="We will send the key and instructions to this address"
                    {...bindEmail}
                  />
                  <Button type="submit">Register now</Button>
                </Form>
              </Card>
            </Content>
          </Section>
        )}

        {relatedServices && relatedServices.length && (
          <Section
            caption="You might also be interested in"
            id="related-services"
          >
            <h2 className={styles.servicePageHeading}>
              You might also be interested in
            </h2>
            <KeyFeatureList>
              {relatedServices.map((service) => (
                <KeyFeature
                  icon={service.picture}
                  href={service.url}
                  key={service.title}
                >
                  <Markdown>{service.title}</Markdown>
                </KeyFeature>
              ))}
            </KeyFeatureList>
          </Section>
        )}
      </Page>
    )
  }
)

ServicePage.create = (pageContext) => () => <ServicePage {...pageContext} />

export default ServicePage
