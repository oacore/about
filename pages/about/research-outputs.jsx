import React, { Component } from 'react'
import { Card } from 'reactstrap'
import { bind } from 'decko'
import { classNames } from '@oacore/design/lib/utils'
import { Button } from '@oacore/design/lib/elements'

import styles from './about.module.scss'
import researchOutputs from '../../public/images/research-outputs.svg'
import coreLogo from '../../public/images/core-logo-circle.svg'
import { Layout } from '../../design-v2/components'
import TogglePanel from '../../components/toggle-panel/togglePanel'

import { Content, Reference, Section } from 'components'
import Markdown from 'components/markdown'
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
  isCitationsModalOpen,
  activePaper,
  papersLength,
  paper,
  ...cardProps
}) => (
  <Card {...cardProps}>
    <div
      className={classNames.use(styles.cardTitle, {
        [styles.cardTitleColumn]: papersLength,
      })}
    >
      {
        (year && <span key="year">({year})</span>,
        url ? (
          <a key="title" href={url} className={styles.referenceTitle}>
            {title.trim()}
          </a>
        ) : (
          <span key="title" className={styles.referenceTitle}>
            {title}
          </span>
        ))
      }
    </div>
    <div
      className={classNames.use(styles.cardWrapper, {
        [styles.cardWrapperColumn]: papersLength,
      })}
    >
      <div
        className={classNames.use(styles.itemWrapper, {
          [styles.itemWrapperColumn]: papersLength,
        })}
      >
        <div
          className={classNames.use(styles.cardHeader, {
            [styles.cardHeaderColumn]: papersLength,
          })}
        >
          <img src={coreLogo} alt="" />
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
            description={description}
          />
        </div>
        <p
          className={classNames.use(styles.cardInfoDescription, {
            [styles.cardInfoDescriptionColumn]: papersLength,
          })}
        >
          {description}
        </p>
      </div>
      <div
        className={classNames.use(styles.urlWrapper, {
          [styles.urlWrapperColumn]: papersLength,
        })}
      >
        <CitationsModal
          id={`${(activePaper && activePaper.id) || 'unknown'}-citaions-modal`}
          citations={paper.citations || {}}
        />
      </div>
    </div>
  </Card>
)

const ResearchOutputsSection = ({
  id,
  title,
  papers,
  onPaperCite,
  isCitationsModalOpen,
  activePaper,
  ...restProps
}) => (
  <Section id={id} {...restProps} className={styles.researchSection}>
    <Content>
      <TogglePanel
        id={title}
        title={title}
        key={title}
        className={styles.toggler}
        content={papers.map((paper) => (
          <div
            className={classNames.use(styles.toggleItem, {
              [styles.toggleItemSmall]: papers.length > 1,
            })}
          >
            <ResearchPaperCard
              paper={paper}
              papersLength={papers.length > 1}
              key={paper.id}
              className="mb-3"
              isCitationsModalOpen={isCitationsModalOpen}
              activePaper={activePaper}
              {...paper}
            />
          </div>
        ))}
      />
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
      <Layout>
        <Section className={styles.header}>
          <div className={styles.innerWrapper}>
            <h1 className={styles.title}>{page.title}</h1>
            <Markdown className={styles.description}>
              {page.description}
            </Markdown>
          </div>
          <div className={styles.logoContainer}>
            <img className={styles.headerImage} src={researchOutputs} alt="" />
          </div>
        </Section>
        {page.sections.map((section) => (
          <ResearchOutputsSection
            key={section.id}
            id={section.id}
            caption={section.caption || section.title}
            title={section.title}
            papers={section.papers}
            onPaperCite={this.toggleCitationsModal}
            isCitationsModalOpen={isCitationsModalOpen}
            activePaper={activePaper}
          />
        ))}
        <Content className={styles.footerWrapper}>
          <Markdown className={styles.footerText}>{page.footer}</Markdown>
          <Button href={page.action.href} variant="contained" target="_blank">
            {page.action.text}
          </Button>
        </Content>
      </Layout>
    )
  }
}

export default ResearchOutputsPage
