import React from 'react'

const Section = ({ children, tag: Tag = 'section', ...args }) => (
  <Tag {...args}>{children}</Tag>
)

export default Section
