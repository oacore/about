import React from 'react'
import { Table } from '@oacore/design/lib/elements'

import styles from './advisory.module.scss'

import { Page } from 'components'
import { Hero, Layout, Section } from 'design-v2/components'

const Advisory = ({ meta, header, advisory }) => (
  <Page>
    <Layout title={meta.title} description={meta.tagline}>
      <Hero
        image={header.header.image}
        title={header.header.title}
        description={header.header.description}
      />
      <Section className={styles.supporters}>
        <h3 className={styles.accentTitle}>{advisory.table.title}</h3>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Title / Role</Table.HeadCell>
              <Table.HeadCell>Organisation name</Table.HeadCell>
              <Table.HeadCell>
                <span className={styles.accentTitle}>Country</span>
              </Table.HeadCell>
              <Table.HeadCell>Advisory Contribution</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {advisory.table.data.map((member) => (
              <Table.Row key={member.name}>
                <Table.Cell>{member.name}</Table.Cell>
                <Table.Cell>{member.role}</Table.Cell>
                <Table.Cell>
                  <div className={styles.organisationWrapper}>
                    {member.image ? (
                      <img
                        className={styles.logoWrapper}
                        src={member.image}
                        alt=""
                      />
                    ) : null}
                    <span>{member.organisation}</span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span className={styles.accentTitle}>{member.country}</span>
                </Table.Cell>
                <Table.Cell>{member.contribution}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Section>
    </Layout>
  </Page>
)

export default Advisory
