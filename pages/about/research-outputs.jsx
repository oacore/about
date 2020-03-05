import React, { Component } from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap'
import { bind } from 'decko'

import { Page, Section, Button, Reference, Content } from 'components'
import CitationsModal from 'components/citations-modal'
import page from 'data/research-outputs.yml'

const ResearchPaperCard = ({
  id,
  type,
  title,
  author,
  year,
  booktitle,
  editor,
  journal,
  volume,
  number,
  description,
  url,
  onCite,
  ...cardProps
}) => (
  <Card {...cardProps}>
    <CardHeader>
      <Reference
        className="mb-0"
        author={author}
        title={title}
        url={url}
        year={year}
        booktitle={booktitle}
        editor={editor}
        journal={journal}
        volume={volume}
        number={number}
      />
    </CardHeader>
    <CardBody>
      <Content tag="p">{description}</Content>
      {onCite && (
        <Button outline onClick={onCite}>
          Cite
        </Button>
      )}
    </CardBody>
  </Card>
)

const ResearchOutputsSection = ({
  id,
  title,
  papers,
  onPaperCite,
  ...restProps
}) => (
  <Section id={id} {...restProps}>
    <h2>{title}</h2>
    <Content>
      {papers.map(paper => (
        <ResearchPaperCard
          key={paper.id}
          className="mb-3"
          onCite={paper.citations && (event => onPaperCite(event, paper))}
          {...paper}
        />
      ))}
    </Content>
  </Section>
)

class ResearchOutputsPage extends Component {
  state = {
    isCitationsModalOpen: false,
    activePaper: null,
  }

  @bind
  toggleCitationsModal(event, paper) {
    this.setState(({ isCitationsModalOpen, activePaper }) => ({
      isCitationsModalOpen: !isCitationsModalOpen,
      activePaper: paper || activePaper,
    }))
  }

  render() {
    const { isCitationsModalOpen, activePaper } = this.state

    return (
      <Page
        title={page.title}
        description={page.description}
        keywords={page.keywords}
        nav
      >
        <h1>{page.title}</h1>
        {page.sections.map(section => (
          <ResearchOutputsSection
            key={section.id}
            id={section.id}
            caption={section.caption || section.title}
            title={section.title}
            papers={section.papers}
            onPaperCite={this.toggleCitationsModal}
          />
        ))}
        <CitationsModal
          id={`${(activePaper && activePaper.id) || 'unknown'}-citaions-modal`}
          isOpen={isCitationsModalOpen}
          onToggle={this.toggleCitationsModal}
          citations={(activePaper && activePaper.citations) || {}}
        />
      </Page>
    )
  }
}

export default ResearchOutputsPage
