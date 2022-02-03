import React from 'react'
import { Carousel, Button, Card } from '@oacore/design/lib'
import { classNames } from '@oacore/design/lib/utils'

import styles from './index.module.scss'

import {
  SearchForm,
  Section,
  KeyFeatureList,
  KeyFeature,
  JoinList,
  JoinItem,
  TestimonialList,
  TestimonialItem,
  TestimonialCard,
  ServicesList,
  ServiceItem,
  Layout,
} from 'design-v2/components'
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
    <img
      src={imgHref}
      alt={label}
      className={classNames.use(styles.heroItemImg, {
        [styles.heroItemImgBig]: action === 'Search',
      })}
    />
  </div>
)

const PartnerProjectsList = () => (
  <ul className={styles.sectionPartnersList}>
    {page.partnerProjects.children.map(({ logo }, index) => (
      <TestimonialCard
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        imgUrl={logo}
        className={styles.sectionPartnersListItem}
      />
    ))}
  </ul>
)

const IndexPage = () => (
  <Page
    title={page.title}
    description={page.description}
    keywords={page.keywords}
  >
    <Layout>
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
            <ServiceItem key={item.title} {...item} tag="a" />
          ))}
        </ServicesList>
        <div className={styles.actionButton}>
          <Button variant="contained" tag="a" href={page.services.action}>
            {page.services.actionLabel}
          </Button>
        </div>
      </Section>

      <Section className={styles.sectionPartners}>
        <h3 className={styles.title}>{page.partnerProjects.title}</h3>
        <PartnerProjectsList />
        <div className={styles.actionButton}>
          <Button variant="outlined" tag="a" href={page.partnerProjects.action}>
            {page.partnerProjects.actionLabel}
          </Button>
        </div>
      </Section>
    </Layout>
  </Page>
)

export default IndexPage
