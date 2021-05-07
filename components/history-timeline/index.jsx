import React from 'react'
import { classNames } from '@oacore/design/lib/utils'

import Markdown from '../markdown'
import Milestone from '../history-milestone'
import styles from './styles.module.css'

const HistoryTimeline = ({
  data,
  className,
  tag: Tag = 'div',
  ...passProps
}) => (
  <Tag
    className={classNames.use(styles.timeline).join(className)}
    {...passProps}
  >
    <h1 className="sr-only">{data.headline}</h1>
    {data.intro && (
      <Markdown id="now" className={styles.intro}>
        {data.intro}
      </Markdown>
    )}
    {data.milestones.map((milestone) => (
      <Milestone
        key={milestone.id}
        id={milestone.id}
        data={milestone}
        tag="section"
      />
    ))}
  </Tag>
)

export default HistoryTimeline
export { HistoryTimeline }
