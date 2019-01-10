import React from 'react'
import Blockquote from './blockquote'
import { Content } from './content'

const Testimonial = ({ id, content, author, ...restProps }) => (
  <Blockquote id={id} avatar {...restProps}>
    <Content markdown>{content}</Content>
    <Blockquote.Author {...author} />
  </Blockquote>
)

export default Testimonial
