import React from 'react'

import { Head } from '../layout'
import { Article } from '../content'

const Page = ({
  title = '',
  description,
  keywords,
  children,
  fullHeight,
  className,
  style,
  ...articleProps
}) => (
  <>
    <Head title={title} description={description} keywords={keywords} />
    <Article
      tag="main"
      fullHeight={fullHeight}
      className={className}
      style={style}
      {...articleProps}
    >
      {children}
    </Article>
  </>
)

export default Page
