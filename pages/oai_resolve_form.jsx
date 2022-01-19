import React, { useState } from 'react'
import { TextField, Button, Link } from '@oacore/design'
import { useRouter } from 'next/router'

import styles from './oai_resolve.module.scss'

import { useInput } from 'hooks'

const OAIResolveForm = React.forwardRef(({ onSubmit }, ref) => {
  const {
    value: OAIidentifier,
    element: elementOAIidentifier,
    bind: bindOAIidentifier,
  } = useInput('', 'oai-identifier')

  const [isOAInotValid, setOAInotValid] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const url = `https://api.core.ac.uk/oai/${event.target[0].value}`

    const regexp = RegExp('(^oai:).+', 'g')
    const matches = regexp.exec(bindOAIidentifier.value) !== null

    event.target.action = url
    if (onSubmit) onSubmit(event)

    if (matches) event.currentTarget.submit()
    else setOAInotValid(true)
  }

  const errorMassageRoute = (
    <>
      The OAI identifier is not found.{' '}
      <Link href="https://core.ac.uk/faq#oai-structure" target="_blank">
        Here
      </Link>{' '}
      you can check all requirements.
    </>
  )

  const errorMassageFormat = (
    <>
      The OAI format is wrong.{' '}
      <Link href="https://core.ac.uk/faq#oai-structure" target="_blank">
        Here
      </Link>{' '}
      you can check all requirements.
    </>
  )

  return (
    <>
      <form ref={ref} onSubmit={handleSubmit}>
        <TextField
          id={elementOAIidentifier}
          name={elementOAIidentifier}
          label="Put OAI of the article"
          // placeholder="For example, oai:oro.open.ac.uk:33975"
          value={OAIidentifier}
          helper={
            (useRouter().query.error === '404' && errorMassageRoute) ||
            (isOAInotValid && errorMassageFormat)
          }
          // statusIcon
          required
          {...bindOAIidentifier}
        />
        <div className={styles.submitSection}>
          <Button
            className={styles.buttonCustom}
            type="submit"
            variant="contained"
          >
            Resolve
          </Button>
        </div>
      </form>
    </>
  )
})
export default OAIResolveForm
