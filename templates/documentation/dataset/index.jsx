import React from 'react'
import { Button } from '@oacore/design/lib/elements'

import styles from './styles.module.scss'

import Collapsed from 'components/collapsed'
import { Page, Markdown } from 'components'
import {
  Section,
  Layout,
  DatasetSection,
  DatasetCard,
} from 'design-v2/components'

const HeaderMenu = ({ links }) => {
  const headerHeight = 55
  const collapsedIds = [
    'dataset2017pre',
    'dataset2017',
    'dataset2018',
    'Currentdataset',
  ]

  const handleScroll = (id) => {
    const element = document.getElementById(id)
    if (!element) return

    // If it's a Collapsed section, open it first
    if (collapsedIds.includes(id)) {
      const accordionLink = element.querySelector('a[href*="#"]')
      if (accordionLink && !element.classList.contains('active'))
        accordionLink.click()
    }

    // Scroll with offset
    setTimeout(
      () => {
        const position = element.offsetTop - headerHeight
        window.scrollTo({
          top: position,
          behavior: 'smooth',
        })
      },
      collapsedIds.includes(id) ? 100 : 0
    )
  }

  return (
    <nav className={styles.headerNav}>
      <h5>{links.title}</h5>
      <ul className={styles.headerList}>
        {links.items.map((item) => (
          <li key={item.label} className={styles.headerNavItem}>
            <a
              href={`#${item.link}`}
              onClick={(e) => {
                e.preventDefault()
                handleScroll(item.link)
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const setDatasetAccentColor = (id) => {
  let color = ''

  switch (id) {
    case 'other':
      color = 'green'
      break
    case 'archived':
      color = 'blue'
      break

    default:
      break
  }
  return color
}

const DatasetPageTemplate = ({
  meta,
  header,
  instruction,
  latestInstruction,
  datasetLatest,
  additionalDatasets,
  structures,
}) => (
  <Page title={meta.title} description={meta.tagline}>
    <Layout className={styles.datasetWrapper}>
      <Section id="header">
        <h2>{header.title}</h2>
        <div className={styles.headerContent}>
          <HeaderMenu links={header.links} />
          <img src={header.image} alt={header.title} />
        </div>
        <Markdown className={styles.headerCaption}>{header.caption}</Markdown>
      </Section>
      <DatasetSection
        title={datasetLatest.title}
        id={datasetLatest.id}
        className={styles.dataset}
        accentColor="primary"
      >
        <div className={styles.boxWide}>
          <h5> {datasetLatest.box.title}</h5>
          <img src={datasetLatest.box.icon} alt="icon" />
          <ul className={styles.sizes}>
            {datasetLatest.box.dataSizes.map((size) => (
              <li key={size.count}>
                <span className={styles.count}>{size.count} </span> -{' '}
                {size.dataType}
              </li>
            ))}
          </ul>
          {datasetLatest.box.actions.map((action) => (
            <Button
              key={action.caption}
              variant="contained"
              href={action.url}
              target={action.target}
              className={styles.button}
            >
              {action.caption}
            </Button>
          ))}
          <Markdown>{datasetLatest.box.text}</Markdown>
        </div>
      </DatasetSection>
      <Section id={latestInstruction.id} className={styles.instruction}>
        <h4>{latestInstruction.title}</h4>
        <div className={styles.instructionContent}>
          <div>
            <Markdown>{latestInstruction.recommended}</Markdown>
          </div>
          <div className={styles.instructionReminder}>
            <h5>{latestInstruction.reminder.title}</h5>
            <Markdown className={styles.instructionReminderText}>
              {latestInstruction.reminder.description}
            </Markdown>
          </div>
        </div>
      </Section>
      <DatasetSection
        key={additionalDatasets.items[1].id}
        title={additionalDatasets.items[1].title}
        id={additionalDatasets.items[1].id}
        accentColor={setDatasetAccentColor(additionalDatasets.items[1].id)}
      >
        {additionalDatasets.items[1].boxes.map((box) => (
          <DatasetCard
            key={`${box.title}-${box.caption}`}
            {...box}
            accentColor={setDatasetAccentColor(additionalDatasets.items[1].id)}
          />
        ))}
      </DatasetSection>
      <Section id={instruction.id} className={styles.instruction}>
        <h4>{instruction.title}</h4>
        <div className={styles.instructionContent}>
          <div>
            <Markdown>{instruction.recommended}</Markdown>
          </div>
          <div className={styles.instructionReminder}>
            <h5>{instruction.reminder.title}</h5>
            <Markdown className={styles.instructionReminderText}>
              {instruction.reminder.description}
            </Markdown>
          </div>
        </div>
      </Section>
      <Section id="structures">
        <h4>{structures.title}</h4>
        {structures.items.map((structure) => (
          <Collapsed
            key={structure.id}
            id={structure.id}
            title={structure.title}
          >
            <Markdown className={styles.structureContent}>
              {structure.text}
            </Markdown>
            <Markdown className={styles.structureFields}>
              {structure.fields}
            </Markdown>
          </Collapsed>
        ))}
      </Section>
      <DatasetSection
        key={additionalDatasets.items[0].id}
        title={additionalDatasets.items[0].title}
        id={additionalDatasets.items[0].id}
        accentColor={setDatasetAccentColor(additionalDatasets.items[0].id)}
      >
        {additionalDatasets.items[0].boxes.map((box) => (
          <DatasetCard
            key={`${box.title}-${box.caption}`}
            {...box}
            accentColor={setDatasetAccentColor(additionalDatasets.items[0].id)}
          />
        ))}
      </DatasetSection>
    </Layout>
  </Page>
)

export default DatasetPageTemplate
