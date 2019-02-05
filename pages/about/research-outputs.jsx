import React from 'react'
import { Card, CardBody, CardFooter } from 'reactstrap'
import { Article, Section } from 'components'
import Link from 'components/link'
import page from 'data/research-outputs.yml'

const ResearchOutputsSection = ({ id, title, papers }) => (
  <Section id={id}>
    <h2>{title}</h2>
    {papers.map(paper => (
      <Card key={paper.id} className="mb-3">
        <CardBody>
          <p className="mb-0">
            {Array.isArray(paper.author)
              ? paper.author.join(', ')
              : paper.author}
          </p>
          <h5 className="mb-0">
            <Link href={paper.url}>{paper.title}</Link>
          </h5>
        </CardBody>
        {paper.description && <CardFooter>{paper.description}</CardFooter>}
      </Card>
    ))}
  </Section>
)

const ResearchOutputsPage = () => (
  <Article nav tag="main">
    <h1>{page.title}</h1>
    {page.sections.map(section => (
      <ResearchOutputsSection
        key={section.id}
        id={section.id}
        caption={section.title}
        title={section.title}
        papers={section.papers}
      />
    ))}
  </Article>
)

export default ResearchOutputsPage
