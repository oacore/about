import React from 'react'

const Section = ({ children, className, tag: Tag = 'section', ...args }) => (
  <Tag className={`section ${className || ''}`} {...args}>
    {children}
  </Tag>
)

export default Section
