import React, { Fragment } from 'react'
import { Head } from '../layout'
import { Article } from '../content'

const Page = ({ title, description, keywords, children, ...articleProps }) => (
  <Fragment>
    <Head title={title} description={description} keywords={keywords} />

    <Article tag="main" {...articleProps}>
      {children}
    </Article>
  </Fragment>
)

export default Page
