import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardBody, CardLink, Collapse } from 'reactstrap'
import { bind } from 'decko'

import styles from './accordion.module.scss'

class AccordionItem extends Component {
  @bind
  toggle(event) {
    event.preventDefault()
    const { id, onToggle: handleToggle } = this.props
    handleToggle(id)
  }

  render() {
    const { id, title, children, isOpen, className = '' } = this.props
    return (
      <Card
        id={id}
        className={`${styles.accordionItem} ${styles.card} ${
          isOpen ? styles.active : ''
        } ${className}`}
        tag="section"
      >
        <CardHeader
          className={`${styles.accordionHeader} ${styles.cardHeader}`}
        >
          <h4 className={styles.accordionTitle}>
            <CardLink
              href={`#${id}`}
              className={styles.accordionLink}
              onClick={this.toggle}
            >
              {title}
            </CardLink>
          </h4>
        </CardHeader>
        <Collapse isOpen={isOpen}>
          <CardBody className={styles.cardBody}>{children}</CardBody>
        </Collapse>
      </Card>
    )
  }
}
AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
}

AccordionItem.defaultProps = {
  isOpen: false,
  onToggle: () => {},
}

export default AccordionItem
