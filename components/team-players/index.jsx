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

class TeamPlayers extends React.Component {
  state = {
    toggle: false,
  }

  handleToggle = () => {
    this.setState({ toggle: true })
  }

  render() {
    const { name, role, picture, description, ...restProps } = this.props
    const { toggle } = this.state

    return (
      <div
        id="team-players"
        className={`team-member image-flip ${toggle ? 'image-flip-touch' : ''}`}
        {...restProps}
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
                <Button
                  onClick={this.handleToggle}
                  color="primary"
                  className="my-3"
                  outline
                >
                  Details
                </Button>
              </CardBody>
            </Card>
          </div>
          <div className="backside">
            <Card>
              <CardBody className="mt-4">
                <CardTitle className="h4">{name}</CardTitle>
                <CardText>{description}</CardText>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default TeamPlayers
