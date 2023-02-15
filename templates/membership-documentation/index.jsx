import React, { useState } from 'react'
import {
  DocumentationMembership,
  DocumentationMembershipNav,
} from '@oacore/design/src'

import Markdown from '../../components/markdown'
import { Layout } from '../../design-v2/components'
import textData from '../../data/membership.yml'

const DocumentationPageTemplate = ({ headerAbout, docs }) => {
  const [highlight, setHighlight] = useState()

  const mappedDocs = React.useMemo(
    () =>
      docs.items.map((item) => ({
        ...item,
        description: item.descriptionAbout,
      })),
    []
  )

  return (
    <Layout>
      <DocumentationMembership
        headerTitle={headerAbout.header.title}
        headerCaption={<Markdown>{headerAbout.header.caption}</Markdown>}
        docs={mappedDocs}
        highlight={highlight}
        setHighlight={setHighlight}
        nav={
          <DocumentationMembershipNav
            textData={textData}
            setHighlight={setHighlight}
          />
        }
      />
    </Layout>
  )
}

export default DocumentationPageTemplate
