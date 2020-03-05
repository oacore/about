import React from 'react'

import { Head } from '../layout'
import { Article } from '../content'

const Page = ({ title, description, keywords, children, ...articleProps }) => (
  <>
    <Head title={title} description={description} keywords={keywords} />

    <Article tag="main" {...articleProps}>
      {children}
    </Article>
  </>
)

export default Page
