import React from 'react'
import { Button, Icon, Table, TextField } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'

import styles from './supporters.module.scss'
import useTable from './hooks/useTable'
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

const CommunitySupportersPageTemplate = ({ members, page }) => {
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

  const handleRedirect = (providerId) => {
    const repoId = Array.isArray(providerId) ? providerId[0] : providerId
    if (typeof window !== 'undefined')
      window.location.href = `https://core.ac.uk/data-providers/${repoId}`
  }

  return (
    <Page title={page.title} description={page.tagline}>
      <Layout className={styles.container}>
        <Hero
          id={page.header.id}
          image={page.header.image}
          title={page.title}
          description={page.description}
          caption={page.tagline}
          actions={page.actions}
          reverse
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
                  <div className={styles.organisationWrapper}>
                    <div className={styles.logoWrapper}>
                      <img
                        className={styles.repositoryLogo}
                        src={`https://api.core.ac.uk/data-providers/${member.repo_id}/logo`}
                        onError={(e) => {
                          e.target.src = imagePlaceholder
                        }}
                        alt="logo"
                      />
                    </div>
                    <Table.Cell onClick={() => handleRedirect(member.repo_id)}>
                      {member.organisation_name}
                    </Table.Cell>
                  </div>
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

export default CommunitySupportersPageTemplate
