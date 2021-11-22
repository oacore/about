import React, { useState } from 'react'
import { TextField, Button } from '@oacore/design'

import styles from './benefits.module.scss'

import fetchDataProviderAdd from 'api/data-providers'
import { useInput } from 'hooks'
import generateFormMessage from 'templates/data-providers/utils/generate-form-message'

export async function checkDataProviders({ params }) {
  const { uri, setIsDataProviderAddActive, setDataProvidersResponse } = params

  try {
    const result = await fetchDataProviderAdd({ uri })
    // eslint-disable-next-line no-console
    console.log(`fetchDataProviderAdd
    => ${JSON.stringify(result)}`) // Debug
    setIsDataProviderAddActive(true)
    setDataProvidersResponse(result)
  } catch (errorWithDataProvider) {
    return {
      props: {
        error: errorWithDataProvider,
      },
      notFound: true,
    }
  }
  return true
}

const AddDataProviderForm = React.forwardRef(({ onSubmit }, ref) => {
  const [isIsDataProviderAddActive, setIsDataProviderAddActive] =
    useState(false)
  const [dataProvidersResponse, setDataProvidersResponse] = useState([])
  const {
    value: uri,
    element: elemDataProviderUrl,
    bind: bindDataProviderUrl,
  } = useInput('', 'data-provider-url')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (onSubmit) onSubmit(event)
  }

  const message = generateFormMessage({ dataProvidersResponse })

  return (
    <>
      <form ref={ref} onSubmit={handleSubmit}>
        <TextField
          id={elemDataProviderUrl}
          type="url"
          name={elemDataProviderUrl}
          label="Data provider URL"
          placeholder="For example, https://oro.open.ac.uk"
          value={uri}
          helper={isIsDataProviderAddActive && message.helper}
          variant={(isIsDataProviderAddActive && message.variant) || 'normal'}
          statusIcon
          required
          {...bindDataProviderUrl}
        />
        <div className={styles.submitSection}>
          <Button
            className={styles.buttonCustom}
            type="submit"
            variant="contained"
            onClick={() => {
              checkDataProviders({
                params: {
                  uri,
                  setIsDataProviderAddActive,
                  setDataProvidersResponse,
                },
              })
            }}
          >
            Finish
          </Button>
        </div>
      </form>
    </>
  )
})
export default AddDataProviderForm
