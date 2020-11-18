import React from 'react'
import { Table } from 'reactstrap'

import { useCookieItems, useCookieHandler } from '../components/cookies/hooks'

import { Page, Content, Section, Markdown, CookiesForm } from 'components'
import pageContext from 'data/cookies.yml'

const CookiesTable = ({ caption, items }) => (
  <Section size="sm">
    <h4>{caption}</h4>
    <Table>
      <tr>
        <th>{pageContext.cookieListCaptions.name}</th>
        <th>{pageContext.cookieListCaptions.purpose}</th>
        <th>{pageContext.cookieListCaptions.expires}</th>
      </tr>
      {items.map(({ name, purpose, expires }) => (
        <tr>
          <td>
            <code>{name}</code>
          </td>
          <td>{purpose}</td>
          <td className="text-right">{expires}</td>
        </tr>
      ))}
    </Table>
  </Section>
)

const CookiesPage = () => (
  <Page
    title={pageContext.title}
    description={pageContext.description}
    keywords={pageContext.keywords}
    className="cookies-page"
    nav
  >
    <h1>{pageContext.title}</h1>

    <Section id="cookie-page" caption="Your cookie settings">
      <Content className="cookies-page-form">
        <CookiesForm
          id="cookies-page-form"
          title={pageContext.settings.title}
          items={useCookieItems()}
          itemDescriptionTitle={pageContext.settings.explanationCaption}
          submitCaption={pageContext.settings.saveCaption}
          onSubmit={useCookieHandler()}
        />
      </Content>
    </Section>

    <Section id="cookies-policy" caption={pageContext.cookiesPolicy.title}>
      <h2>{pageContext.cookiesPolicy.title}</h2>
      <Content>
        <Markdown>{pageContext.cookiesPolicy.content}</Markdown>
      </Content>
      {pageContext.cookiesPolicy.sections.map((section) => (
        <Section>
          <h3>{section.title}</h3>
          <Content>
            <Markdown>{section.content}</Markdown>
          </Content>
          <CookiesTable caption={section.listTitle} items={section.list} />
        </Section>
      ))}
    </Section>

    <Section id="privacy-notice" caption="Privacy notice">
      <h2>{pageContext.privacyNotice.title}</h2>
      <Content>
        <Markdown>{pageContext.privacyNotice.content}</Markdown>
      </Content>
    </Section>
  </Page>
)

export default CookiesPage
