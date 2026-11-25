'use client'

import { Tooltip } from 'antd'

import Markdown from '@components/Markdown/Markdown'

import styles from './ServiceFeatures.module.css'

type FeatureDescriptionProps = {
  description?: string
  tooltip?: string
  tooltipLabel?: string
  className?: string
}

/**
 * Renders the feature text; when `tooltipLabel` occurs in it, that label becomes
 * a dotted trigger revealing the markdown `tooltip` (old @oacore/design Popover).
 */
const FeatureDescription = ({
  description,
  tooltip,
  tooltipLabel,
  className,
}: FeatureDescriptionProps) => {
  if (!tooltip || !tooltipLabel || !description || !description.includes(tooltipLabel)) {
    return <Markdown className={className}>{description}</Markdown>
  }

  const [before, after] = description.split(tooltipLabel)

  return (
    <p className={className}>
      {before}
      <Tooltip
        placement="top"
        rootClassName={styles.tooltipRoot}
        title={<Markdown className={styles.tooltip}>{tooltip}</Markdown>}
        trigger={['hover', 'focus']}
      >
        <button className={styles.tooltipTrigger} type="button">
          {tooltipLabel}
        </button>
      </Tooltip>
      {after}
    </p>
  )
}

export default FeatureDescription
