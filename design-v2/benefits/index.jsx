import React from 'react'
import { Button } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'

import styles from './styles.module.scss'
import AddDataProviderForm from './form'
import { Layout, Section } from '../components'

// TODO: REPLACE OLD COMPONENT
import { Markdown } from 'components'
import benefitsData from 'data/benefits.yml'
import { patchStats } from 'components/utils'

const JoinSectionItem = ({ title, picture, description }) => (
  <div caption={title} className={styles.services}>
    {picture && (
      <figure>
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
        <img
          className={styles.image}
          src={picture}
          alt={`${title}'s picture`}
        />
      </figure>
    )}
    <div className={styles.content}>
      <h5>{title}</h5>
      <Markdown>{description}</Markdown>
    </div>
  </div>
)

const BenefitsPageTemplate = () => (
  <Layout>
    <Section id="banner" caption="banner" className={styles.sectionBanner}>
      <div className={styles.columnDescription}>
        <h3 className={styles.title}>{benefitsData.banner.title}</h3>
        <div className={styles.description}>
          {benefitsData.banner.description}
        </div>
        {benefitsData.banner.actions.links.map(({ url, text, link }) => (
          <Button
            variant={link ? 'text' : 'contained'}
            href={link ? url : `#${url}`}
            key={text}
            className={classNames.use(styles.button, {
              [styles.buttonLink]: link,
            })}
          >
            {text}
          </Button>
        ))}
      </div>
      <div className={styles.columnVelcro}>
        <div className={styles.velcroWrap}>
          <div className={styles.velcro}>
            <div className={styles.title}>
              {benefitsData.banner.velcro.title}
            </div>
            {benefitsData.banner.velcro.blocks.map((velcroGroup) => (
              <a href={`#${velcroGroup.id}`} key={velcroGroup.id}>
                <img
                  src={velcroGroup.picture}
                  alt={velcroGroup.title}
                  className={styles.velcroPicture}
                />
                <div className={styles.velcroTextBlock}>
                  <span className={styles.velcroTitle}>
                    {velcroGroup.title}
                  </span>
                  <span className={styles.velcroDescription}>
                    {velcroGroup.description}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>

    <Section>
      <h4 className={styles.title}>{benefitsData.sections.title}</h4>
      {benefitsData.sections.blocks.map((block) => (
        <JoinSectionItem key={block.id} {...block} />
      ))}
    </Section>
    <Section id="statistic" caption="statistic" className={styles.statistic}>
      <h4 className={styles.title}>{benefitsData.stat.title}</h4>
      <div className={styles.stats}>
        {benefitsData.stat.blocks.map((statisticGroup) => (
          <div className={styles.statsItem} key={statisticGroup.title}>
            {patchStats(statisticGroup.value, benefitsData.statistics) !==
              '<mark>0</mark>' && (
              <>
                <div className={styles.statTitle}>{statisticGroup.title}</div>
                <Markdown>
                  {patchStats(statisticGroup.value, benefitsData.statistics)}
                </Markdown>
              </>
            )}
          </div>
        ))}
      </div>
    </Section>
    <Section id="join-core" caption="join-core" className={styles.joinCore}>
      <div className={styles.formBlock}>
        <div id="add-new-data-provider" className={styles.addDataProvider}>
          <p>{benefitsData.join.title}</p>
          <AddDataProviderForm />
        </div>
      </div>
      <div className={styles.imgBlock}>
        <img
          src={benefitsData.join.picture}
          alt={benefitsData.join.title}
          className={styles.image}
        />
      </div>
    </Section>
  </Layout>
)

export default BenefitsPageTemplate
