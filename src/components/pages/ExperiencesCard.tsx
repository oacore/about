'use client'

import Image from 'next/image'

import Markdown from '@components/Markdown/Markdown'

import styles from './styles.module.css'

export type ExperienceItem = {
  title: string
  description: string
  user: string
  position: string
  img: string
  action?: {
    title: string
    url: string
  }
}

export type ExperiencesCardProps = {
  title: string
  data: ExperienceItem[]
}

const ExperiencesCard = ({ title, data }: ExperiencesCardProps) => (
  <section
    aria-labelledby="experiences-title"
    className={styles.institutionBenefitWrapper}
    id="member-experiences"
  >
    <div className={styles.institutionBenefitInnerWrapper}>
      <div className={styles.titleWrapper} id="experiences-title">
        <Markdown className={styles.cardTitle}>{title}</Markdown>
      </div>
      {data.map((item) => (
        <article className={styles.itemMainWrapper} key={item.title}>
          <div className={styles.itemWrapper}>
            <h3 className={styles.itemTitle}>{item.title}</h3>
            <Markdown className={styles.itemDescription}>{item.description}</Markdown>
          </div>
          <footer className={styles.footer}>
            <div className={styles.userWrapper}>
              <Image
                alt={item.user}
                className={styles.userImg}
                height={45}
                src={item.img}
                width={45}
              />
              <div>
                <div className={styles.user}>{item.user}</div>
                <div className={styles.position}>{item.position}</div>
              </div>
            </div>
            {item.action ? (
              <a className={styles.footerAction} href={item.action.url}>
                {item.action.title}
              </a>
            ) : null}
          </footer>
        </article>
      ))}
    </div>
  </section>
)

export default ExperiencesCard
