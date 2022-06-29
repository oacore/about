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

const HeaderMenu = ({ links }) => (
  <nav className={styles.headerNav}>
    <h5>{links.title}</h5>
    <ul className={styles.headerList}>
      {links.items.map((item) => (
        <li key={item.label} className={styles.headerNavItem}>
          <a href={`#${item.link}`}>{item.label}</a>
        </li>
      ))}
    </ul>
  </nav>
)

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
  datasetLatest,
  additionalDatasets,
  structures,
}) => (
  <Page title={meta.title} description={meta.tagline}>
    <Layout>
      <Section id="header">
        <h2>{header.title}</h2>
        <div className={styles.headerContent}>
          <HeaderMenu links={header.links} />
          <img src={header.image} alt={header.title} />
        </div>
        <Markdown className={styles.headerCaption}>{header.caption}</Markdown>
      </Section>
      <Section
        id={instruction.id}
        useFullPageWidth
        className={styles.instruction}
      >
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
              className={styles.button}
            >
              {action.caption}
            </Button>
          ))}
          <Markdown>{datasetLatest.box.text}</Markdown>
        </div>
      </DatasetSection>
      {additionalDatasets.items.map((dataset) => (
        <DatasetSection
          key={dataset.id}
          title={dataset.title}
          id={dataset.id}
          accentColor={setDatasetAccentColor(dataset.id)}
        >
          {dataset.boxes.map((box) => (
            <DatasetCard
              key={`${box.title}-${box.caption}`}
              {...box}
              accentColor={setDatasetAccentColor(dataset.id)}
            />
          ))}
        </DatasetSection>
      ))}
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
            <Markdown>{structure.fields}</Markdown>
          </Collapsed>
        ))}
      </Section>
    </Layout>
  </Page>
)

export default DatasetPageTemplate
