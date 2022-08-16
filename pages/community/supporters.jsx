import React from 'react'
import { Button, Icon, Table, TextField } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'

import styles from './community.module.scss'
import useTable from './hooks/useTable'

import { countries } from 'data/countries.yml'
import page from 'data/community/supporters.yml'
import { Page, Markdown } from 'components'
import { Layout, Hero, Section } from 'design-v2/components'
import apiRequest from 'api'

const CommunitySupportersPage = ({ members }) => {
  const {
    handlePaginate,
    handleSearch,
    inputValue,
    itemsList,
    isNoResults,
    pagesCount,
    activePage,
  } = useTable({ initialData: members })

  const isPrevButtonDisabled = activePage === 1
  const isNextButtonDisabled = pagesCount === activePage

  return (
    <Page title={page.title} description={page.tagline}>
      <Layout className={styles.container}>
        <Hero
          id={page.header.id}
          image={page.header.image}
          title={page.title}
          caption={page.tagline}
        />
        <Section className={styles.main} useFullPageWidth id={page.main.id}>
          <Markdown>{page.main.text}</Markdown>
          <Button href={page.main.action.url} variant="contained">
            {page.main.action.caption}
          </Button>
        </Section>
        <Section id={page.supporters.id} className={styles.supporters}>
          <h3>{page.supporters.title}</h3>
          <form>
            <TextField
              className={styles.search}
              value={inputValue}
              onChange={handleSearch}
              id="search"
              type="search"
              name="institution"
              label="Find Organisation"
              placeholder="e.g Open University"
            />
          </form>
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.HeadCell>Organisation name</Table.HeadCell>
                <Table.HeadCell>Country</Table.HeadCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {itemsList.map((member) => (
                <Table.Row key={member.organisation_id}>
                  <Table.Cell>{member.organisation_name}</Table.Cell>
                  <Table.Cell>{member.country}</Table.Cell>
                </Table.Row>
              ))}
              {isNoResults && (
                <Table.Row>
                  <Table.Cell colSpan={12}>
                    No results. Please update your query
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
            {pagesCount !== 0 && (
              <Table.Footer>
                <Table.Row className={styles.row}>
                  <Table.Cell colSpan={1000}>
                    <div className={styles.pagination}>
                      <Button
                        disabled={isPrevButtonDisabled}
                        onClick={() => handlePaginate('prev')}
                      >
                        <Icon
                          src="#chevron-left"
                          className={classNames.use(styles.icon, {
                            [styles.iconDisabled]: isPrevButtonDisabled,
                          })}
                        />
                      </Button>
                      <p>{activePage}</p>
                      <Button
                        disabled={isNextButtonDisabled}
                        onClick={() => handlePaginate('next')}
                      >
                        <Icon
                          src="#chevron-right"
                          className={classNames.use(styles.icon, {
                            [styles.iconDisabled]: isNextButtonDisabled,
                          })}
                        />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Footer>
            )}
          </Table>
        </Section>
      </Layout>
    </Page>
  )
}

export async function getStaticProps() {
  const { data } = await apiRequest('/members')
  const members = data.map((item) => {
    if (item.country_code) {
      item.country = countries.find(
        (country) =>
          country.code.toLowerCase() === item.country_code.toLowerCase()
      ).name
    } else item.country = ''

    return item
  })

  return {
    props: {
      members,
    },
  }
}

export default CommunitySupportersPage
