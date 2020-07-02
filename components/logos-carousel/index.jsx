import React, { Component } from 'react'
import { Carousel, CarouselItem, CarouselControl } from 'reactstrap'
import { bind } from 'decko'

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
    const missingCount =
      LogosCarousel.itemsPerSlide - (items.length % LogosCarousel.itemsPerSlide)

    let insertedCount = 0
    let insertPosition = Math.floor(items.length / 2)
    const itemsToRender = items.map((_, i) => {
      if (missingCount - insertedCount > 0 && i === insertPosition) {
        const item = items[insertedCount]
        insertedCount += 1
        insertPosition += Math.floor((items.length - insertPosition) / 2)
        return item
      }

      return items[i - insertedCount]
    })
    if (missingCount) itemsToRender.push(...items.slice(-missingCount))

    const itemChunks = spliceChunks(itemsToRender, LogosCarousel.itemsPerSlide)

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
    const { activeIndex } = this.state
    this.goToIndex(activeIndex + 1)
  }

  @bind
  previous() {
    const { activeIndex } = this.state
    this.goToIndex(activeIndex - 1)
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
              src={`/images/logos/${logo}`}
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
