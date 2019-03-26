import React from 'react'
import Page from '../page'
import { DescriptionSection } from '../sections'

const SectionedPage = ({
  title,
  description = null,
  keywords = null,
  children = null,
  content = null,
  sections = [],
}) => (
  <Page title={title} description={description} keywords={keywords} nav>
    <h1>{title}</h1>
    {children || content || description}
    {sections.map(({ id, ...restProps }) => (
      <DescriptionSection key={id} id={id} {...restProps} />
    ))}
  </Page>
)

SectionedPage.create = props => () => <SectionedPage {...props} />

export default SectionedPage
