'use client'

import { Layout, PageNav, useCookieHandler, useCookieItems } from '@core/core-ui'
import { Table } from 'antd'
import { useSyncExternalStore } from 'react'
import type { ColumnsType } from 'antd/es/table'

import Markdown from '@components/Markdown/Markdown'

import CookiesForm from './CookiesForm'
import type { CookieListCaptions, CookieListItem, CookiesPageData } from './types'

import styles from './cookies.module.css'

type CookiesPageProps = {
  data: CookiesPageData
}

type CookieTableRow = CookieListItem & {
  key: string
}

const subscribeNoop = () => () => {}

// true only in the browser after hydration; cookies can't be read on the server
const useIsClient = () =>
  useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  )

type CookiesTableProps = {
  caption?: string
  items: CookieListItem[]
  captions?: CookieListCaptions
}

const CookiesTable = ({ caption, items, captions }: CookiesTableProps) => {
  if (!items.length) {
    return null
  }

  const columns: ColumnsType<CookieTableRow> = [
    {
      title: captions?.name ?? 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <code className={styles.cookieName}>{name.replaceAll('_', '_\u200b')}</code>
      ),
      width: '28%',
    },
    {
      title: captions?.purpose ?? 'Purpose',
      dataIndex: 'purpose',
      key: 'purpose',
      render: (purpose?: string) => <Markdown>{purpose}</Markdown>,
    },
    {
      title: captions?.expires ?? 'Expires',
      dataIndex: 'expires',
      key: 'expires',
      align: 'right',
      width: '22%',
    },
  ]

  const rows = items.map((item) => ({
    ...item,
    key: item.name,
  }))

  return (
    <div className={styles.tableBlock}>
      {caption ? <h4 className={styles.tableTitle}>{caption}</h4> : null}
      <Table
        className={styles.cookiesTable}
        columns={columns}
        dataSource={rows}
        pagination={false}
        tableLayout="fixed"
      />
    </div>
  )
}

const CookiesPage = ({ data }: CookiesPageProps) => {
  // Item titles come from the hook ("Essential cookies only", "Analytics allowed"), as on
  // the old site; the content file's `cookies` titles were never shown there.
  const cookieItems = useCookieItems()
  const handleCookieConsent = useCookieHandler()
  const isClient = useIsClient()
  const cookieItemsKey = cookieItems.map(({ name, value }) => `${name}:${value}`).join('|')

  const navLinks = [
    {
      title: data.settings?.title ?? 'Your cookie settings',
      href: 'cookie-page',
    },
    {
      title: data.cookiesPolicy?.title ?? 'How we use cookies',
      href: 'cookies-policy',
    },
    {
      title: data.privacyNotice?.title ?? 'Privacy notice',
      href: 'privacy-notice',
    },
  ]

  return (
    <Layout>
      <h1 className={styles.header}>{data.title}</h1>
      <PageNav ariaLabel="Cookie page sections" links={navLinks} />
      <section className={styles.section} id="cookie-page">
        {/* Rendered only on the client (like the old isMounted guard) and keyed by the saved
            values, so the switches start from the real cookies, not the empty server snapshot. */}
        {isClient ? (
        <CookiesForm
          id="cookies-page-form"
          key={cookieItemsKey}
          itemDescriptionTitle={data.settings?.explanationCaption ?? data.descriptionTitle}
          items={cookieItems}
          onSubmit={handleCookieConsent}
          submitCaption={data.settings?.saveCaption}
          title={data.settings?.title}
        />
        ) : null}
      </section>

      <section className={styles.section} id="cookies-policy">
        <h2 className={styles.sectionTitle}>{data.cookiesPolicy?.title}</h2>
        <Markdown>{data.cookiesPolicy?.content}</Markdown>
        {data.cookiesPolicy?.sections?.map((section) => (
          <div className={styles.policySection} key={section.title}>
            <h3 className={styles.policyTitle}>{section.title}</h3>
            <Markdown>{section.content}</Markdown>
            <CookiesTable
              caption={section.listTitle}
              captions={data.cookieListCaptions}
              items={section.list ?? []}
            />
          </div>
        ))}
      </section>

      <section className={styles.section} id="privacy-notice">
        <h2 className={styles.sectionTitle}>{data.privacyNotice?.title}</h2>
        <Markdown>{data.privacyNotice?.content}</Markdown>
      </section>
    </Layout>
  )
}

export default CookiesPage
