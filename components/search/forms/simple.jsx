import React from 'react'
import { Button, InputGroup, InputGroupAddon, Input } from 'reactstrap'


const SearchField = ({ placeholder, size = "" }) => (
  <InputGroup size={size}>
    <Input placeholder={placeholder} />
    <InputGroupAddon addonType="append">
      <Button color="primary">Search</Button>
    </InputGroupAddon>
  </InputGroup>
)

const SearchForm = ({ action, method, onSubmit }) => (
  <form action={action} method={method} onSubmit={onSubmit}>
    <SearchField
      placeholder="Search over 100,000,000 academic papers"
      size="lg"
    />
  </form>
)


export default SearchForm
