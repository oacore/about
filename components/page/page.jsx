import React from 'react'

import { Head } from '../layout'
import { Article } from '../content'

const Page = ({
  title = '',
  description,
  keywords,
  children,
  fullHeight,
  ...articleProps
}) => (
  <>
    <Head title={title} description={description} keywords={keywords} />
    <Article tag="main" fullHeight={fullHeight} {...articleProps}>
      {children}
    </Article>
  </>
)

export default Page
