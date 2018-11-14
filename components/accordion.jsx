import React from 'react'
import { Button, Card, CardHeader, CardBody, Collapse } from 'reactstrap'


// TODO: Optimize performance of onToggle if possible
// TODO: Develope markup according to the design
const AccordionItem = ({ id, title, children, isOpen, onToggle }) => (
  <Card id={id}>
    <CardHeader onClick={() => { onToggle(id) }}>
      {title}
    </CardHeader>
    <Collapse isOpen={isOpen}>
      <CardBody>{children}</CardBody>
    </Collapse>
  </Card>
)

// TODO: Make it semantic
// TODO: Add support of item open from the first render
// TODO: Add propTypes
class Accordion extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeItem: null,
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle(itemId) {
    const { activeItem } = this.state
    this.setState({ activeItem: activeItem === itemId ? null : itemId })
  }

  render() {
    const accordionItems = React.Children.map(this.props.children, item =>
      React.cloneElement(item, {
        isOpen: item.props.id === this.state.activeItem,
        onToggle: this.toggle,
      })
    )

    return (
      <div className="accordion">{accordionItems}</div>
    )
  }
}

Accordion.Item = AccordionItem


export default Accordion
export {
  Accordion,
  AccordionItem,
}
