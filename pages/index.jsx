import React from 'react'
import { Carousel, Button } from '@oacore/design/lib'

import styles from './index.module.scss'
import { Card } from '../../design/lib/elements'
import SearchForm from '../components/design-v2/search-form'
import Section from '../components/design-v2/layout/section'
import { KeyFeatureList, KeyFeature } from '../components/design-v2/key-feature'
import { JoinList, JoinItem } from '../components/design-v2/sections/join'
import {
  TestimonialItem,
  TestimonialList,
} from '../components/design-v2/sections/testimonial'
import {
  ServiceItem,
  ServicesList,
} from '../components/design-v2/sections/services'

import { Page } from 'components'
import page from 'data/home.yml'

const SlideHeroItem = ({
  title,
  image: imgHref,
  label,
  description,
  action,
  actionLabel,
}) => (
  <div className={styles.heroItem}>
    <Card variant="pure" className={styles.heroItemCard}>
      <Card.Title tag="h2" className={styles.heroTitle}>
        {title}
      </Card.Title>
      <Card.Description tag="div">
        {action === 'Search' ? (
          <SearchForm />
        ) : (
          <>
            {description && (
              <p className={styles.heroItemDescription}>{description}</p>
            )}
            <Button tag="a" variant="contained" href={action}>
              {actionLabel}
            </Button>
          </>
        )}
      </Card.Description>
    </Card>
    <img src={imgHref} alt={label} className={styles.heroItemImg} />
  </div>
)

const IndexPage = () => (
  <Page
    title={page.title}
    description={page.description}
    keywords={page.keywords}
    className={styles.page}
  >
    <Carousel draggable={false} useArrows={false} slidesToShow={1} infinite>
      {page.slides.children.map((slide) => (
        <SlideHeroItem key={slide.title} {...slide} />
      ))}
    </Carousel>

    <Section>
      <h2 className="sr-only">{page.features.title}</h2>
      <KeyFeatureList>
        {page.features.children.map(
          ({ title, description, picture, status }) => (
            <KeyFeature
              title={title}
              status={status}
              icon={picture}
              key={title}
            >
              {description}
            </KeyFeature>
          )
        )}
      </KeyFeatureList>
    </Section>
    <Section className={styles.sectionJoin}>
      <h3 className={styles.title}>{page.join.title}</h3>
      <JoinList>
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

    <Section className={styles.sectionTestimonial}>
      <h3 className={styles.title}>{page.testimonials.title}</h3>
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
          <ServiceItem key={item.title} {...item} />
        ))}
      </ServicesList>
      <div className={styles.actionButton}>
        <Button variant="contained" tag="a" href={page.services.action}>
          {page.services.actionLabel}
        </Button>
      </div>
    </Section>
  </Page>
)

export default IndexPage
