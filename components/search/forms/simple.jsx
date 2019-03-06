import React from 'react'
import { Button, InputGroup, InputGroupAddon, Input } from 'reactstrap'

const SearchField = ({ size = '', ...fieldProps }) => (
  <InputGroup size={size}>
    <Input type="search" {...fieldProps} />
    <InputGroupAddon addonType="append">
      <Button color="primary">Search</Button>
    </InputGroupAddon>
  </InputGroup>
)

const SearchForm = ({ action, method, onSubmit, ...fieldProps }) => (
  <form action={action} method={method} onSubmit={onSubmit}>
    <SearchField size="lg" {...fieldProps} />
  </form>
)

export default SearchForm
