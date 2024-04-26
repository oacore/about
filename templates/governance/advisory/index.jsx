import React from 'react'
import { Table } from '@oacore/design/lib/elements'

import styles from './advisory.module.scss'

import { Page } from 'components'
import { Hero, Layout, Section } from 'design-v2/components'

const Advisory = ({ meta, advisory }) => (
  <Page>
    <Layout title={meta.title} description={meta.tagline}>
      <Hero
        image={advisory.header.image}
        title={meta.title}
        description={advisory.header.description}
      />
      <Section className={styles.supporters}>
        <h3>{advisory.table.title}</h3>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Organisation name</Table.HeadCell>
              <Table.HeadCell>Country</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {advisory.table.data.map((member) => (
              <Table.Row key={member.name}>
                <Table.Cell>{member.name}</Table.Cell>
                <div className={styles.organisationWrapper}>
                  <img
                    className={styles.logoWrapper}
                    src={member.image}
                    alt="member"
                  />
                  <Table.Cell>{member.organisation}</Table.Cell>
                </div>
                <Table.Cell>{member.country}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Section>
    </Layout>
  </Page>
)

export default Advisory
