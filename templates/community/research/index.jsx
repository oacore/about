/* eslint-disable arrow-body-style */
import { Card, Button, Carousel, Link } from '@oacore/design'
import React from 'react'
import classNames from '@oacore/design/lib/utils/class-names'

import styles from './research.module.scss'

const cards = [
  {
    id: 1,
    name: 'Daisuke Ikeda',
    prof: 'Associate Professor at Kyushu University',
    avatarUrl: '/images/community/research/share.svg',
    text:
      'I would be lost without CORE Researchers Community. I would like to personally thank you for the membership.',
  },
  {
    id: 2,
    name: 'Daisuke Ikeda2',
    prof: 'Associate Professor at Kyushu University',
    avatarUrl: '/images/community/research/share.svg',
    text:
      'I would be lost without CORE Researchers Community. I would like to personally thank you for the membership.',
  },
  {
    id: 3,
    name: 'Daisuke Ikeda3',
    prof: 'Associate Professor at Kyushu University',
    avatarUrl: '/images/community/research/share.svg',
    text:
      'I would be lost without CORE Researchers Community. I would like to personally thank you for the membership.',
  },
]

const Research = ({ data }) => {
  const { header, joinCards, mission, spotlight } = data
  return (
    <div className={styles.layout}>
      <div className={classNames.use(styles.header, styles.container)}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>{header.title}</h1>
          <p>{header.citation}</p>
          <span>– {header.author} </span>
        </div>
        <div className={styles.headerBanner}>
          <img
            src="/images/community/research/header.svg"
            alt="Research Community"
          />
        </div>
      </div>
      <section className={classNames.use(styles.contentMain, styles.container)}>
        <p className={styles.contentMainText}>{mission.description}</p>
        <Card className={styles.contentMainCard}>
          <span>ONLINE</span>
          <Card.Title tag="h5" className={styles.contentMainCardTitle}>
            {spotlight.title}
          </Card.Title>
          <Card.Description>{spotlight.description}</Card.Description>
          <Button variant="contained">{spotlight.actionLabel}</Button>
        </Card>
      </section>
      <section
        className={classNames.use(styles.container, styles.joinCardsWrapper)}
      >
        <h2 className={styles.title}>Why join</h2>
        <div className={styles.joinCards}>
          <div className={styles.joinCard}>
            <img src="/images/community/research/dataset.svg" alt="Dataset" />
            <h6>{joinCards.firstCardTitle}</h6>
            <p>{joinCards.firstCardDescription}</p>
          </div>
          <div className={styles.joinCard}>
            <img
              src="/images/community/research/share.svg"
              alt="Share and Learn"
            />
            <h6>{joinCards.secondCardTitle}</h6>
            <p>{joinCards.secondCardDescription}</p>
          </div>
          <div className={styles.joinCard}>
            <img
              src="/images/community/research/collaboration.svg"
              alt="Collaboration"
            />
            <h6>{joinCards.thirdCardTitle}</h6>
            <p>{joinCards.thirdCardDescription}</p>
          </div>
        </div>
      </section>
      <section className={classNames.use(styles.container, styles.community)}>
        <h2 className={styles.title}>Researchers spotlight</h2>
        <p>
          Each month we focus on the recent work of one of the members of the
          Researchers community. Here we take the opportunity to dive into some
          of the diverse ways in which data from CORE is currently being used by
          researchers around the world.
        </p>
        <div className={styles.communityCards}>
          {cards.length > 2 && (
            <Carousel>
              {cards.map((card) => (
                <Card key={card.id} className={styles.communityCard}>
                  <Card.Description>{card.text}</Card.Description>
                  <Card.Footer className={styles.communityCardAuthor}>
                    <img
                      src="/images/community/research/avatar.svg"
                      alt="Avatar"
                    />
                    <div className={styles.communityCardAuthorInfo}>
                      <span className={styles.communityCardAuthorName}>
                        {card.name}
                      </span>
                      <span className={styles.communityCardAuthorProf}>
                        {card.prof}
                      </span>
                    </div>
                  </Card.Footer>
                </Card>
              ))}
            </Carousel>
          )}
        </div>
      </section>
      <section className={styles.joinFooter}>
        <h2 className={styles.title}>Join us</h2>
        <p>
          Far more than ‘yet another mailing list’, the CORE Researcher
          community aims to be a catalyst, an active and participatory group
          that exists to help its members gain the best from CORE and to learn
          from the experiences of others.
        </p>
        <p className={styles.joinFooterContact}>
          Contact us <Link href="https://core.ac.uk/about#contact">HERE</Link>{' '}
          to request further details of how to join this group.
        </p>
        <Button variant="contained">Join now</Button>
      </section>
    </div>
  )
}

export default Research
