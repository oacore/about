import React from 'react'
import { TextField, Button } from '@oacore/design'

import styles from './oai_resolve.module.scss'

import { useInput } from 'hooks'

const OAIResolveForm = React.forwardRef(({ onSubmit }, ref) => {
  const {
    value: OAIidentifier,
    element: elementOAIidentifier,
    bind: bindOAIidentifier,
  } = useInput('', 'oai-identifier')

  const handleSubmit = (event) => {
    const url = `https://api.core.ac.uk/oai/${event.target[0].value}`
    event.target.action = url
    if (onSubmit) onSubmit(event)
  }

  return (
    <>
      <form ref={ref} onSubmit={handleSubmit}>
        <TextField
          id={elementOAIidentifier}
          name={elementOAIidentifier}
          label="Put OAI of the article"
          // placeholder="For example, oai:oro.open.ac.uk:33975"
          value={OAIidentifier}
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
