import React from 'react'
import { Table } from 'reactstrap'
import { Article, Content, Section, Markdown, CookiesForm } from 'components'

import pageContext, { cookies as cookiesContext } from 'data/cookies.yml'

import { cookies } from '../services'

export const isCookiesAccepted = () => cookies.get('essential', null) !== null

export const getCookiesContext = () =>
  Object.entries(cookies.get()).reduce((cookieItems, [key, value]) => {
    cookieItems[key] = {
      ...cookiesContext[key],
      value,
    }
    return cookieItems
  }, {})

export const handleCookiesUpdate = event => {
  event.preventDefault()

  const cookieItems = getCookiesContext()
  const cookiesUpdate = new FormData(event.target)
  Object.entries(cookieItems).forEach(
    ([cookieName, { default: defaultValue }]) => {
      let value = typeof defaultValue == 'undefined' ? false : defaultValue
      if (cookiesUpdate.has(cookieName))
        value = cookiesUpdate.get(cookieName) === 'on'

      cookies.set(cookieName, value)
    }
  )

  window.location.reload()
}

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
