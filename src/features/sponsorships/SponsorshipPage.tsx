'use client'

import { Layout, Section } from '@core/core-ui'
import { ConfigProvider, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Image from 'next/image'

import ContactSection from '@components/ContactSection'
import Header from '@components/Header/Header'
import Markdown from '@components/Markdown/Markdown'
import MembershipTable from '@features/membership/MembershipTable'
import type {
  SponsorshipDiscount,
  SponsorshipFeature,
  SponsorshipLogoItem,
  SponsorshipPageData,
} from '@features/sponsorships/types'

import styles from './styles.module.css'

const TABLE_THEME = {
  components: {
    Table: {
      rowHoverBg: 'transparent',
      borderColor: '#bdbdbd',
    },
  },
} as const

type SponsorshipPageProps = {
  data: SponsorshipPageData
  discountNote?: string
}

type FeatureCardProps = {
  feature: SponsorshipFeature
}

const FeatureCard = ({ feature }: FeatureCardProps) => (
  <article className={styles.feature}>
    <h6 className={styles.featureTitle}>{feature.title}</h6>
    <Markdown>{feature.description}</Markdown>
  </article>
)

type SponsorLogoCardProps = {
  item: SponsorshipLogoItem
}

const SponsorLogoCard = ({ item }: SponsorLogoCardProps) => (
  <div
    className={styles.logoItemWrapper}
    style={item.background ? { backgroundColor: item.background } : undefined}
  >
    {item.label ? <div className={styles.logoLabel}>{item.label}</div> : null}
    <div className={styles.logoItem}>
      <Image
        alt={item.alt ?? item.label ?? 'Sponsor logo'}
        className={styles.logoImage}
        height={80}
        src={item.img}
        unoptimized
        width={200}
      />
    </div>
  </div>
)

type DiscountTableProps = {
  discount: SponsorshipDiscount
}

const DiscountTable = ({ discount }: DiscountTableProps) => {
  const columns: ColumnsType<SponsorshipDiscount['table']['rows'][number]> = [
    {
      title: discount.table.headers[0]?.name ?? 'Period',
      dataIndex: 'period',
      key: 'period',
      align: 'center',
    },
    {
      title: discount.table.headers[1]?.name ?? 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      align: 'center',
    },
  ]

  return (
    <>
      <div className={styles.tableCaption}>{discount.title}</div>
      <Table
        bordered
        className={styles.discountTable}
        columns={columns}
        dataSource={discount.table.rows.map((row, index) => ({ ...row, key: row.title ?? index }))}
        pagination={false}
      />
    </>
  )
}

const SponsorshipPage = ({ data, discountNote }: SponsorshipPageProps) => {
  const header = data.header?.header
  const logos = data.logos?.logos.items
  const features = data.features?.features
  const howToSponsor = data.howToSponsor?.howToSponsor
  const comparisonTable = data.table?.table.comparisonTable
  const discount = data.discount?.discount
  const contact = data.contact?.contactUs

  return (
    <Layout>
      {header ? (
        <Header
          actions={header.actions}
          description={header.description}
          id={header.id ?? 'metadata'}
          image={header.logo}
          logoAlt={header.title}
          title={header.title}
        />
      ) : null}

      {logos?.length ? (
        <Section className={styles.logoMainWrapper} id="member-logos">
          <h2 className={styles.membersTitle}>Our sponsors</h2>
          <div className={styles.logoCards}>
            {logos.map((item) => (
              <SponsorLogoCard item={item} key={item.alt ?? item.label ?? item.img} />
            ))}
          </div>
        </Section>
      ) : null}

      {features ? (
        <Section className={styles.flush} id="features">
          <h3 className={styles.featuresTitle}>{features.title}</h3>
          <div className={styles.features}>
            {features.services.map((feature) => (
              <FeatureCard feature={feature} key={feature.title} />
            ))}
          </div>
        </Section>
      ) : null}

      {howToSponsor ? (
        <Section className={styles.flush} id="how-to-sponsor">
          <div className={styles.howToSponsor}>
            {howToSponsor.image ? (
              <div className={styles.imageWrapper}>
                <Image
                  alt={howToSponsor.title}
                  className={styles.sectionImage}
                  height={330}
                  src={howToSponsor.image}
                  unoptimized
                  width={360}
                />
              </div>
            ) : null}
            <article className={styles.content}>
              <h3 className={styles.sectionTitle}>{howToSponsor.title}</h3>
              <Markdown>{howToSponsor.description}</Markdown>
            </article>
          </div>
          {howToSponsor.types?.length ? (
            <ul className={styles.itemGroup}>
              {howToSponsor.types.map((type) => (
                <li className={styles.groupItem} key={type.title}>
                  {type.title}
                </li>
              ))}
            </ul>
          ) : null}
        </Section>
      ) : null}

      <ConfigProvider theme={TABLE_THEME}>
        {comparisonTable ? (
          <Section className={styles.flush} id="comparison-table">
            <MembershipTable
              className={styles.table}
              headerAlignment
              textData={comparisonTable}
              type="details"
            />
            {comparisonTable.warning ? (
              <p className={styles.warning}>{comparisonTable.warning}</p>
            ) : null}
          </Section>
        ) : null}

        {discount ? (
          <Section className={styles.discountSection} id="discount">
            <DiscountTable discount={discount} />
            {discountNote ? (
              <Markdown className={styles.feeSectionNoteSecond}>{discountNote}</Markdown>
            ) : null}
          </Section>
        ) : null}
      </ConfigProvider>

      {contact ? (
        <ContactSection
          action={contact.action}
          className={styles.flush}
          description={contact.description}
          id="contact-us"
          image={contact.image}
          title={contact.title}
        />
      ) : null}
    </Layout>
  )
}

export default SponsorshipPage
