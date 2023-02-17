import React, { useState } from 'react'
import { Button } from '@oacore/design/lib/elements'
import { Carousel } from '@oacore/design/lib'
import Parser from 'html-react-parser'
import classNames from '@oacore/design/lib/utils/class-names'

import styles from './styles.module.scss'
import DetailsTable from './details-table'
import listIcon from '../../public/images/membership/listIcon.svg'
import carouselArrowRight from '../../public/images/membership/carouselArrowRight.svg'
import carouselArrowLeft from '../../public/images/membership/carouselArrowLeft.svg'

import { Markdown } from 'components'
import { Layout, Section, Video } from 'design-v2/components'

const DetailsBox = ({
  title,
  description,
  advantageId,
  handleToggle,
  active,
}) => (
  <div className={styles.box}>
    {/* eslint-disable-next-line max-len */}
    {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
    <div className={styles.title} onClick={() => handleToggle(advantageId)}>
      <Markdown>{title}</Markdown>
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

const Card = ({ plan }) => {
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
                  description={advantage.descriptionCardCard}
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

const MembershipPageTemplate = ({ data }) => {
  const [visibleVideo, setVisibleVideo] = React.useState(false)

  const handleContentOpen = (condition) => {
    if (condition) return () => setVisibleVideo(true)

    return null
  }

  return (
    <Layout>
      <div className={styles.navWrapper}>
        {data.headerLink.map((item) => (
          <a className={styles.linkItem} href={item.href}>
            {item.link}
          </a>
        ))}
      </div>
      <Section id="metadata" className={styles.header}>
        <div>
          <h2 className={styles.title}>{data.header.title}</h2>
          <Markdown className={styles.description}>
            {data.header.description}
          </Markdown>
          <div className={styles.buttonGroup}>
            {data.header.actions.map((action) => (
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
          <img src={data.header.logo} alt="logo" />
        </div>
      </Section>
      <Section id="membership-levels" className={styles.plans}>
        <h4>{data.plans.title}</h4>
        <div className={styles.plansWrapper}>
          {data.plans.cardsDescription.map((plan) => (
            <CardDescription key={plan.title} plan={plan} />
          ))}
        </div>
        <div className={styles.plansWrapper}>
          {data.plans.cards.map((plan) => (
            <Card key={plan.title} plan={plan} />
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
          {data.carousel.items.map((slide) => (
            <img className={styles.carouselItem} src={slide.img} alt="logo" />
          ))}
        </Carousel>
        <div className={styles.linkWrapper}>
          <a href={data.carousel.action.url}>{data.carousel.action.caption}</a>
        </div>
      </section>
      <DetailsTable
        howItWorksOption
        data={{
          box: data.box,
          howItWorks: data.howItWorks,
          comparisonTable: data.comparisonTable,
        }}
      />
      <Section id="support">
        <h4>{data.support.title}</h4>
        <Markdown className={styles.supportText}>
          {data.support.description}
        </Markdown>
        <div className={styles.cards}>
          {data.support.cards.map((card) => (
            <div key={card.title} className={styles.card}>
              <img
                src={card.img}
                alt={card.title}
                className={styles.cardImage}
              />
              <h5 className={styles.cardTitle}>{card.title}</h5>
              <p className={styles.cardCaption}>{card.caption}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section id="membership-materials">
        <h4>{data.materials.title}</h4>
        <div className={styles.cardsWrapper}>
          {data.materials.cards.map((card) => (
            <article className={styles.materialsCard}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                target={card.action.target}
                href={!card.video ? card.action.url : null}
                onClick={handleContentOpen(card.video)}
              >
                <img
                  src={card.image}
                  className={styles.materialsImage}
                  alt=""
                />
              </a>
              <div className={styles.buttonWrapper}>
                <Button
                  className={styles.materialButton}
                  variant="outlined"
                  href={!card.video ? card.action.url : null}
                  target={card.action.target}
                  onClick={handleContentOpen(card.video)}
                >
                  {card.action.caption}
                </Button>
              </div>
              {card.video && (
                <Video
                  visibleModal={visibleVideo}
                  closeModal={() => setVisibleVideo(false)}
                  video={card.video}
                />
              )}
            </article>
          ))}
        </div>
      </Section>
    </Layout>
  )
}
export default MembershipPageTemplate
