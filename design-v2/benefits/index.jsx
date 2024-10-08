import React, { useEffect, useState } from 'react'
import { Button } from '@oacore/design/lib/elements'
import { useRouter } from 'next/router'

import styles from './styles.module.scss'
// eslint-disable-next-line import/order
import { Layout, Section } from '../components'

// TODO: REPLACE OLD COMPONENT
import JoinForm from './joinForm'
import GratitudeModal from './GratitudeModal'
// TODO: REPLACE OLD COMPONENT
import BenefitsForm from './benefitsForm'

import { Accordion, Content, Markdown } from 'components'
import benefitsData from 'data/benefits.yml'
import { patchStats } from 'components/utils'

const itemToURL = (id) => {
  const url = new URL(window.location)
  url.hash = id ? `#${id}` : ''
  window.history.replaceState({}, null, url.toString())
}

const JoinSectionItem = ({ title, picture, description, additional }) => {
  const navigateToPage = () => {
    window.location = `faq/${additional.href}`
  }
  return (
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
            <Button onClick={navigateToPage}>
              <img src={additional.picture} alt={additional.Info} />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

const BenefitsPageTemplate = ({ data }) => {
  const [showAll, setShowAll] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showGratitudeModal, setGratitudeModal] = useState(false)
  const [modalActive, setModalActive] = useState(false)
  const router = useRouter()

  const toggleShowAll = () => {
    setShowAll((prev) => !prev)
  }

  const toggleModal = () => {
    setModalActive(true)
  }

  useEffect(() => {
    if (router.asPath.includes('#join-core')) toggleModal()
  }, [router.asPath])

  const itemsToShow = showAll
    ? data.faqs.sections[0].items
    : data.faqs.sections[0].items.slice(0, 3)

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
          <>
            <Button
              variant="contained"
              onClick={toggleModal}
              href={`#${benefitsData.banner.actions.links.form.url}`}
              key={benefitsData.banner.actions.links.form.text}
              className={styles.button}
            >
              {benefitsData.banner.actions.links.form.text}
            </Button>
            <Button
              variant="text"
              href={benefitsData.banner.actions.links.Link.url}
              key={benefitsData.banner.actions.links.Link.text}
              className={styles.buttonLink}
            >
              {benefitsData.banner.actions.links.Link.text}
            </Button>
          </>
        </div>
        <div className={styles.sectionService}>
          <div className={styles.sectionItem}>
            <div className={styles.header}>
              <img
                className={styles.titlePicture}
                src={benefitsData.banner.guideline.picture}
                alt={benefitsData.banner.guideline.title}
              />
              <span className={styles.serviceTitle}>
                {benefitsData.banner.guideline.title}
              </span>
            </div>
            <div>
              <Markdown className={styles.serviceDescription}>
                {benefitsData.banner.guideline.description}
              </Markdown>
              <div className={styles.btnPlacement}>
                <Button
                  variant="outlined"
                  href={benefitsData.banner.guideline.action.url}
                  target="_blank"
                >
                  {benefitsData.banner.guideline.action.title}
                </Button>
              </div>
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
        <div className={styles.docsBtn}>
          <Button href={benefitsData?.HowTo.action?.url} variant="contained">
            {benefitsData.HowTo.action.title}
          </Button>
        </div>
      </Section>
      <Section id="join-core" caption="join-core" className={styles.joinCore}>
        <div className={styles.formBlock}>
          <div id="add-new-data-provider" className={styles.addDataProvider}>
            <JoinForm
              visibleModal={showModal}
              setGratitudeModal={setGratitudeModal}
              closeModal={() => setShowModal(false)}
            />
            <GratitudeModal
              showGratitudeModal={showGratitudeModal}
              setGratitudeModal={setGratitudeModal}
            />
            <h5>{benefitsData.join.title}</h5>
            <Markdown className={styles.benefitsDescription}>
              {benefitsData.join.description}
            </Markdown>
            <Button
              className={styles.benefitsJoin}
              variant="contained"
              tag="a"
              onClick={toggleModal}
            >
              {benefitsData.join.action}
            </Button>
            {/* <AddDataProviderForm /> */}
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
      {modalActive && <BenefitsForm setModalActive={setModalActive} />}
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
