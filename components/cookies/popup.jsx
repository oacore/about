import React from 'react'
import { Button } from '../elements'
import CookiesForm from './form'

const CookiesPopup = ({
  submitCaption = 'Save & Close',
  more = { title: 'Read more', url: '/cookies' },
  ...formProps
}) => (
  <CookiesForm
    className="cookies-popup"
    id="cookies-popup-form"
    submitCaption={submitCaption}
    optionalActions={
      <Button color="link" href={more.url}>
        {more.title}
      </Button>
    }
    {...formProps}
  />
)

export default CookiesPopup
