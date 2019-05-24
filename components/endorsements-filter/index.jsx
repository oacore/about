import React from 'react'
import { Button } from 'reactstrap'

const EndorsementsFilter = () => (
  <div className="justify-content-center mx-5 mb-3">
    <span> Filter by: </span>
    <Button outline color="primary" className="m-1">
      all
    </Button>
    <Button outline color="primary" className="m-1">
      academic institutions
    </Button>
    <Button outline color="primary" className="m-1">
      partners
    </Button>
    <Button outline color="primary" className="m-1">
      info
    </Button>
    <Button outline color="primary" className="m-1">
      companies
    </Button>
    <Button outline color="primary" className="m-1">
      other
    </Button>
  </div>
)

export default EndorsementsFilter
