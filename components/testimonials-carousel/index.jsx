import React, { Component } from 'react'
import { Carousel, CarouselItem } from 'reactstrap'
import { bind } from 'decko'

import Testimonial from '../testimonial'
import styles from './testimonials-carousel.module.scss'

const TestimonialsCarouselControl = ({
  children,
  direction,
  onClick,
  directionText = direction,
  className = '',
}) => (
  <button
    className={`${className} ${
      styles[`testimonials-carousel-control-${direction}`]
    }`}
    type="button"
    tabIndex="0"
    onClick={e => {
      e.preventDefault()
      onClick()
    }}
  >
    <span
      className={styles[`testimonials-carousel-control-${direction}-caption`]}
      aria-hidden="true"
    >
      {directionText}
    </span>
    <span className={styles.testimonialsCarouselControlText}>{children}</span>
  </button>
)

class TestimonialsCarousel extends Component {
  state = { activeIndex: 0 }

  @bind
  onExiting() {
    this.animating = true
  }

  @bind
  onExited() {
    this.animating = false
  }

  normalizeIndex(index) {
    const { items } = this.props
    return (items.length + index) % items.length
  }

  @bind
  goToIndex(newIndex) {
    if (this.animating) return
    const nextIndex = this.normalizeIndex(newIndex)
    this.setState({ activeIndex: nextIndex })
  }

  @bind
  next() {
    const { activeIndex } = this.state
    this.goToIndex(activeIndex + 1)
  }

  @bind
  previous() {
    const { activeIndex } = this.state
    this.goToIndex(activeIndex - 1)
  }

  render() {
    const { items, className = '', ...restProps } = this.props
    const { activeIndex } = this.state

    const slides = items.map(item => (
      <CarouselItem
        className={styles.testimonialsCarouselItem}
        onExiting={this.onExiting}
        onExited={this.onExited}
      >
        <Testimonial avatar {...item} />
      </CarouselItem>
    ))

    return (
      <Carousel
        className={`${styles.testimonialsCarousel} ${className}`}
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        {...restProps}
      >
        {slides}
        <div className={styles.testimonialsCarouselControlGroup}>
          <TestimonialsCarouselControl
            className={styles.testimonialsCarouselControlPrev}
            direction="prev"
            directionText="Previous"
            onClick={this.previous}
          />
          <TestimonialsCarouselControl
            className={styles.testimonialsCarouselControlNext}
            direction="next"
            directionText="Next"
            onClick={this.next}
          />
        </div>
      </Carousel>
    )
  }
}

export default TestimonialsCarousel
