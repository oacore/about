import React from 'react'
import { Nav, NavItem, NavLink, Fade, Row, Col } from 'reactstrap'

const Feature = ({ children, isActive }) => (
  <Fade in={isActive} hidden={!isActive}>
    {children}
  </Fade>
)

class FeaturesSection extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activePaneId: null,
    }
  }

  static getDerivedStateFromProps({ children }, state) {
    if (state.activePaneId !== null) return state

    let firstPane = null
    React.Children.forEach(children, child => {
      if (!firstPane && child.type === Feature) firstPane = child
    })

    return {
      ...state,
      activePaneId: firstPane.props.id,
    }
  }

  toggleTab(tabId) {
    this.setState({ activePaneId: tabId })
  }

  render() {
    const { activePaneId } = this.state

    const beforeTabs = []
    const afterTabs = []
    const tabs = []

    // Filter features to 3 lists
    React.Children.forEach(this.props.children, child => {
      if (child.type === Feature) tabs.push(child)
      else (tabs.length === 0 ? beforeTabs : afterTabs).push(child)
    })

    const tabPanes = tabs.map(tab =>
      React.cloneElement(tab, {
        isActive: activePaneId === tab.props.id,
      })
    )

    const tabPills = tabPanes.map(tab => {
      const { forTitle, id } = tab.props
      return (
        <NavItem key={id}>
          <NavLink
            active={id === activePaneId}
            href={`#${id}`}
            onClick={() => this.toggleTab(id)}
          >
            CORE for <b>{forTitle}</b>
          </NavLink>
        </NavItem>
      )
    })

    return (
      <section id="features" className="features">
        {beforeTabs}
        <Row>
          <Col xs="12" md="3">
            <Nav vertical pills role="tablist" aria-orientation="vertical">
              {tabPills}
            </Nav>
          </Col>
          <Col xs="12" md="9">
            <div className="tab-content">{tabPanes}</div>
          </Col>
        </Row>
        {afterTabs}
      </section>
    )
  }
}

export { FeaturesSection as Features, Feature }
