'use client'

import { Carousel } from 'antd'
import type { CarouselRef } from 'antd/es/carousel'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import carouselArrowLeft from '@components/MembershipCarousel/assets/carousel-arrow-left.svg'
import carouselArrowRight from '@components/MembershipCarousel/assets/carousel-arrow-right.svg'

import styles from './styles.module.css'

const resolveActionHref = (url: string): string => {
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('#')) {
    return url
  }
  if (url.startsWith('/')) {
    return url
  }
  return `/${url}`
}

const getSlidesPerView = (width: number): number => {
  if (width < 480) return 1
  if (width < 576) return 2
  if (width < 768) return 3
  if (width < 992) return 4
  return 5
}

export type MembershipCarouselItem = {
  img: string
  alt?: string
}

export type MembershipCarouselProps = {
  items: MembershipCarouselItem[]
  actionUrl: string
  membersCount: number
}

const MembershipCarousel = ({ items, actionUrl, membersCount }: MembershipCarouselProps) => {
  const carouselRef = useRef<CarouselRef>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(4)

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView(window.innerWidth))
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const indicatorCount = Math.max(1, items.length - slidesPerView + 1)

  const handlePrev = () => {
    carouselRef.current?.prev()
  }

  const handleNext = () => {
    carouselRef.current?.next()
  }

  const handlePrevKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    handlePrev()
  }

  const handleNextKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    handleNext()
  }

  const handleIndicatorClick = (index: number) => {
    carouselRef.current?.goTo(index)
  }

  const handleIndicatorKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    handleIndicatorClick(index)
  }

  const handleAfterChange = (current: number) => {
    setCurrentSlide(current)
  }

  return (
    <section className={styles.carouselWrapper}>
      <div className={styles.carouselContainer}>
        <Carousel
          afterChange={handleAfterChange}
          dots={false}
          infinite={false}
          ref={carouselRef}
          slidesToScroll={1}
          slidesToShow={slidesPerView}
        >
          {items.map((slide) => (
            <div key={slide.alt ?? slide.img}>
              <div className={styles.compareCardRight}>
                <Image
                  alt={slide.alt ?? 'member logo'}
                  className={styles.carouselItem}
                  height={104}
                  src={slide.img}
                  width={212}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className={styles.carouselControls}>
        <div
          aria-label="Previous slide"
          className={styles.carouselArrow}
          onClick={handlePrev}
          onKeyDown={handlePrevKeyDown}
          role="button"
          tabIndex={0}
        >
          <Image alt="" height={36} src={carouselArrowLeft} width={36} />
        </div>
        <div aria-label="Carousel pagination" className={styles.carouselIndicators} role="tablist">
          {Array.from({ length: indicatorCount }, (_, index) => (
            <button
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={currentSlide === index}
              className={`${styles.carouselIndicator} ${currentSlide === index ? styles.carouselIndicatorActive : ''}`}
              key={index}
              onClick={() => handleIndicatorClick(index)}
              onKeyDown={(event) => handleIndicatorKeyDown(event, index)}
              role="tab"
              tabIndex={currentSlide === index ? 0 : -1}
              type="button"
            />
          ))}
        </div>
        <div
          aria-label="Next slide"
          className={styles.carouselArrow}
          onClick={handleNext}
          onKeyDown={handleNextKeyDown}
          role="button"
          tabIndex={0}
        >
          <Image alt="" height={36} src={carouselArrowRight} width={36} />
        </div>
      </div>
      <div className={styles.linkWrapper}>
        <a className={styles.carouselLink} href={resolveActionHref(actionUrl)}>
          See all {membersCount} CORE members
        </a>
      </div>
    </section>
  )
}

export default MembershipCarousel
