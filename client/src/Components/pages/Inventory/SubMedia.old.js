import React, { Component, Fragment } from 'react';
import Link from 'react-router-dom';
import { Media } from 'reactstrap';
import image from '../../../images/Photos/Bars/bar10.jpg';
import { Container, Row, Col } from 'reactstrap';
import './InventoryPage.css';

class SubMedia extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.state);
    return (
      <Container>
        <Row>
          <Col sm="3">
            <img className="image" src={image} />
            <p>{this.props.cardTitle}</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SubMedia;

// <Media href={image}>
//   <Media object data-src={image} alt="placeholder image" />
// </Media>
