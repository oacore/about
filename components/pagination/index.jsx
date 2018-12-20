import React from 'react'
import {
  Pagination as ReactstrapPagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap'

const Pagination = ({ current, total, limit = 10, onPaginate }) => {
  const paginationButtons = []

  const leftBound = Math.max(
    0,
    Math.min(current - Math.floor(limit / 2), total - limit)
  )
  const rightBound = Math.min(
    total,
    Math.max(current + Math.ceil(limit / 2), limit)
  )
  for (let i = leftBound; i < rightBound; ++i) {
    paginationButtons.push(
      <PaginationItem active={i === current} key={i}>
        <PaginationLink onClick={e => onPaginate(e, i)} href="#">
          {i + 1}
        </PaginationLink>
      </PaginationItem>
    )
  }

  const prevButton = (
    <PaginationItem disabled={current <= 0}>
      <PaginationLink
        previous
        href="#"
        onClick={e => onPaginate(e, current - 1)}
      />
    </PaginationItem>
  )

  const nextButton = (
    <PaginationItem disabled={current >= total - 1}>
      <PaginationLink next href="#" onClick={e => onPaginate(e, current + 1)} />
    </PaginationItem>
  )

  return (
    <ReactstrapPagination
      aria-label="Page navigation"
      className="d-flex justify-content-center"
    >
      {prevButton}
      {paginationButtons}
      {nextButton}
    </ReactstrapPagination>
  )
}

export default Pagination
