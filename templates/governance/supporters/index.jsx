import React, { useState } from 'react'
import { Button, Table, TextField } from '@oacore/design/lib/elements'

import styles from './supporters.module.scss'
import imagePlaceholder from '../../../public/images/supporters/imagePlaceholder.svg'

import { Page, Markdown } from 'components'
import { Layout, Hero, Section } from 'design-v2/components'

const CardDescription = ({ plan }) => (
  <article className={styles.principlesDescription} key={plan.title}>
    <h6 className={styles.principlesDescriptionTitle}>{plan.title}</h6>
    <Markdown>{plan.content}</Markdown>
  </article>
)

const Card = ({ plan }) => (
  <article className={styles.howItWorksDescription} key={plan.title}>
    <div className={styles.howItWorksImgWrapper}>
      <img src={plan.image} alt="support" />
    </div>
    <div>
      <h6 className={styles.howItWorksDescriptionTitle}>{plan.title}</h6>
      <Markdown>{plan.description}</Markdown>
    </div>
  </article>
)

const GovernanceSupportersPageTemplate = ({ members, page }) => {
  const [searchValue, setSearchValue] = useState('')
  const [displayedItems, setDisplayedItems] = useState(50)
  const maxItems = members.length

  const handleSearch = (event) => {
    const { value } = event.target
    setSearchValue(value)
  }

  const filteredMembers = members.filter((member) =>
    member.organisation_name.toLowerCase().includes(searchValue.toLowerCase())
  )

  const sortedMembers = [...filteredMembers].sort((a, b) =>
    a.organisation_name.localeCompare(b.organisation_name)
  )

  const handleRedirect = (providerId) => {
    const repoId = Array.isArray(providerId) ? providerId[0] : providerId
    if (typeof window !== 'undefined')
      window.location.href = `https://core.ac.uk/data-providers/${repoId}`
  }

  const getLink = (repoId) => {
    if (Array.isArray(repoId)) {
      // eslint-disable-next-line no-param-reassign
      repoId = repoId.find((id) =>
        fetch(`https://api.core.ac.uk/data-providers/${id}/logo`).then(() => id)
      )
    }

    return (
      <img
        className={styles.repositoryLogo}
        src={`https://api.core.ac.uk/data-providers/${repoId}/logo`}
        onError={(e) => {
          e.target.src = imagePlaceholder
        }}
        alt="logo"
      />
    )
  }

  return (
    <Page title={page.title} description={page.tagline}>
      <Layout className={styles.container}>
        <div className={styles.navWrapper}>
          {page.headerLink.map((item) => (
            <a className={styles.linkItem} href={item.href}>
              {item.link}
            </a>
          ))}
        </div>
        <Hero
          id={page.header.id}
          image={page.header.image}
          title={page.title}
          description={page.description}
          caption={page.tagline}
          actions={page.actions}
          reverse
          spacing
        />
        <Section id="our-principles" className={styles.ourPrinciples}>
          <h4>{page.ourPrinciples.title}</h4>
          <div className={styles.principlesWrapper}>
            {page.ourPrinciples.cardsDescription.map((plan) => (
              <CardDescription key={plan.title} plan={plan} />
            ))}
          </div>
        </Section>
        <Section id="principles" className={styles.principles}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              src={page.principles.image}
              alt="support"
            />
          </div>
          <article className={styles.content}>
            <Markdown>{page.principles.description}</Markdown>
          </article>
        </Section>
        <Section id="how-it-works" className={styles.howItWorks}>
          <h4>{page.howItWorks.title}</h4>
          <div className={styles.howItWorksWrapper}>
            {page.howItWorks.services.map((plan) => (
              <Card key={plan.title} plan={plan} />
            ))}
          </div>
        </Section>
        <Section id={page.supporters.id} className={styles.supporters}>
          <h3>{page.supporters.title}</h3>
          <form>
            <TextField
              className={styles.search}
              value={searchValue}
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
              {sortedMembers.slice(0, displayedItems).map((member) => (
                <Table.Row
                  className={styles.tableRow}
                  key={member.organisation_id}
                >
                  <div className={styles.organisationWrapper}>
                    <div className={styles.logoWrapper}>
                      {getLink(member.repo_id)}
                    </div>
                    <Table.Cell onClick={() => handleRedirect(member.repo_id)}>
                      {member.organisation_name}
                    </Table.Cell>
                  </div>
                  <Table.Cell>{member.country}</Table.Cell>
                </Table.Row>
              ))}
              {filteredMembers.length === 0 && (
                <Table.Row>
                  <Table.Cell colSpan={2}>
                    No results. Please update your query
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
            <Table.Footer>
              <Table.Row className={styles.paginationRow}>
                <Table.Cell colSpan={2}>
                  <p className={styles.paginationText}>
                    Showing 1 - {Math.min(displayedItems, maxItems)}
                  </p>
                  <Button
                    onClick={() =>
                      setDisplayedItems((prevCount) => prevCount + 10)
                    }
                    variant="outlined"
                    disabled={displayedItems >= maxItems}
                  >
                    Show More
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Section>
      </Layout>
    </Page>
  )
}

export default GovernanceSupportersPageTemplate
