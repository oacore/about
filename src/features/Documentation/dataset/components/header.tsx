'use client'

import { Section, useSectionScroll } from '@core/core-ui'
import { Typography } from 'antd'
import Image from 'next/image'

import Markdown from '@components/Markdown/Markdown'
import type { DatasetHeader as DatasetHeaderData, DatasetHeaderLinks } from '@features/Documentation/dataset/types'

import styles from '../styles.module.css'

const { Title } = Typography

const STRUCTURE_IDS = new Set(['dataset2017pre', 'dataset2017', 'dataset2018', 'Currentdataset'])

const openStructurePanel = (id: string) => {
  if (!STRUCTURE_IDS.has(id)) {
    return
  }

  const element = document.getElementById(id)
  const accordionHeader = element?.querySelector<HTMLElement>('.ant-collapse-header')

  if (accordionHeader && !element?.querySelector('.ant-collapse-item-active')) {
    accordionHeader.click()
  }
}

const HeaderMenu = ({ links }: { links: DatasetHeaderLinks }) => {
  const items = links.items ?? []
  const { handleAnchorClick, handleAnchorKeyDown } = useSectionScroll()

  if (!items.length) {
    return null
  }

  return (
    <nav aria-label={links.title ?? 'Dataset documentation sections'} className={styles.headerNav}>
      {links.title ? (
        <Title className={styles.headerNavTitle} level={5}>
          {links.title}
        </Title>
      ) : null}
      <ol className={styles.headerList}>
        {items.map((item) => (
          <li className={styles.headerNavItem} key={`${item.label}-${item.link}`}>
            <a
              aria-label={`Scroll to ${item.label}`}
              href={`#${item.link}`}
              onClick={(event) => {
                openStructurePanel(item.link)
                handleAnchorClick(item.link)(event)
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  openStructurePanel(item.link)
                }
                handleAnchorKeyDown(item.link)(event)
              }}
              tabIndex={0}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

type DatasetHeaderProps = {
  header?: DatasetHeaderData
}

const DatasetHeader = ({ header }: DatasetHeaderProps) => {
  if (!header) {
    return null
  }

  return (
    <Section id={header.id ?? 'header'}>
      {header.title ? (
        <Title className={styles.headerTitle} level={2}>
          {header.title}
        </Title>
      ) : null}
      <div className={styles.headerContent}>
        {header.links ? <HeaderMenu links={header.links} /> : null}
        {header.image ? (
          <Image
            alt={header.title ?? 'CORE Dataset documentation'}
            className={styles.headerImage}
            height={240}
            src={header.image}
            unoptimized
            width={360}
          />
        ) : null}
      </div>
      <Markdown className={styles.headerCaption}>{header.caption}</Markdown>
    </Section>
  )
}

export default DatasetHeader
