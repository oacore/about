import React from 'react'
import { Card, Button } from '@oacore/design'
import classNames from '@oacore/design/lib/utils/class-names'

import styles from './research.module.scss'

import Markdown from 'components/markdown'

const Research = ({ data }) => {
  const { header, joinCards, mission, symposium, joinUs } = data

  return (
    <div className={styles.layout}>
      <section className={classNames.use(styles.header, styles.container)}>
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
      </section>
      <section className={classNames.use(styles.contentMain, styles.container)}>
        <p className={styles.contentMainText}>{mission.description}</p>
        <Card className={styles.contentMainCard}>
          <span>ONLINE</span>
          <Card.Title tag="h5" className={styles.contentMainCardTitle}>
            {symposium.title}
          </Card.Title>
          <Card.Description>{symposium.description}</Card.Description>
          <Button
            variant="contained"
            tag="a"
            href="https://docs.google.com/forms/d/e/1FAIpQLSe-oyNDMTuZSrhktAjwo5Dyho1Jl2e11lOIo89oSlgYT7nD4A/viewform"
            target="_blank"
          >
            {symposium.actionLabel}
          </Button>
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

      {/* <section className={classNames.use(styles.container,
       styles.community)}>
        <h2 className={styles.title}>{spotlight.title}</h2>
        <p>{spotlight.description}</p>
        <div className={styles.communityCards}> */}
      {/* TODO: When we will have real quotes use this carousel. */}
      {/* {cards.length > 2 && (
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
          )} */}
      {/* </div>
      </section> */}
      <section className={classNames.use(styles.container, styles.joinFooter)}>
        <h2 className={styles.title}>{joinUs.title}</h2>
        <p>{joinUs.description}</p>
        <Markdown>{joinUs.contact}</Markdown>
        <Button
          variant="contained"
          href="https://core.ac.uk/about#contact"
          tag="a"
        >
          {joinUs.actionLabel}
        </Button>
      </section>
    </div>
  )
}

export default Research
