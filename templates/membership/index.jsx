import React, { useCallback, useState } from 'react'
import { Button } from '@oacore/design/lib/elements'
import { Carousel } from '@oacore/design/lib'
import Parser from 'html-react-parser'
import classNames from '@oacore/design/lib/utils/class-names'

import styles from './styles.module.scss'
import DetailsTable from './details-table'
import listIcon from '../../public/images/membership/listIcon.svg'
import carouselArrowRight from '../../public/images/membership/carouselArrowRight.svg'
import carouselArrowLeft from '../../public/images/membership/carouselArrowLeft.svg'
import ExperiencesCard from '../../components/experiences-card/experiencesCard'

import { Markdown } from 'components'
import { Section, Video } from 'design-v2/components'

const DetailsBox = ({
  title,
  description,
  advantageId,
  handleToggle,
  active,
  videoIcon,
  video,
  handleContentOpen,
}) => (
  <div className={styles.box}>
    {/* eslint-disable-next-line max-len */}
    {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
    <div className={styles.title} onClick={() => handleToggle(advantageId)}>
      <div
        className={classNames.use({
          [styles.wrapper]: advantageId === 25,
        })}
      >
        <div className={styles.listTitleWrapper}>
          <Markdown className={styles.listTitle}>{title}</Markdown>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <img
            onClick={() => handleContentOpen(video)}
            className={styles.videoIcon}
            src={videoIcon}
            alt=""
          />
        </div>
        {advantageId === 25 && <span className={styles.soon}>coming soon</span>}
      </div>
    </div>
    {active === advantageId && (
      <Markdown className={styles.description}>{description}</Markdown>
    )}
  </div>
)

const CardDescription = ({ plan }) => (
  <article className={styles.memberDescription} key={plan.title}>
    <h6 className={styles.memberDescriptionTitle}>{plan.title}</h6>
    <Markdown>{plan.content}</Markdown>
  </article>
)

const Card = ({ plan, handleContentOpen }) => {
  const [active, setActive] = useState(null)

  const handleToggle = React.useCallback(
    (id) => {
      if (active !== id) setActive(id)
      else setActive(null)
    },
    [active]
  )

  return (
    <article className={styles.plan} key={plan.title}>
      <div className={styles.planHeader}>
        <h5>{plan.title}</h5>
        {plan.caption &&
          Parser(
            `<span className={styles.planHeaderCaption}>${plan.caption}</span>`
          )}
      </div>
      <div className={styles.divider} />
      <div className={styles.planContent}>
        {plan.box && (
          <div className={styles.planBox}>
            <Markdown className={styles.planBoxTitle}>
              {plan.box.title}
            </Markdown>
            <Markdown className={styles.planBoxCaption} tag="span">
              {plan.box.caption}
            </Markdown>
          </div>
        )}
        <ul className={styles.planAdvantages}>
          {plan.advantages.map((advantage) => (
            <div className={styles.listWrapper} key={advantage.id}>
              <img src={listIcon} alt="listIcon" />
              <li key={advantage.title}>
                <DetailsBox
                  active={active}
                  handleToggle={() => handleToggle(advantage.id)}
                  advantageId={advantage.id}
                  title={advantage.title}
                  video={advantage.video}
                  videoIcon={advantage.video?.image}
                  description={advantage.descriptionCardCard}
                  handleContentOpen={handleContentOpen}
                />
              </li>
            </div>
          ))}
        </ul>
        <div
          className={classNames.use(styles.planContentButton, {
            [styles.placement]: !plan.subscribe,
          })}
        >
          <Button id="core-members" variant="contained" href={plan.action.url}>
            {plan.action.title}
          </Button>
        </div>
        {plan.subscribe ? (
          <Markdown className={styles.subscription}>{plan.subscribe}</Markdown>
        ) : (
          ''
        )}
      </div>
    </article>
  )
}

const MembershipPageTemplate = ({ data, members }) => {
  const [visibleVideo, setVisibleVideo] = React.useState(null)

  const handleContentOpen = useCallback((condition) => {
    if (condition) setVisibleVideo(condition)
  }, [])

  return (
    <div>
      <div className={styles.layoutWrapper}>
        <div className={styles.navWrapper}>
          {data.headerLink.headerLink.map((item) => (
            <a className={styles.linkItem} href={item.href} key={item.link}>
              {item.link}
            </a>
          ))}
        </div>
        <Section id="metadata" className={styles.header}>
          <div>
            <h2 className={styles.title}>{data.header.header.title}</h2>
            <Markdown className={styles.description}>
              {data.header.header.description}
            </Markdown>
            <div className={styles.buttonGroup}>
              {data.header.header.actions.map((action) => (
                <Button
                  href={action.url}
                  target={action.target}
                  variant={action.variant}
                  key={action.caption}
                  download={action.download}
                >
                  {action.caption}
                </Button>
              ))}
            </div>
          </div>
          <div className={styles.logoContainer}>
            <img src={data.header.header.logo} alt="logo" />
          </div>
        </Section>
        <Section id="membership-levels" className={styles.plans}>
          <h4>{data.plan.table.plans.title}</h4>
          <div className={styles.plansWrapper}>
            {data.plan.table.plans.cardsDescription.map((plan) => (
              <CardDescription key={plan.title} plan={plan} />
            ))}
          </div>
          <div className={styles.plansWrapper}>
            {data.plan.table.plans.cards.map((plan) => (
              <Card
                handleContentOpen={handleContentOpen}
                key={plan.title}
                plan={plan}
              />
            ))}
          </div>
        </Section>
        <section className={styles.carouselWrapper}>
          <Carousel
            draggable
            slidesToShow={5}
            infinite
            autoplay={false}
            prevArrow={
              <div>
                <img
                  className={styles.arrowLeft}
                  src={carouselArrowLeft}
                  alt="carouselArrowLeft"
                />
              </div>
            }
            nextArrow={
              <div>
                <img
                  className={styles.arrowRight}
                  src={carouselArrowRight}
                  alt="carouselArrowRight"
                />
              </div>
            }
          >
            {data.carousel.carousel.items.map((slide) => (
              <img
                className={styles.carouselItem}
                src={slide.img}
                alt="logo"
                key={slide.alt}
              />
            ))}
          </Carousel>
          <div className={styles.linkWrapper}>
            <a href={data.carousel.carousel.action.url}>
              See all {members.length} CORE members
            </a>
          </div>
        </section>
        <DetailsTable
          howItWorksOption
          data={{
            box: data.box.box,
            howItWorks: data.howItWorks.howItWorks,
            comparisonTable: data.plan.table.comparisonTable,
          }}
        />
        <Section id="support">
          <h4>{data.support.support.title}</h4>
          <Markdown className={styles.supportText}>
            {data.support.support.description}
          </Markdown>
          <div className={styles.cards}>
            {data.support.support.cards.map((card) => (
              <div key={card.title} className={styles.card}>
                {card.img ? (
                  <img
                    src={card.img}
                    alt={card.title}
                    className={styles.cardImage}
                  />
                ) : (
                  <div className={styles.cardCount}>{members.length}</div>
                )}
                <h5 className={styles.cardTitle}>{card.title}</h5>
                <p className={styles.cardCaption}>{card.caption}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
      <ExperiencesCard
        title={data.benefits.institutionBenefit.title}
        data={data.benefits.institutionBenefit.item}
      />
      <div className={styles.layoutMiniWrapper}>
        <Section id="membership-materials">
          <h4>{data.materials.materials.title}</h4>
          <div className={styles.cardsWrapper}>
            {data.materials.materials.cards.map((card) => (
              <article className={styles.materialsCard} key={card.key}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  onClick={() => handleContentOpen(card.video)}
                  target={card.action.target}
                  href={!card.video ? card.action.url : null}
                  className={styles.materialWrapper}
                >
                  <div className={styles.materialInnerWrapper}>
                    <img src={card.image} alt="" />
                    <div className={styles.materialTitle}>{card.title}</div>
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
    </div>
  )
}
export default MembershipPageTemplate
