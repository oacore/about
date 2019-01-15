import React from 'react'
import { Row, Col } from 'reactstrap'

import './team-member.scss'

const TeamMember = ({ name, role, picture, className = '', ...restProps }) => (
  <Row className={`team-member ${className}`} {...restProps}>
    <Col sm="4" lg="3">
      {picture ? (
        <figure className="team-member-picture">
          <img src={picture} alt={name} />
        </figure>
      ) : (
        <div className="team-member-picture" />
      )}
    </Col>
    <Col sm="8" lg="9">
      <p className="team-member-name h4">{name}</p>
      <p className="team-member-role">{role}</p>
    </Col>
  </Row>
)

export default TeamMember
