'use client'

import { Carousel } from '@core/core-ui'
import { Button, Typography } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import { useState, useSyncExternalStore } from 'react'

import { Layout, Section } from '@components/layout'
import Markdown from '@components/Markdown/Markdown'
import SearchForm from '@components/search-form'
import { AudienceList, JoinList, KeyFeatureList, ServicesList } from '@components/sections'
import Testimonial from '@components/testimonial'
import { getLinkProps } from '@utils/resolveHref'

import type { HomePageData, HomeSlide, HomeSpotlight, HomeUserGroup } from './home/types'

import styles from './index.module.css'
import './home/carousel.css'

const subscribeToNothing = () => () => {}

const useIsClient = () => useSyncExternalStore(subscribeToNothing, () => true, () => false)

const { Title } = Typography

type HomePageProps = {
  page: HomePageData
}

type HeroSlideProps = {
  slide: HomeSlide
  searchPlaceholder: string
  searchValue: string
  onSearchChange: (value: string) => void
  priority?: boolean
}

const HeroSlide = ({
  slide,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  priority = false,
}: HeroSlideProps) => {
  const isSearch = slide.action === 'Search'

  return (
    <div className={styles.heroSlide}>
      <div className={styles.heroCopy}>
        <h1 className={styles.heroTitle} >
          {slide.title}
        </h1>
        {isSearch ? (
          <SearchForm
            onValueChange={onSearchChange}
            placeholder={searchPlaceholder}
            value={searchValue}
          />
        ) : (
          <>
            {slide.description ? <p className={styles.heroDescription}>{slide.description}</p> : null}
            <div className={styles.actions}>
              {slide.actionLabel ? (
                <Button type="primary" {...getLinkProps(slide.action)}>
                  {slide.actionLabel}
                </Button>
              ) : null}
              {slide.statisticAction && slide.statisticActionLabel ? (
                <Button variant="outlined" {...getLinkProps(slide.statisticAction)}>
                  {slide.statisticActionLabel}
                </Button>
              ) : null}
            </div>
          </>
        )}
      </div>
      <div className={styles.heroMedia}>
        <Image
          alt={slide.label}
          className={styles.heroImage}
          height={320}
          priority={priority}
          src={slide.image}
          unoptimized
          width={560}
        />
      </div>
    </div>
  )
}

type SpotlightProps = {
  spotlight: HomeSpotlight
  imageClassName?: string
}

const Spotlight = ({ spotlight, imageClassName }: SpotlightProps) => {
  if (!spotlight.title) {
    return null
  }

  return (
    <Section className={styles.spotlight}>
      <div className={styles.spotlightInner}>
        <Image
          alt=""
          className={classNames(styles.spotlightImage, imageClassName)}
          height={80}
          src={spotlight.image}
          unoptimized
          width={96}
        />
        <h3 className={styles.sectionTitle}>
          {spotlight.title}
        </h3>
        <Markdown className={styles.spotlightCopy}>{spotlight.description}</Markdown>
        {spotlight.action.title ? (
          <Button type="primary" {...getLinkProps(spotlight.action.url)}>
            {spotlight.action.title}
          </Button>
        ) : null}
      </div>
    </Section>
  )
}

const UserGroup = ({ group }: { group: HomeUserGroup }) => (
  <article className={styles.userGroup}>
    <div className={styles.userGroupInner}>
      <div className={styles.userIntro}>
        <Markdown className={styles.userTitle}>{group.title}</Markdown>
        <div className={styles.userQuote}>
          <Testimonial
            author={group.testimonial.author}
            content={group.testimonial.content}
            id={group.testimonial.id}
          />
        </div>
      </div>
      <div className={styles.logoList}>
        {group.logos.map((logo) => (
          <div className={classNames(styles.logoCard, logo.background && styles.logoCardAccent)} key={logo.alt}>
            <Image
              alt={logo.alt}
              className={classNames(styles.logoImage, logo.full && styles.logoImageFull)}
              height={104}
              src={logo.img}
              unoptimized
              width={212}
            />
          </div>
        ))}
      </div>
      <div className={styles.logoAction}>
        <a className={styles.logoLink} {...getLinkProps(group.action.url)}>
          {group.action.caption}
        </a>
      </div>
    </div>
  </article>
)

const HomePage = ({ page }: HomePageProps) => {
  const [searchValue, setSearchValue] = useState('')
  const isCarouselReady = useIsClient()
  const firstSlide = page.slides[0]

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
  }

  return (
    <Layout>
      <Section>
        {isCarouselReady ? (
          <Carousel
            autoplay={!searchValue.length}
            draggable={false}
            infinite
            slidesToShow={1}
            swipe={false}
            useArrows={false}
          >
            {page.slides.map((slide, index) => (
              <div key={slide.title}>
                <HeroSlide
                  onSearchChange={handleSearchChange}
                  priority={index === 0}
                  searchPlaceholder={page.searchPlaceholder}
                  searchValue={searchValue}
                  slide={slide}
                />
              </div>
            ))}
          </Carousel>
        ) : firstSlide ? (
          <HeroSlide
            onSearchChange={handleSearchChange}
            priority
            searchPlaceholder={page.searchPlaceholder}
            searchValue={searchValue}
            slide={firstSlide}
          />
        ) : null}
      </Section>

      <Section>
        {page.features.title ? (
          <Title className={page.features.hidden ? styles.visuallyHidden : styles.sectionTitle} level={2}>
            {page.features.title}
          </Title>
        ) : null}
        <KeyFeatureList items={page.features.items} />
      </Section>

      <Section className={styles.band}>
        <h3 className={styles.sectionTitle}>
          {page.join.title}
        </h3>
        <div className={styles.joinIntro}>
          <Image alt="POSI" height={24} src={page.posiImage} unoptimized width={25} />
          <div className={styles.joinCopy}>
            {page.join.subTitle ? <span>{page.join.subTitle}</span> : null}
            {page.join.subTitle && page.join.subPart ? <span className={styles.divider}>|</span> : null}
            {page.join.subPart ? <Markdown className={styles.joinMarkdown}>{page.join.subPart}</Markdown> : null}
          </div>
        </div>
        <JoinList items={page.join.items} />
      </Section>

      <Spotlight spotlight={page.oai} />

      <Section>
        <div className={styles.center}>
          <h3 className={styles.sectionTitle}>
            {page.testimonials.title}
          </h3>
          {page.testimonials.subtitle ? <span className={styles.subtitle}>{page.testimonials.subtitle}</span> : null}
        </div>
        <AudienceList items={page.testimonials.items} />
        {page.testimonials.actionLabel ? (
          <div className={styles.centerAction}>
            <Button type="primary" {...getLinkProps(page.testimonials.action)}>
              {page.testimonials.actionLabel}
            </Button>
          </div>
        ) : null}
      </Section>

      <Section className={styles.spotlight}>
        <div className={styles.spotlightInner}>
          <Image
            alt=""
            className={styles.characteristicsImage}
            height={55}
            src={page.characteristics.image}
            unoptimized
            width={65}
          />
          <h3 className={styles.sectionTitle}>
            {page.characteristics.title}
          </h3>
          <Markdown className={styles.spotlightCopy}>{page.characteristics.description}</Markdown>
          {page.characteristics.action ? (
            <Button type="primary" {...getLinkProps(page.characteristics.href)}>
              {page.characteristics.action}
            </Button>
          ) : null}
        </div>
      </Section>

      <Section>
        <h3 className={styles.sectionTitle} >
          {page.services.title}
        </h3>
        <ServicesList items={page.services.items} />
        {page.services.actionLabel ? (
          <div className={styles.centerAction}>
            <Button type="primary" {...getLinkProps(page.services.action)}>
              {page.services.actionLabel}
            </Button>
          </div>
        ) : null}
      </Section>

      <Spotlight spotlight={page.ref} />

      <section className={styles.users}>
        {page.users.map((group) => (
          <UserGroup group={group} key={group.id} />
        ))}
      </section>
    </Layout>
  )
}

export default HomePage
