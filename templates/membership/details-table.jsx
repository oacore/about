import React from 'react'

import styles from './styles.module.scss'
import useTable from './hooks/useTable'

import { MembershipTable, Section, TextBox } from 'design-v2/components'

const DetailsTable = ({ data }) => {
  const { visibleTable, toggleVisibleTable } = useTable()
  return (
    <Section id="comparison-table">
      <TextBox
        onClick={toggleVisibleTable}
        description={data.box.description}
        buttonCaption={
          visibleTable ? data.box.action.active : data.box.action.default
        }
      />
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
