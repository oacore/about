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
        <Card className="card">
          <div className="team-card-image">
            <CardImg src={picture} alt={name} />
          </div>
          <CardBody className="card-body text-center">
            <CardTitle className="h4">{name}</CardTitle>
            <CardSubtitle className="team-card-role">{role}</CardSubtitle>
            <Button color="primary">Details</Button>
          </CardBody>
        </Card>
      </div>
      <div className="backside">
        <Card className="card">
          <CardBody className="card-body text-center mt-4">
            <CardTitle className="h4">{name}</CardTitle>
            <CardText>{description}</CardText>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a
                  className="social-icon text-xs-center"
                  target="_blank"
                  href="/"
                >
                  <i className="fa fa-2x fa-facebook" />
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  className="social-icon text-xs-center"
                  target="_blank"
                  href="/"
                >
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
