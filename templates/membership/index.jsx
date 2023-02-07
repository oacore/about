import React, { useRef, useState } from 'react'
import { Button } from '@oacore/design/lib/elements'
import { Carousel } from '@oacore/design/lib'
import { useOutsideClick } from '@oacore/design/lib/hooks'
import Parser from 'html-react-parser'

import styles from './styles.module.scss'
import DetailsTable from './details-table'
import listIcon from '../../public/images/membership/listIcon.svg'

import { Markdown } from 'components'
import { Layout, Section, Video } from 'design-v2/components'

const DetailsBox = ({ title, description }) => {
  const [open, setOpen] = useState(false)
  const boxRef = useRef(null)

  const toggleClick = (e) => {
    e.preventDefault()
    setOpen(!open)
  }

  const onClose = () => setOpen(false)

  useOutsideClick(boxRef, onClose)

  return (
    <details
      {...(open ? { open: true } : {})}
      className={styles.box}
      ref={boxRef}
    >
      <summary className={styles.title} onClick={toggleClick}>
        <Markdown>{title}</Markdown>
      </summary>
      <Markdown
        onClick={(e) => e.stopPropagation()}
        className={styles.description}
      >
        {description}
      </Markdown>
    </details>
  )
}

const CardDescription = ({ plan }) => (
  <article className={styles.memberDescription} key={plan.title}>
    <h6 className={styles.memberDescriptionTitle}>{plan.title}</h6>
    <span>{plan.content}</span>
  </article>
)

const Card = ({ plan }) => (
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
          <Markdown className={styles.planBoxTitle}>{plan.box.title}</Markdown>
          <Markdown className={styles.planBoxCaption} tag="span">
            {plan.box.caption}
          </Markdown>
        </div>
      )}
      <ul className={styles.planAdvantages}>
        {plan.advantages.map((advantage) => (
          <div className={styles.listWrapper}>
            <img src={listIcon} alt="listIcon" />
            <li key={advantage.title}>
              <DetailsBox
                title={advantage.title}
                description={advantage.description}
              />
            </li>
          </div>
        ))}
      </ul>
      <div className={styles.planContentButton}>
        <Button variant="contained" href={plan.action.url}>
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

const MembershipPageTemplate = ({ data }) => {
  const [visibleVideo, setVisibleVideo] = React.useState(false)

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
      <section id="core-members" className={styles.carouselWrapper}>
        <Carousel
          dots={false}
          draggable
          slidesToShow={5}
          infinite
          arrows={false}
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
        data={{
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
              <img src={card.image} alt="" />
              <div className={styles.buttonWrapper}>
                <Button
                  className={styles.materialButton}
                  variant="outlined"
                  href={!card.video ? card.action.url : ''}
                  target={card.action.target}
                  onClick={card.video ? () => setVisibleVideo(true) : ''}
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
