import React, { useState, useEffect, useCallback } from 'react'
import { Card } from '@oacore/design'
import { classNames } from '@oacore/design/lib/utils'

import styles from './styles.module.css'

// Card doesn't forward ref, so this is more like a workaround
const SELECTION_OFFSET_TRESHOLD = 3
const useAccessibleCard = () => {
  const [applied, setApplied] = useState(false)

  let previusPoint = { x: 0, y: 0 }
  const handleCardClick = useCallback((event) => {
    // Preventing accidental opening the link when the user wanted to select
    // the text. Trying to detect if the user was moving cursor at least
    // for a character between mouse down and mouse up.
    const currentPoint = {
      x: event.clientX,
      y: event.clientY,
    }

    if (event.type === 'mousedown') previusPoint = currentPoint
    else if (event.type === 'mouseup') {
      const offsetSq =
        (currentPoint.x - previusPoint.x) ** 2 +
        (currentPoint.y - previusPoint.y) ** 2
      const cardElement = event.target.closest(`.${styles.container}`)
      const hyperlinkElement = cardElement.querySelector('a[href]')

      if (
        event.target !== hyperlinkElement &&
        !hyperlinkElement.contains(event.target) &&
        offsetSq < SELECTION_OFFSET_TRESHOLD ** 2
      )
        hyperlinkElement.click()
    }
  }, [])

  useEffect(() => {
    setApplied(true)
  }, [])

  return {
    applied,
    onMouseDown: handleCardClick,
    onMouseUp: handleCardClick,
  }
}

const LinkCard = ({ data, id, className, ...restProps }) => {
  const titleId = `${id}-title`
  const descriptionId = `${id}-description`

  const { applied, ...cardEventListeners } = useAccessibleCard()

  return (
    <Card
      id={id}
      className={classNames
        .use(styles.container, applied && styles.clickable)
        .join(className)}
      aria-labelledby={titleId}
      {...cardEventListeners}
      {...restProps}
    >
      <h4 id={titleId}>
        <a
          href={data.href}
          target={data.target ?? '_blank'}
          rel="noreferrer noopener"
          aria-describedby={data.description ? descriptionId : null}
        >
          {data.label}
        </a>
      </h4>

      {data.description && (
        <p id={descriptionId} className={styles.description}>
          {data.description}
        </p>
      )}

      <footer className={styles.source}>{data.type}</footer>
    </Card>
  )
}

export default LinkCard
