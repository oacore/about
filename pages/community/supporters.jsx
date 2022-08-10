import React from 'react'
import { Button } from '@oacore/design/lib/elements'

import styles from './community.module.scss'

import page from 'data/community/supporters.yml'
import { Page, Markdown } from 'components'
import { Layout, Hero, Section } from 'design-v2/components'

const CommunitySupportersPage = () => (
  // const [inputValue, setInputValue] = useState('')
  // const [membersList, setMembersList] = useState(members)
  // const [isNoResults, setIsNoResults] = useState(false)

  // const handleChange = (e) => {
  //   const { value } = e.target
  //   setInputValue(value)
  //   const founded = members.filter((member) => member.name.includes(value))
  //   if (founded.length === 0) setIsNoResults(true)
  //   else setIsNoResults(false)

  //   setMembersList(founded)
  // }

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
        <p>Coming soon</p>
        {/* <form>
          <TextField
            className={styles.search}
            value={inputValue}
            onChange={handleChange}
            id="search"
            type="search"
            name="institution"
            label="Find Institution"
            placeholder="e.g Open University"
          />
        </form> */}
        {/* <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Institution</Table.HeadCell>
              <Table.HeadCell>Country</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {membersList.map((member) => (
              <Table.Row key={member.id}>
                <Table.Cell>{member.inst}</Table.Cell>
                <Table.Cell>{member.country}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          {isNoResults && (
            <Table.Footer>
              <Table.Row>
                <Table.Cell colSpan={12}>
                  No results. Please update your query
                </Table.Cell>
              </Table.Row>
            </Table.Footer>
          )}
        </Table> */}
      </Section>
    </Layout>
  </Page>
)

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const { data } = await apiRequest('/members')
//   const members = data.map((item) => ({
//     ...item,
//     countryCode: 'gb',
//     inst: 'Open',
//     country: countries.find((country) => country.code === 'GB').name,
//   }))

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       members,
//     },
//   }
// }

export default CommunitySupportersPage
