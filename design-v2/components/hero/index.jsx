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
  reverse,
  spacing,
  hideButtons = false,
}) => (
  <Section id={id} className={classNames.use(styles.header).join(className)}>
    <div className={styles.content}>
      <div
        className={classNames.use(styles.meta, {
          [styles.spacing]: spacing,
        })}
      >
        {icon && <img className={styles.icon} src={icon} alt={title} />}
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div
        className={classNames.use(styles.default, {
          [styles.reverse]: reverse,
        })}
      >
        {description && (
          <Markdown className={styles.description}>{description}</Markdown>
        )}
        {caption && (
          <Markdown
            className={classNames.use(styles.caption, {
              [styles.reverseStyle]: reverse,
            })}
          >
            {caption}
          </Markdown>
        )}
      </div>
      {!hideButtons && actions && (
        <div className={styles.group}>
          {actions.map((action) => (
            <Button
              href={action.url}
              target={action.target}
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
