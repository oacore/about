import React, { useState } from 'react'
import { Button } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'

import styles from './styles.module.scss'
import DocumentationPageTemplate from '../../templates/documentations'
import { Page } from '../../components'
import DataProviderDocs from '../../templates/documentations/dataProviderDocs'

import text from 'data/membership.yml'
import retrieveContent from 'content'

const ASSETS_BASE_URL = 'https://oacore.github.io/content/'

const setAssetsUrl = (object) =>
  Object.entries(object).forEach(([, value]) => {
    delete value.membership
    if (value.images) {
      Object.entries(value.images).forEach(([, item]) => {
        item.file = ASSETS_BASE_URL + item.file
      })
    }
  })

const getSections = async ({ ref } = {}) => {
  const content = await retrieveContent('docs-membership', {
    ref,
    transform: 'object',
  })

  delete content.headerDashboard
  Object.values(content).forEach((section) => {
    if (section.items) setAssetsUrl(section.items)
  })
  return content
}

const getProviderSections = async ({ ref } = {}) => {
  const content = await retrieveContent('docs-dataProvider', {
    ref,
    transform: 'object',
  })

  Object.values(content).forEach((section) => {
    if (section.items) setAssetsUrl(section.items)
  })
  return content
}

export async function getStaticProps({ previewData }) {
  const ref = previewData?.ref
  const sections = await getSections({ ref })
  const sectionProvider = await getProviderSections({ ref })
  const data = {
    ...sections,
  }
  const dataProvider = {
    ...sectionProvider,
  }

  return {
    props: {
      data,
      dataProvider,
    },
  }
}

const TABS = {
  dataProvider: 'dataProvider',
  membership: 'membership',
}

const DocumentationPage = ({ data, dataProvider }) => {
  const [activeTab, setActiveTab] = useState(TABS.dataProvider)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <Page title={data.meta.title} description={data.meta.description}>
      <div className={styles.tabWrapper}>
        <div className={styles.btnWrapper}>
          <Button
            className={classNames.use(styles.tab, {
              [styles.activeTab]: activeTab === TABS.dataProvider,
            })}
            onClick={() => handleTabChange(TABS.dataProvider)}
          >
            <div>
              <h5 className={styles.tabHeader}>
                {text.documentationSwitcher[0].title}
              </h5>
              <p className={styles.tabDescription}>
                {text.documentationSwitcher[0].description}
              </p>
            </div>
          </Button>
          <Button
            className={classNames.use(styles.tab, {
              [styles.activeTab]: activeTab === TABS.membership,
            })}
            onClick={() => handleTabChange(TABS.membership)}
          >
            <div>
              <h5 className={styles.tabHeader}>
                {text.documentationSwitcher[1].title}
              </h5>
              <p className={styles.tabDescription}>
                {text.documentationSwitcher[1].description}
              </p>
            </div>
          </Button>
        </div>
      </div>
      {activeTab === TABS.dataProvider && (
        <DataProviderDocs {...dataProvider} />
      )}
      {activeTab === TABS.membership && <DocumentationPageTemplate {...data} />}
    </Page>
  )
}

export default DocumentationPage
