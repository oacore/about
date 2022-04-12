import React from 'react'
import { Button } from '@oacore/design/lib/elements'

import styles from './styles.module.scss'
import useTable from './hooks/useTable'

import { Markdown } from 'components'
import { MembershipTable, Section } from 'design-v2/components'

const DetailsTable = ({ data }) => {
  const { visibleTable, toggleVisibleTable } = useTable()
  return (
    <Section id="comparison-table">
      <div className={styles.box}>
        <Markdown className={styles.boxText}>{data.box.description}</Markdown>
        <div className={styles.boxButton}>
          <Button variant="outlined" onClick={toggleVisibleTable}>
            {visibleTable ? data.box.action.active : data.box.action.default}
          </Button>
        </div>
      </div>
      {visibleTable && (
        <MembershipTable
          className={styles.table}
          textData={data.comparisonTable}
          type="details"
        />
      )}
    </Section>
  )
}

export default DetailsTable
