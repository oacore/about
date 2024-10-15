import React, { useState } from 'react'
import { Button, Table, TextField } from '@oacore/design/lib/elements'

import styles from './styles.module.scss'
import imagePlaceholder from '../../public/images/supporters/imagePlaceholder.svg'
import { Section } from '../../design-v2/components'

const MembershipTable = ({ title, members, excludedIds, customSort }) => {
  const [searchValue, setSearchValue] = useState('')
  const [displayedItems, setDisplayedItems] = useState(30)

  const handleSearch = (event) => {
    const { value } = event.target
    setSearchValue(value)
  }

  const filteredMembers = members.filter((member) =>
    member.organisation_name.toLowerCase().includes(searchValue.toLowerCase())
  )

  const sortedMembers = customSort
    ? [...filteredMembers].sort(customSort)
    : [...filteredMembers].sort((a, b) =>
        a.organisation_name.localeCompare(b.organisation_name)
      )

  const renderBillingType = (member) => {
    if (
      excludedIds.includes(member.repo_id) ||
      (Array.isArray(member.repo_id) &&
        member.repo_id.some((id) => excludedIds.includes(id)))
    ) {
      return (
        <a
          target="_blank"
          href="https://sparcopen.org/our-work/us-repository-network/discovery-pilot-project/"
          rel="noreferrer"
        >
          USRN Partner
        </a>
      )
    }

    return (
      <a target="_blank" href="https://core.ac.uk/membership" rel="noreferrer">
        {member.billing_type} Member
      </a>
    )
  }

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
    <Section className={styles.supporters}>
      <h3>{title}</h3>
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
            <Table.HeadCell>Membership status</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {sortedMembers?.slice(0, displayedItems).map((member) => (
            <Table.Row className={styles.tableRow} key={member.organisation_id}>
              <div className={styles.organisationWrapper}>
                <div className={styles.logoWrapper}>
                  {getLink(member.repo_id)}
                </div>
                <Table.Cell onClick={() => handleRedirect(member.repo_id)}>
                  {member.organisation_name}
                </Table.Cell>
              </div>
              <Table.Cell>{member.country}</Table.Cell>
              <Table.Cell className={styles.memberColumn}>
                {renderBillingType(member)}
              </Table.Cell>
            </Table.Row>
          ))}
          {filteredMembers?.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={2}>
                No results. Please update your query
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
        <Table.Footer>
          <Table.Row className={styles.paginationRow}>
            <Table.Cell colSpan={3}>
              <p className={styles.paginationText}>
                Showing 1 - {Math.min(displayedItems, filteredMembers?.length)}
              </p>
              <Button
                onClick={() =>
                  setDisplayedItems((prevCount) =>
                    Math.min(prevCount + 10, filteredMembers?.length)
                  )
                }
                variant="outlined"
                disabled={displayedItems >= filteredMembers?.length}
              >
                Show More
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Section>
  )
}

export default MembershipTable
