'use client'

import { useSectionScroll } from '@core/core-ui'
import styles from './LegalPage.module.css'

const TermsDescription = () => {
  const { handleAnchorClick, handleAnchorKeyDown } = useSectionScroll()

  return (
    <>
      This page sets the Terms & Conditions under which{' '}
      <a
        aria-label="Scroll to disclaimer section"
        className={styles.linker}
        href="#disclaimer"
        onClick={handleAnchorClick('disclaimer')}
        onKeyDown={handleAnchorKeyDown('disclaimer')}
        tabIndex={0}
      >
        CORE data*
      </a>{' '}
      can be <br />
      used by others.
    </>
  )
}

export default TermsDescription
