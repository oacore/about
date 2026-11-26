import { Typography } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'

import Markdown from '@components/Markdown/Markdown'
import { getLinkProps } from '@utils/resolveHref'

import styles from './key-feature.module.css'

const { Title } = Typography

export type KeyFeatureItem = {
  title: string
  description: string
  picture: string
  status?: string
  url?: string
  titleUrl?: string
}

type KeyFeatureListProps = {
  items: KeyFeatureItem[]
  className?: string
}

const KeyFeatureList = ({ items, className }: KeyFeatureListProps) => (
  <ul className={classNames(styles.list, className)}>
    {items.map((item) => (
      <li className={styles.item} key={item.title}>
        <div className={classNames(styles.card, item.status === 'data' && styles.cardContained)}>
          {item.status === 'data' ? <span className={styles.status}>{item.status}</span> : null}
          {item.url ? (
            <a aria-label={item.title} {...getLinkProps(item.url)}>
              <Image
                alt=""
                className={styles.icon}
                height={60}
                src={item.picture}
                unoptimized
                width={72}
              />
            </a>
          ) : (
            <Image
              alt=""
              className={styles.icon}
              height={60}
              src={item.picture}
              unoptimized
              width={72}
            />
          )}
          <h5 className={styles.title}>
            {item.titleUrl ? (
              <a className={styles.titleLink} {...getLinkProps(item.titleUrl)}>
                {item.title}
              </a>
            ) : (
              item.title
            )}
          </h5>
          <Markdown className={styles.text}>{item.description}</Markdown>
        </div>
      </li>
    ))}
  </ul>
)

export default KeyFeatureList
