import React from 'react'
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
  Button,
} from 'reactstrap'

import './team-players.scss'

const TeamPlayers = ({
  name,
  role,
  picture,
  description,
  className = '',
  ...restProps
}) => (
  <div
    className={`team-member image-flip  ${className}`}
    {...restProps}
    ontouchstart="this.classList.toggle('hover');"
  >
    <div className="mainflip">
      <div className="frontside">
        <Card>
          <div className="team-card-image">
            <CardImg src={picture} alt={name} />
          </div>
          <CardBody>
            <CardTitle className="h4">{name}</CardTitle>
            <CardSubtitle className="team-card-role">{role}</CardSubtitle>
          </CardBody>
          <Button color="primary" outline className="py-3">
            Details
          </Button>
        </Card>
      </div>
      <div className="backside">
        <Card>
          <CardBody className="mt-4">
            <CardTitle className="h4">{name}</CardTitle>
            <CardText>{description}</CardText>
            <ul className="list-inline text-center">
              <li className="list-inline-item">
                <a className="social-icon" target="_blank" href="/">
                  <i className="fa fa-2x fa-facebook" />
                </a>
              </li>
              <li className="list-inline-item">
                <a className="social-icon" target="_blank" href="/">
                  <i className="fa fa-2x fa-twitter" />
                </a>
              </li>
            </ul>
          </CardBody>
        </Card>
      </div>
    </div>
  </div>
)

export default TeamPlayers
