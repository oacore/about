import React from 'react'
import {
  Container,
  Form,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  Label,
} from 'reactstrap'

const SearchNavbar = ({
  name,
  value,
  action,
  method,
  onSubmit,
  onReset,
  ...restProps
}) => (
  <Form
    inline
    className="navbar-search-form"
    action={action}
    method={method}
    onSubmit={onSubmit}
    onReset={onReset}
  >
    <Container>
      <Label
        className="navbar-search-form-label"
        htmlFor="navbar-search-form-query"
      >
        Search
      </Label>
      <InputGroup>
        <Input
          type="search"
          name={name}
          value={value}
          {...restProps}
          id="navbar-search-form-query"
          required
        />
        <InputGroupAddon addonType="append">
          <Button color="primary">Search</Button>
        </InputGroupAddon>
      </InputGroup>
    </Container>
  </Form>
)

export default SearchNavbar
