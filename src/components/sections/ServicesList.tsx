import { Typography } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'

import { getLinkProps } from '@utils/resolveHref'

import styles from './services.module.css'

const { Title } = Typography

export type ServiceItem = {
  title: string
  subtitle: string
  imgUrl: string
  action: string
}

type ServicesListProps = {
  items: ServiceItem[]
  className?: string
}

const ServicesList = ({ items, className }: ServicesListProps) => (
  <ul className={classNames(styles.list, className)}>
    {items.map((item) => (
      <li className={styles.item} key={item.title}>
        <a className={styles.link} {...getLinkProps(item.action)}>
          <Image
            alt=""
            className={styles.icon}
            height={150}
            src={item.imgUrl}
            unoptimized
            width={150}
          />
          <h4 className={styles.title}>
            {item.title}
          </h4>
          <p className={styles.subtitle}>{item.subtitle}</p>
        </a>
      </li>
    ))}
  </ul>
)

export default ServicesList
