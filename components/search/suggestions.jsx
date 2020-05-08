import React from 'react'

import { Content } from '../content'

const SuggestionsList = ({ options }) => (
  <ul className="search-suggestions list-inline">
    {options.map(option => (
      <li className="list-inline-item" key={option}>
        <a href={`/search?q=${encodeURIComponent(option)}`}>{option}</a>
      </li>
    ))}
  </ul>
)

const Suggestions = ({ options }) => {
  if (options == null || options.length === 0) return null
  return (
    <Content className="mx-auto">
      <span className="search-suggestions-heading">Try:</span>
      <SuggestionsList options={options} />
    </Content>
  )
}

export default Suggestions
