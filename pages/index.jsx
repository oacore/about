import React from 'react'
import { Button } from 'reactstrap'

import {
  Hero,
  KeyFeature,
  KeyFeatureList,
  Switcher,
  Content,
  Section,
  Article,
} from 'components'
import { JoinSection } from 'components/sections'
import SearchForm from 'components/search'
import Link from 'components/link'
import { patchStats } from 'components/utils'

import page from 'data/home.yml'
import { sections as pageSections } from 'data/endorsements.yml'

import { extractTestimonials } from './about/endorsements'

import './index.scss'

const TestimonialsSwitcher = ({ items, limit, text = null, ...restProps }) => (
  <Switcher interval={10000} className="home-switcher" {...restProps}>
    {text && <Switcher.Content>{text}</Switcher.Content>}
    {items
      .slice(0, limit)
      .filter(({ organization }) => organization)
      .map(({ id, content, author, organization }) => (
        <Switcher.Item
          id={id}
          title={organization.name}
          picture={`/static/images/logos/${organization.logo}`}
          key={id}
        >
          <blockquote className="blockquote">
            <Content markdown>{content}</Content>
            <footer className="blockquote-footer">
              {author.name}, {author.role}
            </footer>
          </blockquote>
        </Switcher.Item>
      ))}
  </Switcher>
)

const TestimonialsSection = ({
  id,
  title,
  description,
  items,
  limit,
  more,
  ...restProps
}) => (
  <Section id={id} {...restProps}>
    <h3>{title}</h3>
    <TestimonialsSwitcher
      items={items}
      limit={limit}
      text={<Content markdown>{description}</Content>}
    />
    {more && (
      <div className="mt-3 text-center">
        <Link href={`~endorsements#${id}`} passHref>
          <Button color="primary" outline>
            {more}
          </Button>
        </Link>
      </div>
    )}
  </Section>
)

const IndexPage = () => (
  <Article tag="main">
    <Hero headline={page.hero.headline} tagline={page.hero.tagline}>
      <Section tag="div">
        <SearchForm
          placeholder={patchStats(page.searchPlaceholder, page.statistics)}
        />
      </Section>
    </Hero>

    <Section className="pb-section-lg">
      <h2 className="sr-only">{page.features.title}</h2>
      <KeyFeatureList>
        {page.features.children.map(({ title, description, picture }) => (
          <KeyFeature title={title} icon={picture} key={title}>
            <Content markdown>{description}</Content>
          </KeyFeature>
        ))}
      </KeyFeatureList>
    </Section>

    <JoinSection id="join-us" {...page.join} />

    <Section id="endorsements" className="home-endorsements-section">
      <h2 className="text-center">{page.endorsements.title}</h2>

      <TestimonialsSection
        id={pageSections.enterpriseCompanies.id}
        title={page.endorsements.enterprise.title}
        description={page.endorsements.enterprise.description}
        items={extractTestimonials(
          pageSections.enterpriseCompanies.organizations.items
        )}
        limit={page.endorsements.enterprise.limit}
        more={page.endorsements.enterprise.more}
      />

      <TestimonialsSection
        id={pageSections.academicInstitutions.id}
        className="home-academic-institutions-section"
        title={page.endorsements.academic.title}
        description={page.endorsements.academic.description}
        items={extractTestimonials(
          pageSections.academicInstitutions.organizations.items
        )}
        limit={page.endorsements.enterprise.limit}
        more={page.endorsements.academic.more}
      />
    </Section>

    <Section id="partner-projects">
      <h2 className="text-center">{page.partnerProjects.title}</h2>
      <TestimonialsSwitcher
        items={extractTestimonials(pageSections.partners.organizations.items)}
      />
    </Section>
  </Article>
)

export default IndexPage
