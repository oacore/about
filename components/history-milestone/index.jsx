import React from 'react'
import { classNames } from '@oacore/design/lib/utils'

import LinkCard from '../link-card'
import Markdown from '../markdown'
import styles from './styles.module.css'

const HistoryMilestone = ({
  data,
  id = data?.id,
  className = '',
  tag: Tag = 'div',
  ...htmlProps
}) => {
  const linkId = `${id}-related-link`

  return (
    <Tag
      id={id}
      className={classNames
        .use(styles.container, styles.switcher)
        .join(className)}
      {...htmlProps}
    >
      <div className={styles['image-container']}>
        {data.image && <img src={data.image.src} alt={data.image.alt} />}
      </div>

      <div className={styles['content-container']}>
        <time className={styles.date} dateTime={data.date.numeric}>
          {data.date.long}
        </time>
        <h3 className={styles['milestone-title']}>{data.title}</h3>

        <Markdown>{data.body}</Markdown>

        {data.link?.href && <LinkCard id={linkId} data={data.link} />}
      </div>
    </Tag>
  )
}

export default HistoryMilestone
