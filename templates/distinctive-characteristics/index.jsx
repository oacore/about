import React from 'react'
import { Row, Col } from 'reactstrap'

import { Layout, Section } from '../../design-v2/components'
import styles from './styles.module.scss'
import { Markdown } from '../../components'

const DistinctiveCharacteristicsTemplate = ({ data }) => {
  const { sections = [], posi } = data

  return (
    <Layout className={styles.mainWrapper}>
      <Section id="header" className={styles.header}>
        <div className={styles.cardWrapper}>
          <h2 className={styles.title}>{data.title}</h2>
          {data.description && (
            <Markdown className={styles.description}>
              {data.description}
            </Markdown>
          )}
        </div>
      </Section>
      <div className={styles.sectionsContainer}>
        <Row>
          {sections.map((section, sectionIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <Col key={sectionIndex} md="6" className={styles.sectionColumn}>
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h3 className={styles.sectionTitle}>{section.title}</h3>
                    {section.description && (
                      <Markdown className={styles.sectionDescription}>
                        {section.description}
                      </Markdown>
                    )}
                  </div>
                  <div className={styles.imgWrapper}>
                    {sectionIndex === 0 ? (
                      <img
                        className={styles.connectImg}
                        src="/images/join/server.svg"
                        alt={section.title}
                      />
                    ) : (
                      <img
                        className={styles.communityImg}
                        src="/images/community/research/collaboration.svg"
                        alt={section.title}
                      />
                    )}
                  </div>
                </div>
                {section.characteristics &&
                  section.characteristics.length > 0 && (
                    <div className={styles.characteristics}>
                      {section.characteristics.map((characteristic, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <div key={index} className={styles.characteristic}>
                          <h4 className={styles.characteristicTitle}>
                            {characteristic.title}
                          </h4>
                          {characteristic.description && (
                            <Markdown
                              className={styles.characteristicDescription}
                            >
                              {characteristic.description}
                            </Markdown>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <div className={styles.posiSection}>
        <div className={styles.posiHeader}>
          <h3 className={styles.posiTitle}>{posi.title}</h3>
          <img src="/images/posiBig.svg" alt="posi" />
        </div>
        {posi.description && Array.isArray(posi.description) && (
          <div className={styles.posiItems}>
            {posi.description.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className={styles.posiItem}>
                {item.item && <Markdown>{item.item}</Markdown>}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default DistinctiveCharacteristicsTemplate
