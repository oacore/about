'use client'

import { DownOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { Button, Card, Tag, Typography } from 'antd'
import Image from 'next/image'
import { useCallback, useState } from 'react'

import MaterialCards from '@components/MaterialCards'
import ExperiencesCard from '@components/pages/ExperiencesCard'
import Header from '@components/Header/Header'
import VideoModal from '@components/VideoModal'
import MembershipCarousel from '@components/MembershipCarousel/MembershipCarousel'
import { Layout, Section } from '@components/layout'
import Markdown from '@components/Markdown/Markdown'
import PageNav from '@components/PageNav'
import MembershipDetailsTable from '@features/membership/MembershipDetailsTable'
import MembershipTable from '@features/membership/MembershipTable'
import type {
  CoreMember,
  MembershipAdvantage,
  MembershipPageData,
  MembershipPlanCard,
} from '@features/membership/types'
import type { ServicePageVideo } from '@components/pages/types'

import styles from './styles.module.css'

const { Title } = Typography

type MembershipPageProps = {
  data: MembershipPageData
  members: CoreMember[]
  allMembers: CoreMember[]
}

const resolveActionHref = (url: string): string => {
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('#')) {
    return url
  }
  if (url.startsWith('/')) {
    return url
  }
  return `/${url}`
}

type PlanAdvantageProps = {
  advantage: MembershipAdvantage
  activeId: number | null
  onToggle: (id: number) => void
  onVideoOpen: (video: ServicePageVideo) => void
}

const PlanAdvantage = ({ advantage, activeId, onToggle, onVideoOpen }: PlanAdvantageProps) => {
  const isActive = activeId === advantage.id
  const hasVideo = Boolean(advantage.video?.src)

  const handleTitleClick = () => {
    onToggle(advantage.id)
  }

  const handleTitleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    onToggle(advantage.id)
  }

  const handleVideoClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    if (advantage.video) {
      onVideoOpen(advantage.video)
    }
  }

  const handleVideoKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    if (advantage.video) {
      onVideoOpen(advantage.video)
    }
  }

  return (
    <li className={styles.planAdvantageItem}>
      <DownOutlined aria-hidden className={styles.planAdvantageIcon} />
      <div className={styles.planAdvantageBox}>
        <div
          className={styles.planAdvantageTitleRow}
          onClick={handleTitleClick}
          onKeyDown={handleTitleKeyDown}
          role="button"
          tabIndex={0}
        >
          <Markdown className={styles.planAdvantageTitle}>{advantage.title}</Markdown>
          {hasVideo ? (
            <PlayCircleOutlined
              aria-label={`Play video: ${advantage.title}`}
              className={styles.videoIcon}
              onClick={handleVideoClick}
              onKeyDown={handleVideoKeyDown}
              role="button"
              tabIndex={0}
            />
          ) : null}
          {advantage.id === 25 ? <Tag color={"#8bc34a"} className={styles.soonTag}>coming soon</Tag> : null}
        </div>
        {isActive && advantage.descriptionCardCard ? (
          <Markdown className={styles.planAdvantageDescription}>
            {advantage.descriptionCardCard}
          </Markdown>
        ) : null}
      </div>
    </li>
  )
}

type MembershipPlanCardProps = {
  plan: MembershipPlanCard
  onVideoOpen: (video: ServicePageVideo) => void
}

const MembershipPlanCardView = ({ plan, onVideoOpen }: MembershipPlanCardProps) => {
  const [activeId, setActiveId] = useState<number | null>(null)

  const handleToggle = (id: number) => {
    setActiveId((current) => (current === id ? null : id))
  }

  return (
    <Card className={styles.planCard} title={false}>
      <div className={styles.planHeader}>
        <h2 className={styles.planCardTitle}>{plan.title}</h2>
        {plan.caption ? <Markdown className={styles.planHeaderCaption}>{plan.caption}</Markdown> : null}
      </div>
      <div className={styles.planDivider} />
      <div className={styles.planContent}>
        {plan.box ? (
          <div className={styles.planBox}>
            <Markdown className={styles.planBoxTitle}>{plan.box.title}</Markdown>
            <Markdown className={styles.planBoxCaption}>{plan.box.caption}</Markdown>
          </div>
        ) : null}
        <ul className={styles.planAdvantages}>
          {plan.advantages.map((advantage) => (
            <PlanAdvantage
              activeId={activeId}
              advantage={advantage}
              key={advantage.id}
              onToggle={handleToggle}
              onVideoOpen={onVideoOpen}
            />
          ))}
        </ul>
        <div className={styles.planAction}>
          <Button href={resolveActionHref(plan.action.url)} id="core-members" type="primary">
            {plan.action.title}
          </Button>
        </div>
        {plan.subscribe ? (
          <Markdown className={styles.planSubscribe}>{plan.subscribe}</Markdown>
        ) : null}
      </div>
    </Card>
  )
}

const MembershipPage = ({ data, members, allMembers }: MembershipPageProps) => {
  const [visibleVideo, setVisibleVideo] = useState<ServicePageVideo | null>(null)

  const handleContentOpen = useCallback((video?: ServicePageVideo) => {
    if (video) {
      setVisibleVideo(video)
    }
  }, [])

  const header = data.header?.header
  const plans = data.plan?.table.plans

  return (
    <Layout>
      <div className={styles.layoutWrapper}>
        <PageNav
          ariaLabel="Membership sections"
          links={data.headerLink?.headerLink}
          variant="muted"
        />

        {header ? (
          <Header
            actions={header.actions}
            description={header.description}
            id="metadata"
            image={header.logo}
            logoAlt={header.title}
            title={header.title}
          />
        ) : null}

        {plans ? (
          <Section className={styles.plans} id="membership-levels">
            <h3 className={styles.pageTitle}>{plans.title}</h3>
            <div className={styles.plansWrapper}>
              {plans.cardsDescription.map((plan) => (
                <article className={styles.memberDescription} key={plan.title}>
                  <h6 className={styles.memberDescriptionTitle}>{plan.title}</h6>
                  <Markdown>{plan.content}</Markdown>
                </article>
              ))}
            </div>
            <div className={styles.plansWrapper}>
              {plans.cards.map((plan) => (
                <MembershipPlanCardView key={plan.title} onVideoOpen={handleContentOpen} plan={plan} />
              ))}
            </div>
          </Section>
        ) : null}

        {data.carousel ? (
          <MembershipCarousel
            actionUrl={data.carousel.carousel.action.url}
            items={data.carousel.carousel.items}
            membersCount={members.length}
          />
        ) : null}

        {data.box && data.howItWorks && data.plan ? (
          <MembershipDetailsTable
            data={{
              box: data.box.box,
              howItWorks: data.howItWorks.howItWorks,
              comparisonTable: data.plan.table.comparisonTable,
            }}
            howItWorksOption
          />
        ) : null}

        {data.support ? (
          <Section id="support">
            <h4 className={styles.miniTitle}>{data.support.support.title}</h4>
            <Markdown className={styles.supportText}>{data.support.support.description}</Markdown>
            <div className={styles.cards}>
              {data.support.support.cards.map((card) => (
                <article className={styles.supportCard} key={card.title}>
                  {card.img ? (
                    <Image
                      alt={card.title}
                      className={styles.supportCardImage}
                      height={60}
                      src={card.img}
                      width={99}
                    />
                  ) : (
                    <div className={styles.supportCardCount}>{members.length}</div>
                  )}
                  <h5 className={styles.supportCardTitle}>{card.title}</h5>
                  <p className={styles.supportCardCaption}>{card.caption}</p>
                </article>
              ))}
            </div>
          </Section>
        ) : null}
      </div>

      {data.benefits ? (
        <ExperiencesCard
          data={data.benefits.institutionBenefit.item}
          title={data.benefits.institutionBenefit.title}
        />
      ) : null}
      <MaterialCards
        cards={data.materials?.materials.cards}
        id="membership-materials"
        title={data.materials?.materials.title}
      />

      <div className={styles.tableWrapper} id="member-list">
        <MembershipTable members={allMembers} title="List of members" type="members" />
      </div>

      <VideoModal onClose={() => setVisibleVideo(null)} video={visibleVideo} />
    </Layout>
  )
}

export default MembershipPage
