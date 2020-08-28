import React from 'react'

import { Content } from '../content'
import { SimpleSearchForm } from './forms'

const SearchForm = ({ ...formProps }) => (
  <Content className="mx-auto">
    <SimpleSearchForm {...formProps} />
  </Content>
)

export default SearchForm
