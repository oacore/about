import retrieveContent from 'content'

const ASSETS_BASE_URL = 'https://oacore.github.io/content/'

export const setAssetsUrl = (object) => {
  Object.entries(object).forEach(([key, value]) => {
    if (typeof value === 'string' && value.includes('/images'))
      object[key] = ASSETS_BASE_URL + value
    else if (typeof value === 'object') setAssetsUrl(value) // Recursively process nested objects
  })
}

export const getSections = async (contentType, { ref } = {}) => {
  const page = await retrieveContent(contentType, {
    ref,
    transform: 'object',
  })

  setAssetsUrl(page)

  return page
}

export const membershipSlugs = ['supporting', 'sustaining']

export const getMembershipSections = async ({ ref } = {}) => {
  const page = await getSections('membership', { ref })
  const sponsorship = await getSections('sponsorship', { ref })

  return { page, sponsorship }
}
