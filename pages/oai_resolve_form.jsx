/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { TextField, Button, Link, Select } from '@oacore/design'
import { useRouter } from 'next/router'

import styles from './oai_resolve.module.scss'

import { useInput } from 'hooks'

const validateIdentifier = (string) => {
  const regexp = RegExp('(^oai:).+', 'g')

  if (regexp.exec('oai_resolver') !== null) return true

  return regexp.exec(string) !== null
}

const OAIResolveForm = React.forwardRef(({ onSubmit }, ref) => {
  const router = useRouter()
  const identifier = router.route.substring(1)

  const {
    value: OAIidentifier,
    element: elementOAIidentifier,
    bind: bindOAIidentifier,
    onInput: onInputIidentifier,
  } = useInput(
    validateIdentifier(identifier) ? identifier : '',
    'oai-identifier'
  )
  const [value, setValue] = useState('')

  const handleInput = (e) => {
    setValue(e.value)
  }

  const [isOAInotValid, setOAInotValid] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    const valueInput = event.target[1].value

    event.target.action = `https://api.core.ac.uk/oai/${valueInput}`
    if (onSubmit) onSubmit(event)

    if (validateIdentifier(valueInput)) {
      setOAInotValid(false)
      event.currentTarget.submit()
    } else setOAInotValid(true)
  }

  const msgErrorRoute = (
    <>
      The OAI identifier is not found.{' '}
      <Link href="https://core.ac.uk/faq#oai-structure" target="_blank">
        Here
      </Link>{' '}
      you can check all requirements.
    </>
  )

  const msgErrorFormat = (
    <>
      The OAI format is wrong.{' '}
      <Link href="https://core.ac.uk/faq#oai-structure" target="_blank">
        Here
      </Link>{' '}
      you can check all requirements.
    </>
  )

  const msgHelper = (
    <>
      Example:{' '}
      <Link
        href="https://core.ac.uk/display/12820815?recSetID="
        target="_blank"
        className={styles.helperLink}
      >
        oai:researchonline.rca.ac.uk:1035
      </Link>
    </>
  )

  return (
    <>
      <form ref={ref} onSubmit={handleSubmit}>
        <Select
          id="elementOAIidentifier"
          value={OAIidentifier}
          variant={isOAInotValid ? 'normal' : 'pure'}
          prependIcon="#magnify"
          placeholder="Put OAI of the article"
          changeOnBlur={false}
          onInput={handleInput}
          className={styles.select}
          label=""
          {...bindOAIidentifier}
        />
        <span className={styles.helper}>
          {isOAInotValid ? msgErrorFormat : msgHelper}
        </span>

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
