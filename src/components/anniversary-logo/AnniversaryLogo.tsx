'use client'

import classNames from 'classnames'
import Image from 'next/image'

import coreSymbol from './core-symbol.svg'
import styles from './styles.module.css'

type AnniversaryLogoProps = {
  className?: string
}

const AnniversaryLogo = ({ className }: AnniversaryLogoProps) => (
  <div
    aria-label="CORE 10 years"
    className={classNames(styles.container, className)}
    role="img"
  >
    <div className={styles.withHat}>
      <Image
        alt=""
        aria-hidden
        className={styles.symbol}
        height={48}
        src={coreSymbol}
        unoptimized
        width={36}
      />
      CORE
    </div>
    <div className={styles.years}>
      10
      <br />
      years
    </div>
  </div>
)

export default AnniversaryLogo
