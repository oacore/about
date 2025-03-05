import { Button } from '@oacore/design/lib/elements'
import React from 'react'

import styles from './styles.module.scss'
import { Markdown } from '../index'
import Section from '../../design-v2/components/layout/section'

const ExperiencesCard = ({ title, data }) => (
  <Section id="member-experiences">
    <div className={styles.institutionBenefitWrapper}>
      <div className={styles.institutionBenefitInnerWrapper}>
        <div className={styles.titleWrapper}>
          <Markdown className={styles.mainTitle}>{title}</Markdown>
        </div>
        {data.map((repo) => (
          <div className={styles.itemMainWrapper}>
            <div className={styles.itemWrapper}>
              <h5 className={styles.itemTitle}>{repo.title}</h5>
              <p className={styles.itemDescription}>{repo.description}</p>
            </div>
            <div className={styles.footer}>
              <div className={styles.userWrapper}>
                <img className={styles.userImg} src={repo.img} alt="" />
                <div>
                  <h6 className={styles.user}>{repo.user}</h6>
                  <p className={styles.position}>{repo.position}</p>
                </div>
              </div>
              <Button target="blank" href={repo.action.url}>
                {repo.action.title}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Section>
)

export default ExperiencesCard
