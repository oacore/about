import { Button } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'

import { getLinkProps } from '@utils/resolveHref'

import styles from './join.module.css'

export type JoinItem = {
  caption: string
  url: string
  picture: string
}

type JoinListProps = {
  items: JoinItem[]
  className?: string
}

const JoinList = ({ items, className }: JoinListProps) => (
  <ul className={classNames(styles.list, className)}>
    {items.map((item) => (
      <li className={styles.item} key={item.caption}>
        <Image
          alt=""
          className={styles.icon}
          height={200}
          src={item.picture}
          unoptimized
          width={200}
        />
        <Button className={styles.button} type="primary" {...getLinkProps(item.url)}>
          {item.caption}
        </Button>
      </li>
    ))}
  </ul>
)

export default JoinList
