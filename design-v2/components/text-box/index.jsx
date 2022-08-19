import { classNames } from '@oacore/design/lib/utils'
import React from 'react'
import { Button } from '@oacore/design/lib/elements'

import styles from './styles.module.scss'

import { Markdown } from 'components'

const TextBox = ({
  className,
  onClick,
  description,
  buttonCaption,
  buttonUrl,
}) => (
  <div className={classNames.use(styles.box).join(className)}>
    <Markdown className={styles.boxText}>{description}</Markdown>
    <div className={styles.boxButton}>
      <Button variant="outlined" onClick={onClick} href={buttonUrl || null}>
        {buttonCaption}
      </Button>
    </div>
  </div>
)

export default TextBox
