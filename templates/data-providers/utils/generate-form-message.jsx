/* eslint-disable prettier/prettier */
import { Link } from '@oacore/design'
import React from 'react'

const searchUrlFor = (id) => `https://core.ac.uk/search?q=repositories.id:${id}`

const HARVESTED_BY_CORE = 'https://core.ac.uk/faq#harvested-by-CORE-snippet'
const SUPPORT_EMAIL_URL = 'mailto:t%68%65t%65am%40core%2e%61c%2eu%6b'
const SUPPORT_EMAIL = decodeURIComponent(
  SUPPORT_EMAIL_URL.slice('mailto:'.length)
)

const generateFormMessage = ({ dataProvidersResponse }) => {
  if (dataProvidersResponse.error && 
    dataProvidersResponse.error.length > 1 && 
    dataProvidersResponse.existingDataProviders && 
    dataProvidersResponse.existingDataProviders.length === 0) {
    // console.log('DataProvider error')  // debug
      
      return {
      helper: (
        <>
          We cannot detect a repository or a journal at this address. Please,
          provide the exact OAI-PMH endpoint. If you are having trouble contact
          us at <Link href={SUPPORT_EMAIL_URL}>{SUPPORT_EMAIL}</Link>.
        </>
      ),
      variant: 'error',
    }
  }

  if (dataProvidersResponse.error && 
    dataProvidersResponse.error.length === 0) {
    // console.log('DataProvider is added') // debug

    return {
      helper: (
        <>
          We found {dataProvidersResponse.name} under the entered address 
          and added it to our data provider collection. 
          As soon as we approve adding, we will start
          harvesting. Join the community and add a{' '}
          <Link href={HARVESTED_BY_CORE} title="Harvested by CORE Logo">
            harvested by CORE
          </Link>{' '}
          badge on your website.
        </>
      ),
      variant: 'success',
    }
  }

  if (dataProvidersResponse.existingDataProviders && 
    dataProvidersResponse.existingDataProviders.length > 1) {
      const row = dataProvidersResponse.existingDataProviders
    // console.log('DataProvider is exist') // debug

    return {
      helper: (
        <>
          <a href={searchUrlFor(row[0].id)}>
            {row[0].name}
          </a>{' '}
          {row.length > 1
            ? `and ${
              row.length - 1
              } more are our data providers`
            : 'is our data provider'}{' '}
          already. If you host multiple repositories or journals on the same
          domain please specify exact OAI-PMH endpoint or contact us at{' '}
          <Link href={SUPPORT_EMAIL_URL}>{SUPPORT_EMAIL}</Link>.
        </>
      ),
      variant: 'error',
    }
  }

  return {
    helper: 'It can be any resource, home page or an OAI-PMH endpoint',
    variant: 'normal',
  }
}

export default generateFormMessage
