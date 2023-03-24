import React, { useState } from 'react'
import { Button } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'

import styles from './styles.module.scss'
import AddDataProviderForm from './form'
import { Layout, Section } from '../components'

// TODO: REPLACE OLD COMPONENT
import { Accordion, Content, Markdown } from 'components'
import benefitsData from 'data/benefits.yml'
import faqData from 'data/faq.yml'
import { patchStats } from 'components/utils'

const itemToURL = (id) => {
  const url = new URL(window.location)
  url.hash = id ? `#${id}` : ''
  window.history.replaceState({}, null, url.toString())
}

const JoinSectionItem = ({ title, picture, description, additional }) => (
  <div key={title} className={styles.services}>
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
      {additional && (
        <div className={styles.infoWrapper}>
          <span className={styles.info}>{additional.Info}</span>
          <img src={additional.picture} alt={additional.Info} />
        </div>
      )}
    </div>
  </div>
)

const BenefitsPageTemplate = () => {
  const [showAll, setShowAll] = useState(false)

  const toggleShowAll = () => {
    setShowAll((prev) => !prev)
  }

  const itemsToShow = showAll
    ? faqData.sections[0].items
    : faqData.sections[0].items.slice(0, 3)

  return (
    <Layout>
      <Section id="banner" caption="banner" className={styles.sectionBanner}>
        <div className={styles.columnDescription}>
          <div className={styles.navWrapper}>
            {benefitsData.headerLink.map((item) => (
              <a className={styles.linkItem} href={item.href}>
                {item.link}
              </a>
            ))}
          </div>
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
      <Section id="join">
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
      <Section id="how-to-join">
        <h4 className={styles.title}>{benefitsData.HowTo.title}</h4>
        <div className={styles.itemWrapper}>
          {benefitsData.HowTo.items.map((item) => (
            <div className={styles.item}>
              <div>
                <img
                  className={styles.titlePicture}
                  src={item.titlePicture}
                  alt={item.title}
                />
                <span className={styles.joinTitle}>{item.title}</span>
              </div>
              <div>
                <Markdown className={styles.itemDescription}>
                  {item.description}
                </Markdown>
                <img src={item.picture} alt={item.title} />
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section id="join-core" caption="join-core" className={styles.joinCore}>
        <div className={styles.formBlock}>
          <div id="add-new-data-provider" className={styles.addDataProvider}>
            <p className={styles.addDataProviderText}>
              {benefitsData.join.title}
            </p>
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
      <Section id="services">
        <div className={styles.serviceWrapper}>
          {benefitsData.services.map((service) => (
            <div className={styles.service}>
              <div className={styles.headerWrapper}>
                <img
                  className={styles.titlePicture}
                  src={service.picture}
                  alt={service.title}
                />
                <span className={styles.serviceTitle}>{service.title}</span>
              </div>
              <div>
                <Markdown className={styles.serviceDescription}>
                  {service.description}
                </Markdown>
                <Button variant="outlined" href={service.action[0].url}>
                  {service.action[0].title}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section id="join-faq">
        <Content>
          <Accordion onToggle={itemToURL}>
            {itemsToShow.map(({ slug, question, answer }) => (
              <Accordion.Item id={slug} title={question} key={slug}>
                <Markdown>{answer}</Markdown>
              </Accordion.Item>
            ))}
          </Accordion>
          <Button
            variant="outlined"
            onClick={toggleShowAll}
            className={styles.showButton}
          >
            {showAll ? 'See less FAQs' : 'See more FAQs'}
          </Button>
        </Content>
      </Section>
    </Layout>
  )
}
export default BenefitsPageTemplate
