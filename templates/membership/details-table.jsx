import React from 'react'
import { Button } from '@oacore/design/lib/elements'

import styles from './styles.module.scss'
import useTable from './hooks/useTable'
import { Markdown } from '../../components'

import { MembershipTable, Section } from 'design-v2/components'

const DetailsTable = ({ data }) => {
  const { visibleTable, toggleVisibleTable } = useTable()
  return (
    <Section id="documentation">
      <Section id="how-it-works" className={styles.howItWorks}>
        <div className={styles.imageWrapper}>
          <img src={data.howItWorks.image} alt={data.howItWorks.title} />
        </div>
        <article className={styles.content}>
          <h3>{data.howItWorks.title}</h3>
          <Markdown>{data.howItWorks.description}</Markdown>
          {data.howItWorks.action && (
            <Button
              className={styles.button}
              href={data.howItWorks.action.url}
              variant={data.howItWorks.action.variant || 'outlined'}
              onClick={toggleVisibleTable}
            >
              {visibleTable
                ? data.howItWorks.action.active
                : data.howItWorks.action.default}
            </Button>
          )}
        </article>
      </Section>
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
