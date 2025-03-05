import React from 'react'

import styles from './supporters.module.scss'
import MembershipTable from '../../../components/membership-table/membershipTable'

import { Page, Markdown } from 'components'
import { Layout, Hero, Section } from 'design-v2/components'

const CardDescription = ({ plan }) => (
  <article className={styles.principlesDescription} key={plan.title}>
    <h6 className={styles.principlesDescriptionTitle}>{plan.title}</h6>
    <Markdown>{plan.content}</Markdown>
  </article>
)

const Card = ({ plan }) => (
  <article className={styles.howItWorksDescription} key={plan.title}>
    <div className={styles.howItWorksImgWrapper}>
      <img src={plan.image} alt="support" />
    </div>
    <div>
      <h6 className={styles.howItWorksDescriptionTitle}>{plan.title}</h6>
      <Markdown>{plan.description}</Markdown>
    </div>
  </article>
)

export const excludedIds = [
  3463, 183, 2145, 1248, 660, 222, 14373, 3559, 21117, 292, 14567, 2812, 196,
  3581, 197, 12800, 14335, 1249, 2313, 21853, 15201, 1012, 158,
]

const GovernanceSupportersPageTemplate = ({ meta, supporters, members }) => (
  <Page title={meta.title} description={meta.tagline}>
    <Layout className={styles.container}>
      <div className={styles.navWrapper}>
        {supporters.items.headerLink.map((item) => (
          <a className={styles.linkItem} href={item.href}>
            {item.link}
          </a>
        ))}
      </div>
      <Hero
        id={supporters.items.header.id}
        image={supporters.items.header.image}
        title={supporters.items.title}
        description={supporters.items.description}
        caption={supporters.items.tagline}
        actions={supporters.items.actions}
        reverse
        spacing
      />
      <Section id="our-principles" className={styles.ourPrinciples}>
        <h4>{supporters.items.ourPrinciples.title}</h4>
        <div className={styles.principlesWrapper}>
          {supporters.items.ourPrinciples.cardsDescription.map((plan) => (
            <CardDescription key={plan.title} plan={plan} />
          ))}
        </div>
      </Section>
      <Section id="principles" className={styles.principles}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={supporters.items.principles.image}
            alt="support"
          />
        </div>
        <article className={styles.content}>
          <Markdown>{supporters.items.principles.description}</Markdown>
        </article>
      </Section>
      <Section id="how-it-works" className={styles.howItWorks}>
        <h4>{supporters.items.howItWorks.title}</h4>
        <div className={styles.howItWorksWrapper}>
          {supporters.items.howItWorks.services.map((plan) => (
            <Card key={plan.title} plan={plan} />
          ))}
        </div>
      </Section>
      <MembershipTable
        title={supporters.items.supporters.title}
        members={members}
        excludedIds={excludedIds}
      />
    </Layout>
  </Page>
)

export default GovernanceSupportersPageTemplate
