import { Button } from '@oacore/design/lib/elements'
import { classNames } from '@oacore/design/lib/utils'
import React from 'react'

import Layout from '../layout/layout'
import styles from './styles.module.scss'

const ErrorTemplate = ({ text, className }) => (
  <Layout>
    <div className={classNames.use(styles.container).join(className)}>
      <img src={text.image.url} alt={text.image.caption} />
      <h4>{text.title}</h4>
      <p>{text.description}</p>
      <div className={styles.group}>
        {text.actions.map(({ caption, url, variant }) => (
          <Button key={caption} href={url} variant={variant || 'contained'}>
            {caption}
          </Button>
        ))}
      </div>
    </div>
  </Layout>
)

export default ErrorTemplate
