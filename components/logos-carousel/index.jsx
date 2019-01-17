import React, { Component } from 'react'
import { Carousel, CarouselItem, CarouselControl } from 'reactstrap'
import { bind } from 'decko'

import './logos-carousel.scss'

const LogosCarouselItem = ({
  src,
  alt,
  className = '',
  tag: Tag = 'figure',
  ...restProps
}) => (
  <Tag className={`logos-carousel-figure ${className}`} {...restProps}>
    <img src={src} alt={alt} />
  </Tag>
)

const spliceChunks = (array, chunkSize) => {
  const result = []
  for (let i = 0; i < array.length; i += chunkSize)
    result.push(array.slice(i, i + chunkSize))
  return result
}

class LogosCarousel extends Component {
  static itemsPerSlide = 3

  state = {
    activeIndex: 0,
    itemChunks: [],
  }

  static getDerivedStateFromProps({ items }, state) {
    const itemChunks = spliceChunks(items, LogosCarousel.itemsPerSlide)
    if (itemChunks[itemChunks.length - 1].length < LogosCarousel.itemsPerSlide)
      itemChunks.pop()

    return {
      ...state,
      itemChunks,
    }
  }

  @bind
  onExiting() {
    this.animating = true
  }

  @bind
  onExited() {
    this.animating = false
  }

  @bind
  goToIndex(newIndex) {
    if (this.animating) return
    const { itemChunks } = this.state
    const nextIndex = (itemChunks.length + newIndex) % itemChunks.length
    this.setState({ activeIndex: nextIndex })
  }

  @bind
  next() {
    this.goToIndex(this.state.activeIndex + 1)
  }

  @bind
  previous() {
    this.goToIndex(this.state.activeIndex - 1)
  }

  render() {
    const { className = '', ...restProps } = this.props
    const { itemChunks, activeIndex } = this.state

    const slides = itemChunks.map(slideItems => (
      <CarouselItem
        className="logos-carousel-item"
        onExiting={this.onExiting}
        onExited={this.onExited}
      >
        {slideItems.map(({ logo, name }) => {
          const item = (
            <LogosCarouselItem
              key={name}
              src={`/static/images/logos/${logo}`}
              alt={name}
            />
          )

          return item
        })}
      </CarouselItem>
    ))

    return (
      <Carousel
        className={`logos-carousel ${className}`}
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        {...restProps}
      >
        {slides}
        <CarouselControl
          className="logos-carousel-control-prev"
          direction="prev"
          directionText="Previous"
          onClickHandler={this.previous}
        />
        <CarouselControl
          className="logos-carousel-control-next"
          direction="next"
          directionText="Next"
          onClickHandler={this.next}
        />
      </Carousel>
    )
  }
}

export default LogosCarousel
