'use client'

import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Image from 'next/image'

import Header from '@components/Header/Header'
import { Layout, Section } from '@components/layout'
import type { AdvisoryMember, AdvisoryPageData } from '@features/governance/types'

import styles from './styles.module.css'

type AdvisoryPageProps = {
  data: AdvisoryPageData
}

const joinClasses = (...classes: Array<string | false | undefined>): string =>
  classes.filter(Boolean).join(' ')

const AdvisoryPage = ({ data }: AdvisoryPageProps) => {
  const header = data.header?.header
  const table = data.advisory?.table
  const members = table?.data ?? []

  const columns: ColumnsType<AdvisoryMember> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Title / Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Organisation name',
      key: 'organisation',
      render: (_, member) => (
        <div className={styles.organisationWrapper}>
          {member.image ? (
            <Image
              height={42}
              width={42}
              src={member.image}
              alt="logo"
              className={styles.logoWrapper}  />
          ) : null}
          <span>{member.organisation}</span>
        </div>
      ),
    },
    {
      title: <span className={styles.accentTitle}>Country</span>,
      dataIndex: 'country',
      key: 'country',
      render: (country: string) => <span className={styles.accentTitle}>{country}</span>,
    },
    {
      title: 'Advisory Contribution',
      dataIndex: 'contribution',
      key: 'contribution',
    },
  ]

  return (
    <Layout>
      {header ? (
        <Header
          borderBottom
          description={header.description}
          id={header.id}
          image={header.image}
          logoAlt={header.title}
          title={header.title}
        />
      ) : null}

      <Section className={styles.supporters}>
        {table?.title ? <h3 className={styles.accentTitle}>{table.title}</h3> : null}
        <Table<AdvisoryMember>
          className={joinClasses(styles.dataTable, styles.advisoryTable)}
          columns={columns}
          dataSource={members.map((member) => ({
            ...member,
            key: member.name,
          }))}
          pagination={false}
          rowHoverable={false}
          scroll={{ x: true }}
        />
      </Section>
    </Layout>
  )
}

export default AdvisoryPage
