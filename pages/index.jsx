import React, { useState } from 'react'
import { Carousel, Button, Card } from '@oacore/design/lib'
import { classNames } from '@oacore/design/lib/utils'

import posi from '../public/images/posi.svg'
import styles from './index.module.scss'
import Testimonial from '../components/testimonial'

import {
  Section,
  KeyFeatureList,
  KeyFeature,
  JoinList,
  JoinItem,
  TestimonialList,
  TestimonialItem,
  ServicesList,
  ServiceItem,
  Layout,
  SearchForm,
} from 'design-v2/components'
import { Markdown, Page } from 'components'
import page from 'data/home.yml'

const Hero = ({
  title,
  setSearchValue,
  searchValue,
  image: imgHref,
  label,
  description,
  action,
  actionLabel,
  statisticAction,
  statisticActionLabel,
  className,
}) => (
  <div className={classNames.use(styles.heroItem).join(className)}>
    <Card variant="pure" className={styles.heroItemCard}>
      <Card.Title tag="h2" className={styles.heroTitle}>
        {title}
      </Card.Title>
      <Card.Description tag="div">
        {action === 'Search' ? (
          <SearchForm
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        ) : (
          <>
            {description && (
              <p className={styles.heroItemDescription}>{description}</p>
            )}
            <div
              className={classNames.use({
                [styles.buttonWrapper]: statisticActionLabel,
              })}
            >
              {actionLabel && (
                <Button tag="a" variant="contained" href={action}>
                  {actionLabel}
                </Button>
              )}
              {statisticActionLabel && (
                <Button
                  className={styles.statisticLabel}
                  tag="a"
                  variant="outlined"
                  href={statisticAction}
                >
                  {statisticActionLabel}
                </Button>
              )}
            </div>
          </>
        )}
      </Card.Description>
    </Card>
    <div className={styles.heroItemImgContainer}>
      <img
        src={imgHref}
        alt={label}
        className={classNames.use(styles.heroItemImg, {
          [styles.heroItemImgBig]: action === 'Search',
        })}
      />
    </div>
  </div>
)

const IndexPage = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <Page
      title={page.title}
      description={page.description}
      keywords={page.keywords}
      className={styles.page}
      key={page.title.replace(/\s/g, '')}
    >
      <Layout>
        <Carousel
          draggable={false}
          useArrows={false}
          slidesToShow={1}
          infinite
          autoplay={!searchValue?.length}
        >
          {page.slides.children.map((slide) => (
            <Hero
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              key={slide.title}
              {...slide}
            />
          ))}
        </Carousel>
        <Section>
          <h2 hidden={page.features.hidden}>{page.features.title}</h2>
          <KeyFeatureList>
            {page.features.children.map(
              ({ title, description, picture, status, url, titleUrl }) => (
                <KeyFeature
                  title={title}
                  status={status}
                  icon={picture}
                  key={title}
                  url={url}
                  titleUrl={titleUrl}
                >
                  {description}
                </KeyFeature>
              )
            )}
          </KeyFeatureList>
        </Section>
        <Section className={styles.sectionJoin} useFullPageWidth>
          <h3 className={styles.title}>{page.join.title}</h3>
          <div className={styles.posiTitleWrapper}>
            <img src={posi} alt="posi" />
            <div className={styles.subTitle}>
              {page.join.subTitle}
              <span className={styles.divider}>|</span>
              <Markdown>{page.join.subPart}</Markdown>
            </div>
          </div>
          <JoinList className={styles.sectionJoinList}>
            {page.join.children.map(({ caption, url, picture }) => (
              <JoinItem
                caption={caption}
                url={url}
                picture={picture}
                key={caption}
              />
            ))}
          </JoinList>
        </Section>
        <Section className={styles.sectionOai} useFullPageWidth>
          <div className={styles.innerOai}>
            <img className={styles.img} src={page.oai.image} alt="logo" />
            <h3 className={styles.title}>{page.oai.title}</h3>
            <Markdown className={styles.description}>
              {page.oai.description}
            </Markdown>
            <Button variant="contained" tag="a" href={page.oai.action.url}>
              {page.oai.action.title}
            </Button>
          </div>
        </Section>
        <Section className={styles.sectionTestimonial}>
          <div className={styles.center}>
            <h3 className={styles.title}>{page.testimonials.title}</h3>
            <span className={styles.subtitle}>
              {page.testimonials.subtitle}
            </span>
          </div>
          <TestimonialList>
            {page.testimonials.children.map((item) => (
              <TestimonialItem key={item.title} {...item} />
            ))}
          </TestimonialList>
          <div className={styles.actionButton}>
            <Button variant="contained" tag="a" href={page.testimonials.action}>
              {page.testimonials.actionLabel}
            </Button>
          </div>
        </Section>
        <Section className={styles.sectionServices}>
          <h3 className={styles.title}>{page.services.title}</h3>
          <ServicesList>
            {page.services.children.map((item) => (
              <ServiceItem key={item.title} {...item} tag="a" />
            ))}
          </ServicesList>
          <div className={styles.actionButton}>
            <Button variant="contained" tag="a" href={page.services.action}>
              {page.services.actionLabel}
            </Button>
          </div>
        </Section>
      </Layout>
      <Section className={styles.partnersWrapper}>
        {page.users.map((item) => (
          <div className={styles.mainItem}>
            <div className={styles.testimonialWrapper}>
              <Markdown className={styles.testimonialTitle}>
                {item.title}
              </Markdown>
              <div className={styles.testimonialItem}>
                <Testimonial
                  author={item.testimonial.author}
                  content={item.testimonial.content}
                  key={item.testimonial.is}
                  className="card card-body"
                  roleHighlite
                />
              </div>
            </div>
            <section className={styles.carouselWrapper}>
              <div className={styles.carouselItems}>
                {item.userList.items.map((slide) => (
                  <img
                    className={classNames.use(styles.carouselItem, {
                      [styles.carouselItemUnset]: slide.full,
                      [styles.background]: slide.background,
                    })}
                    src={slide.img}
                    alt="logo"
                    key={slide.alt}
                  />
                ))}
              </div>
              <div className={styles.linkWrapper}>
                <a className={styles.link} href={item.userList.action.url}>
                  {item.userList.action.caption}
                </a>
              </div>
            </section>
          </div>
        ))}
      </Section>
    </Page>
  )
}

export default IndexPage
