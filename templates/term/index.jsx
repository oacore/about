import React, { useRef } from 'react'
import { classNames } from '@oacore/design/lib/utils'

import styles from './styles.module.scss'
import { Layout, Section } from '../../design-v2/components'
import { Markdown } from '../../components'

const TermsPageTemplate = ({ data }) => {
  const headerHeight = useRef(55)
  const handleScroll = (id) => {
    const element = document.getElementById(id)
    const offset = headerHeight.current

    if (element) {
      const position = element.offsetTop - offset
      window.scrollTo({
        top: position,
        behavior: 'smooth',
      })
    }
  }

  return (
    <Layout>
      <Section id="termsPage" className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.title}>{data.header.title}</h2>
          <div className={styles.description}>
            This page sets the Terms & Conditions under which{' '}
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <a
              className={styles.linker}
              onClick={() => handleScroll('disclaimer')}
            >
              CORE data*
            </a>{' '}
            can be <br />
            used by others.
          </div>
        </div>
        <div className={styles.sectionWrapper}>
          <ul className={styles.redirectWrapper}>
            {data.links?.content?.map((item) => (
              <li className={styles.redirectLink} key={item.href}>
                {/* eslint-disable-next-line max-len */}
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <a onClick={() => handleScroll(item.href)}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <div className={styles.contentWrapper}>
        <div className={styles.contentItem}>
          {data.main.map((mainItem) => (
            <div id={mainItem.id} key={mainItem.title} className={styles.item}>
              <h2
                className={classNames.use(styles.mainTitle, {
                  [styles.subTitle]: mainItem.subtitle,
                })}
              >
                {mainItem.title}
              </h2>
              <Markdown>{mainItem.content}</Markdown>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
export default TermsPageTemplate
