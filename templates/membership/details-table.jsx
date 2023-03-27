import React, { useEffect, useState } from 'react'
import { Button } from '@oacore/design/lib/elements'

import styles from './styles.module.scss'
import useTable from './hooks/useTable'
import { Markdown } from '../../components'

import { MembershipTable, Section, TextBox } from 'design-v2/components'

const DetailsTable = ({ data, howItWorksOption }) => {
  const { visibleTable, toggleVisibleTable, tableRef } = useTable()
  const [pathType, setPathType] = useState(false)

  useEffect(() => {
    const path = window?.location?.pathname
    setPathType(path.includes('/membership/'))
  }, [])

  return (
    <Section id={howItWorksOption ? 'documentation' : 'comparison-table'}>
      {howItWorksOption || !pathType ? (
        <Section id="how-it-works" className={styles.howItWorks}>
          <div className={styles.imageWrapper}>
            <img src={data.howItWorks?.image} alt={data.howItWorks?.title} />
          </div>
          <article className={styles.content}>
            <h3>{data.howItWorks?.title}</h3>
            <Markdown>{data.howItWorks?.description}</Markdown>
            <div className={styles.buttons}>
              {data.howItWorks?.actions && (
                <Button
                  href={data.howItWorks?.actions[0].action.url}
                  variant="outlined"
                  onClick={toggleVisibleTable}
                >
                  {visibleTable
                    ? data.howItWorks?.actions[0].action.active
                    : data.howItWorks?.actions[0].action.default}
                </Button>
              )}
              <Button
                href={data.howItWorks?.actions[1].action.url}
                variant="contained"
              >
                {data.howItWorks?.actions[1].action.caption}
              </Button>
            </div>
          </article>
        </Section>
      ) : (
        <TextBox
          onClick={toggleVisibleTable}
          description={data?.box?.description}
          buttonCaption={
            visibleTable
              ? data?.box?.action?.active
              : data?.box?.action?.default
          }
        />
      )}
      <div ref={tableRef}>
        {visibleTable && (
          <MembershipTable
            className={styles.table}
            textData={data.comparisonTable}
            type="details"
          />
        )}
      </div>
    </Section>
  )
}

export default DetailsTable
