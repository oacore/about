import React, { useEffect } from 'react'

import infoIcon from '../../../templates/membership/assets/infoIcon.svg'

import { Page, Markdown } from 'components'
import { getMembershipSections, membershipSlugs } from 'hooks/retriveContent'
import { Layout, MembershipTable, Section } from 'design-v2/components'
import { patchStats } from 'components/utils'
import { observe, useStore } from 'store'
import styles from 'templates/membership/styles.module.scss'

export async function getStaticProps({ params, previewData }) {
  const { slug } = params
  const ref = previewData?.ref
  const { page } = await getMembershipSections({ ref })

  const tableData = page.fee.fee.table[slug]
  const subRows = tableData?.subRows ?? []

  const data = {
    header: {
      title: `Annual membership fees for ${slug} members`,
      planName: slug,
    },
    fee: {
      ...page.fee.fee,
      table: {
        headers: page.fee.fee.table.headers,
        rows: subRows,
      },
      title: page.fee.fee.title,
    },
    planName: slug,
  }

  return {
    props: { data },
  }
}

export async function getStaticPaths() {
  const paths = membershipSlugs.map((slug) => ({
    params: { slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

const AnnualFeesContent = observe(({ data }) => {
  const { membership } = useStore()

  useEffect(() => {
    membership.setData({ planName: data.planName })
  }, [])

  const { warning } = data.fee
  const { subNote } = data.fee

  return (
    <Layout>
      <Section id="annual-fees" className={styles.feeSection}>
        {warning && (
          <div className={styles.feeSectionWarning}>
            <span className={styles.feeSectionWarningIcon} aria-hidden>
              <img src={infoIcon} alt="" />
            </span>
            <Markdown className={styles.feeSectionWarningContent}>
              {warning}
            </Markdown>
          </div>
        )}
        <MembershipTable
          textData={{
            ...data.fee.table,
            title: patchStats(data.fee.title, data),
            caption:
              'Annual membership fees following the expiry of the initial 3-year or 5-year period',
          }}
          type="prices"
          renderSpan={false}
          className={styles.feeSectionTable}
        />
        {subNote && (
          <Markdown className={styles.feeSectionNote}>{subNote}</Markdown>
        )}
      </Section>
    </Layout>
  )
})

export default function AnnualFeesPage({ data }) {
  return (
    <Page
      title={`Annual membership fees - ${data.header.planName}`}
      description={data.header.title}
    >
      <AnnualFeesContent data={data} />
    </Page>
  )
}
