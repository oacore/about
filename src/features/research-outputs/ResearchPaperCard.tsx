'use client'

import { Card } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'

import CitationsModal from '@features/research-outputs/CitationsModal'
import Reference from '@features/research-outputs/Reference'
import type { ResearchOutputPaper } from '@features/research-outputs/types'
import coreLogo from "../../assets/icons/core-logo-circle.svg"

import styles from './styles.module.css'


type ResearchPaperCardProps = {
  paper: ResearchOutputPaper
  paperId?: string
  citationModalId: string
  papersLength?: boolean
  className?: string
}

const ResearchPaperCard = ({
  paper,
  paperId,
  citationModalId,
  papersLength = false,
  className,
}: ResearchPaperCardProps) => {
  const {
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
    citations,
  } = paper

  return (
    <Card className={classNames(styles.card, className)}>
      <div className={classNames(styles.cardTitle, papersLength && styles.cardTitleColumn)}>
        {/*{year ? <span>({year})</span> : null}*/}
        {url ? (
          <a
            className={styles.referenceTitle}
            href={url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {title?.trim()}
          </a>
        ) : (
          <span className={styles.referenceTitle}>{title?.trim()}</span>
        )}
      </div>
      <div className={classNames(styles.cardWrapper, papersLength && styles.cardWrapperColumn)}>
        <div
          className={classNames(styles.itemWrapper, papersLength && styles.itemWrapperColumn)}
        >
          <div
            className={classNames(
              styles.cardHeader,
              papersLength && styles.cardHeaderColumn,
              paperId === 'ai-ml-papers' && styles.cardHeaderHeight,
            )}
          >
            <Image alt="" height={64} src={coreLogo} width={64} />
            <Reference
              author={author}
              booktitle={booktitle}
              className={styles.referenceBlock}
              editor={editor}
              journal={journal}
              number={number}
              volume={volume}
            />
          </div>
          <p
            className={classNames(
              styles.cardInfoDescription,
              papersLength && styles.cardInfoDescriptionColumn,
              paperId === 'ai-ml-papers' && styles.cardWrapperHeight,
            )}
          >
            {description}
          </p>
        </div>
        <div
          className={classNames(styles.urlWrapper, papersLength && styles.urlWrapperColumn)}
        >
          <CitationsModal citations={citations ?? {}} id={citationModalId} />
        </div>
      </div>
    </Card>
  )
}

export default ResearchPaperCard
