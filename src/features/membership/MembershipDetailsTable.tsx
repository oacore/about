'use client'

import { Section } from '@core/core-ui'
import { Button } from 'antd'
import { usePathname } from 'next/navigation'

import HowItWorksSection from '@components/HowItWorksSection'
import Markdown from '@components/Markdown/Markdown'
import MembershipTable from '@features/membership/MembershipTable'
import { useTable } from '@features/membership/hooks/useTable'
import type { MembershipComparisonTable } from '@features/membership/types'

import styles from './styles.module.css'

type MembershipDetailsTableProps = {
  howItWorksOption?: boolean
  data: {
    box?: { description: string; action: { default: string; active: string } }
    howItWorks?: {
      title: string
      description: string
      image?: string
      actions: Array<{
        action: { url?: string; default: string; active: string; caption?: string }
      }>
    }
    comparisonTable: MembershipComparisonTable
  }
}

const resolveActionHref = (url: string): string => {
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('#')) {
    return url
  }
  if (url.startsWith('/')) {
    return url
  }
  return `/${url}`
}

const MembershipDetailsTable = ({ data, howItWorksOption }: MembershipDetailsTableProps) => {
  const { visibleTable, toggleVisibleTable, tableRef } = useTable()
  const pathname = usePathname()
  const isMembershipSubPage = pathname.includes('/membership/') && pathname !== '/membership'

  const showHowItWorks = howItWorksOption || !isMembershipSubPage

  return (
    <Section id={howItWorksOption ? 'documentation' : 'comparison-table'}>
      {showHowItWorks && data.howItWorks ? (
        <HowItWorksSection
          data={data.howItWorks}
          actions={
            <>
              {data.howItWorks.actions[0] ? (
                <Button onClick={toggleVisibleTable} type="default">
                  {visibleTable
                    ? data.howItWorks.actions[0].action.active
                    : data.howItWorks.actions[0].action.default}
                </Button>
              ) : null}
              {data.howItWorks.actions[1]?.action.url ? (
                <Button
                  href={resolveActionHref(data.howItWorks.actions[1].action.url)}
                  type="primary"
                >
                  {data.howItWorks.actions[1].action.caption ??
                    data.howItWorks.actions[1].action.default}
                </Button>
              ) : null}
            </>
          }
        />
      ) : data.box ? (
        <div className={styles.textBox}>
          <Markdown className={styles.textBoxDescription}>{data.box.description}</Markdown>
          <Button className={styles.textBoxButton} onClick={toggleVisibleTable} type="default">
            {visibleTable ? data.box.action.active : data.box.action.default}
          </Button>
        </div>
      ) : null}

      <div ref={tableRef}>
        {visibleTable ? (
          <MembershipTable
            className={styles.comparisonTable}
            textData={data.comparisonTable}
            type="details"
          />
        ) : null}
      </div>
    </Section>
  )
}

export default MembershipDetailsTable
