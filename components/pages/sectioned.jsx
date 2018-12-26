import React from 'react'
import { Article } from '../content'
import { DescriptionSection } from '../sections'

const SectionedPage = ({
  title,
  description = null,
  children = null,
  content = null,
  sections = [],
}) => (
  <Article nav container>
    <h1>{title}</h1>
    {children || content || description}
    {sections.map(({ id, ...restProps }) => (
      <DescriptionSection key={id} id={id} {...restProps} />
    ))}
  </Article>
)

SectionedPage.create = props => () => <SectionedPage {...props} />

export default SectionedPage
