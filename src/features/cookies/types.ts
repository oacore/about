export type CookiesContentItem = {
  id?: string
  name?: string
  default?: boolean
  required?: boolean
  title?: string
  description?: string
}

export type CookiesSettings = {
  title?: string
  popupTitle?: string
  saveCaption?: string
  acceptCaption?: string
  readMoreCaption?: string
  explanationCaption?: string
}

export type CookieListItem = {
  name: string
  purpose?: string
  expires?: string
}

export type CookiesPolicySection = {
  title?: string
  content?: string
  listTitle?: string
  list?: CookieListItem[]
}

export type CookiesPolicy = {
  title?: string
  content?: string
  sections?: CookiesPolicySection[]
}

export type CookiesPrivacyNotice = {
  title?: string
  content?: string
}

export type CookieListCaptions = {
  name?: string
  purpose?: string
  expires?: string
}

/** Shape returned by `getSections('cookies')` after `cookies/cookies.yml` is camelized. */
export type CookiesPageData = {
  title?: string
  description?: string
  descriptionTitle?: string
  cookies?: CookiesContentItem[]
  settings?: CookiesSettings
  cookiesPolicy?: CookiesPolicy
  privacyNotice?: CookiesPrivacyNotice
  cookieListCaptions?: CookieListCaptions
}
