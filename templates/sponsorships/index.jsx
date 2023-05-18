import React from 'react'
import { Button } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'

import membershipData from '../../data/membership.yml'
import styles from './styles.module.scss'
import { Markdown } from '../../components'
import stylesMT from '../../design-v2/components/membership-table/styles.module.scss'

import { Layout, MembershipTable, Section } from 'design-v2/components'

const Feature = ({ title, description }) => (
  <div className={styles.feature}>
    <h6 className={styles.featureTitle}>{title}</h6>
    <Markdown>{description}</Markdown>
  </div>
)

const renderHeaders = () => (
  <tr>
    {membershipData.discount.table.headers.map((header) => (
      <th
        key={header.name}
        className={classNames.use(stylesMT.header, stylesMT.boldText500)}
      >
        <Markdown className={stylesMT.headerTitle}>{header.name}</Markdown>
      </th>
    ))}
  </tr>
)

const renderDiscountsRows = () =>
  membershipData.discount.table.rows.map((row) => (
    <tr key={row.title}>
      <td key={row.period} className={stylesMT.cell} role="gridcell">
        {row.period}
      </td>
      <td
        key={row.discount}
        className={classNames.use(stylesMT.cell, stylesMT.boldText700)}
        role="gridcell"
      >
        {row.discount}
      </td>
    </tr>
  ))

const SponsorshipPageTemplate = ({ data }) => (
  <Layout>
    <Section id="metadata" className={styles.header}>
      <div>
        <h2 className={styles.title}>{data.header.title}</h2>
        <Markdown className={styles.description}>
          {data.header.description}
        </Markdown>
        <div className={styles.buttonGroup}>
          {data.header.actions.map((action) => (
            <Button
              href={action.url}
              target={action.target}
              variant={action.variant}
              key={action.caption}
              download={action.download}
            >
              {action.caption}
            </Button>
          ))}
        </div>
      </div>
      <div className={styles.logoContainer}>
        <img src={data.header.logo} alt="logo" />
      </div>
    </Section>
    <Section id="features" className={styles.featuresWrapper}>
      <h3 className={styles.featuresTitle}>{data.features.title}</h3>
      <div className={styles.features}>
        {data.features.services.map((item) => (
          <Feature key={item.title} {...item} />
        ))}
      </div>
    </Section>
    <Section id="how-to-sponsor">
      <div className={styles.howToSponsor}>
        <div className={styles.imageWrapper}>
          <img src={data.howToSponsor.image} alt={data.howToSponsor.title} />
        </div>
        <article className={styles.content}>
          <h3>{data.howToSponsor.title}</h3>
          <Markdown>{data.howToSponsor.description}</Markdown>
        </article>
      </div>
      <div className={styles.itemGroup}>
        {data.howToSponsor.types.map((type) => (
          <div key={type.title} className={styles.groupItem}>
            {type.title}
          </div>
        ))}
      </div>
    </Section>
    <Section id="comparison-table">
      <MembershipTable
        className={styles.table}
        textData={data.comparisonTable}
        type="details"
        headerAlignment
      />
      <span className={styles.warning}>{data.comparisonTable.warning}</span>
    </Section>
    <Section id="discount" className={styles.discountSection}>
      <div className={stylesMT.tableCaption}>
        {membershipData.discount.title}{' '}
      </div>
      <table className={classNames.use(stylesMT.table)} role="grid">
        <thead className={stylesMT.head}>{renderHeaders()}</thead>
        <tbody>{renderDiscountsRows()}</tbody>
      </table>

      <Markdown className={styles.feeSectionNoteSecond}>
        {membershipData.fee.noteSecond}
      </Markdown>
    </Section>
    <Section id="contact-us" className={styles.howToContact}>
      <div>
        <article className={styles.content}>
          <h3>{data.contactUs.title}</h3>
          <div className={styles.contactWrapper}>
            <Markdown>{data.contactUs.description}</Markdown>
            <Button
              className={styles.contactBtn}
              variant="contained"
              href={data.contactUs.action.url}
            >
              {data.contactUs.action.title}
            </Button>
          </div>
        </article>
      </div>
      <div className={styles.imageWrapper}>
        <img src={data.contactUs.image} alt={data.contactUs.title} />
      </div>
    </Section>
  </Layout>
)
export default SponsorshipPageTemplate
