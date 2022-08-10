import React from 'react'
import { Button } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'

import styles from './styles.module.scss'
import { Section } from '../layout'

import { Markdown } from 'components'

const Hero = ({
  id,
  icon,
  title,
  description,
  caption,
  actions,
  image,
  className,
}) => (
  <Section id={id} className={classNames.use(styles.header).join(className)}>
    <div className={styles.content}>
      <div className={styles.meta}>
        {icon && <img className={styles.icon} src={icon} alt={title} />}
        <h1 className={styles.title}>{title}</h1>
      </div>
      {description && (
        <Markdown className={styles.description}>{description}</Markdown>
      )}
      {caption && <Markdown className={styles.caption}>{caption}</Markdown>}
      {actions && (
        <div className={styles.group}>
          {actions.map((action) => (
            <Button
              href={action.url}
              variant={action.variant}
              key={action.caption}
              download={action.download}
            >
              {action.caption}
            </Button>
          ))}
        </div>
      )}
    </div>
    <div>
      <img className={styles.logo} src={image} alt="logo" />
    </div>
  </Section>
)

export default Hero
