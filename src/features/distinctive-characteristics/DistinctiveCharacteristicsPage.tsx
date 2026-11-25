'use client'

import { Layout, Section } from '@core/core-ui'
import { Col, Row } from 'antd'
import Image from 'next/image'

import Markdown from '@components/Markdown/Markdown'
import { POSI_ICON, SECTION_ICONS } from '@features/distinctive-characteristics/constants'
import type { DistinctiveCharacteristicsPageData } from '@features/distinctive-characteristics/types'

import styles from './styles.module.css'

type DistinctiveCharacteristicsPageProps = {
  data: DistinctiveCharacteristicsPageData
}

const getSectionIcon = (sectionIndex: number) =>
  SECTION_ICONS[sectionIndex] ?? SECTION_ICONS[SECTION_ICONS.length - 1]

const DistinctiveCharacteristicsPage = ({ data }: DistinctiveCharacteristicsPageProps) => {
  const sections = data.sections ?? []
  const posi = data.posi
  const posiItems = posi?.description ?? []

  return (
    <Layout>
      <Section id="header">
        <div className={styles.cardWrapper}>
          {data.title ? <h2 className={styles.title}>{data.title}</h2> : null}
          {data.description ? (
            <Markdown className={styles.description}>{data.description}</Markdown>
          ) : null}
        </div>
      </Section>

      {sections.length ? (
        <Section className={styles.sectionsContainer} id="characteristics">
          <Row gutter={[48, 48]}>
            {sections.map((section, sectionIndex) => {
              const characteristics = section.characteristics ?? []
              const icon = getSectionIcon(sectionIndex)

              return (
                <Col key={section.title ?? `section-${sectionIndex}`} md={12} xs={24}>
                  <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                      <div className={styles.sectionHeaderContent}>
                        {section.title ? (
                          <h3 className={styles.sectionTitle}>{section.title}</h3>
                        ) : null}
                        {section.description ? (
                          <Markdown className={styles.sectionDescription}>{section.description}</Markdown>
                        ) : null}
                      </div>
                      <div className={styles.imgWrapper}>
                        <Image
                          alt={section.title ?? 'Section illustration'}
                          className={styles.connectImg}
                          height={110}
                          src={icon}
                          unoptimized
                          width={110}
                        />
                      </div>
                    </div>

                    {characteristics.length ? (
                      <div>
                        {characteristics.map((characteristic, characteristicIndex) => (
                          <article
                            className={styles.characteristic}
                            key={characteristic.title ?? `characteristic-${characteristicIndex}`}
                          >
                            {characteristic.title ? (
                              <h4 className={styles.characteristicTitle}>{characteristic.title}</h4>
                            ) : null}
                            {characteristic.description ? (
                              <Markdown className={styles.characteristicDescription}>
                                {characteristic.description}
                              </Markdown>
                            ) : null}
                          </article>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </Col>
              )
            })}
          </Row>
        </Section>
      ) : null}

      {posi ? (
        <Section className={styles.posiSection} id="posi">
          <div className={styles.posiHeader}>
            <div className={styles.posiInner}>
              {posi.title ? <h3 className={styles.posiTitle}>{posi.title}</h3> : null}
              {posi.subTitle ? (
                <Markdown className={styles.posiSubtitle}>{posi.subTitle}</Markdown>
              ) : null}
            </div>
            <Image
              alt={posi.title ?? 'Principles of Open Scholarly Infrastructure'}
              className={styles.posiImage}
              height={79}
              src={POSI_ICON}
              unoptimized
              width={79}
            />
          </div>

          {posiItems.length ? (
            <div className={styles.posiItems}>
              {posiItems.map((item, itemIndex) => (
                <div className={styles.posiItem} key={item.item ?? `posi-item-${itemIndex}`}>
                  {item.item ? <Markdown>{item.item}</Markdown> : null}
                </div>
              ))}
            </div>
          ) : null}
        </Section>
      ) : null}
    </Layout>
  )
}

export default DistinctiveCharacteristicsPage
