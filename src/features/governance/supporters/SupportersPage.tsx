'use client'

import { Layout, PageNav, Section } from '@core/core-ui'
import Image from 'next/image'

import MaterialCards from '@components/MaterialCards'
import Header from '@components/Header/Header'
import type { HeaderAction } from '@components/Header/Header'
import Markdown from '@components/Markdown/Markdown'
import MembershipTable from '@features/membership/MembershipTable'
import type { CoreMember } from '@features/membership/types'
import type {
  GovernanceFeature,
  SupportersCardDescription,
  SupportersHowItWorksService,
  SupportersPageData,
} from '@features/governance/types'

import styles from './supporters.module.css'

type SupportersPageProps = {
  data: SupportersPageData
  members: CoreMember[]
}

const toHeaderActions = (actions?: GovernanceFeature[]): HeaderAction[] | undefined =>
  actions?.map((action) => ({
    caption: action.caption ?? action.title,
    title: action.title ?? action.caption,
    url: action.url ?? '',
    variant: action.variant ?? 'contained',
    target: action.target,
  }))

type CardDescriptionProps = {
  plan: SupportersCardDescription
}

const CardDescription = ({ plan }: CardDescriptionProps) => (
  <article className={styles.principlesDescription}>
    <h6 className={styles.principlesDescriptionTitle}>{plan.title}</h6>
    <Markdown>{plan.content}</Markdown>
  </article>
)

type HowItWorksCardProps = {
  plan: SupportersHowItWorksService
}

const HowItWorksCard = ({ plan }: HowItWorksCardProps) => (
  <article className={styles.howItWorksDescription}>
    {plan.image ? (
      <div className={styles.howItWorksImgWrapper}>
        <Image alt="" height={60} src={plan.image} width={60} />
      </div>
    ) : null}
    <div>
      <h6 className={styles.howItWorksDescriptionTitle}>{plan.title}</h6>
      <Markdown>{plan.description}</Markdown>
    </div>
  </article>
)

const SupportersPage = ({ data, members }: SupportersPageProps) => {
  const supporters = data.supporters?.items
  const communityNewsletters = data.communityNewsletters?.materials
  const header = supporters?.header

  return (
    <Layout>
      <PageNav ariaLabel="Supporters page sections" links={supporters?.headerLink} />

      {supporters ? (
        <Header
          actions={toHeaderActions(supporters.actions)}
          caption={supporters.tagline}
          description={supporters.description}
          id={header?.id}
          image={header?.image}
          logoAlt={supporters.title}
          reverse
          spacing
          title={supporters.title}
        />
      ) : null}

      {supporters?.ourPrinciples ? (
        <Section id="our-principles">
          {supporters.ourPrinciples.title ? (
            <h3 className={styles.pageTitle}>{supporters.ourPrinciples.title}</h3>
          ) : null}
          <div className={styles.principlesWrapper}>
            {supporters.ourPrinciples.cardsDescription?.map((plan) => (
              <CardDescription key={plan.title} plan={plan} />
            ))}
          </div>
        </Section>
      ) : null}

      {supporters?.principles ? (
        <Section className={styles.principles} id="principles">
          {supporters.principles.image ? (
            <Image
              alt="Supporters principles"
              className={styles.image}
              height={400}
              src={supporters.principles.image}
              width={600}
            />
          ) : null}
          {supporters.principles.description ? (
            <Markdown>{supporters.principles.description}</Markdown>
          ) : null}
        </Section>
      ) : null}

      {supporters?.howItWorks ? (
        <Section id="how-it-works">
          {supporters.howItWorks.title ? (
            <h3 className={styles.pageTitle}>{supporters.howItWorks.title}</h3>
          ) : null}
          <div className={styles.howItWorksWrapper}>
            {supporters.howItWorks.services?.map((plan) => (
              <HowItWorksCard key={plan.title} plan={plan} />
            ))}
          </div>
        </Section>
      ) : null}

      <MaterialCards
        cards={communityNewsletters?.cards}
        id="community-newsletters"
        linkTarget="_blank"
        title={communityNewsletters?.title}
      />

      <div className={styles.tableWrapper}>
        <MembershipTable
          members={members}
          sortByName
          title={supporters?.supporters?.title}
          type="members"
        />
      </div>
    </Layout>
  )
}

export default SupportersPage
