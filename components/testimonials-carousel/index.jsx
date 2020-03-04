import React, { Component } from 'react'
import { Carousel, CarouselItem } from 'reactstrap'
import { bind } from 'decko'

import Testimonial from '../testimonial'

import './testimonials-carousel.scss'

const TestimonialsCarouselControl = ({
  children,
  direction,
  onClick,
  directionText = direction,
  className = '',
}) => (
  <button
    className={`${className} testimonials-carousel-control-${direction}`}
    type="button"
    tabIndex="0"
    onClick={e => {
      e.preventDefault()
      onClick()
    }}
  >
    <span
      className={`testimonials-carousel-control-${direction}-caption`}
      aria-hidden="true"
    >
      {directionText}
    </span>
    <span className="testimonials-carousel-contol-text">{children}</span>
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
        className="testimonials-carousel-item"
        onExiting={this.onExiting}
        onExited={this.onExited}
      >
        <Testimonial avatar {...item} />
      </CarouselItem>
    ))

    return (
      <Carousel
        className={`testimonials-carousel ${className}`}
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        {...restProps}
      >
        {slides}
        <div className="testimonials-carousel-control-group">
          <TestimonialsCarouselControl
            className="testimonials-carousel-control-prev"
            direction="prev"
            directionText="Previous"
            onClick={this.previous}
          />
          <TestimonialsCarouselControl
            className="testimonials-carousel-control-next"
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
