import React from 'react'
import { Table } from 'reactstrap'
import { Article, Content, Section, Markdown } from 'components'
import { CookiesForm } from 'components/cookies'

import pageContext from 'data/cookies.yml'
import { getCookiesContext, handleCookiesUpdate } from './_cookies'

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
  <Article className="cookies-page" nav tag="main">
    <h1>{pageContext.title}</h1>

    <Section id="cookie-page" caption="Your cookie settings">
      <Content className="cookies-page-form">
        <CookiesForm
          id="cookies-page-form"
          title={pageContext.settings.title}
          submitCaption={pageContext.settings.saveCaption}
          items={getCookiesContext()}
          onSubmit={handleCookiesUpdate}
        />
      </Content>
    </Section>

    <Section id="cookies-policy" caption={pageContext.cookiesPolicy.title}>
      <h2>{pageContext.cookiesPolicy.title}</h2>
      <Content>
        <Markdown>{pageContext.cookiesPolicy.content}</Markdown>
      </Content>
      {pageContext.cookiesPolicy.sections.map(section => (
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
  </Article>
)

export default CookiesPage
