import React from 'react'

import Blockquote from './blockquote'
import Markdown from './markdown'

const Testimonial = ({ id, content, author, ...restProps }) => (
  <Blockquote id={id} avatar {...restProps}>
    <Markdown>{content}</Markdown>
    <Blockquote.Author {...author} />
  </Blockquote>
)

export default Testimonial
