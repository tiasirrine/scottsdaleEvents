import React, { Component, Fragment } from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle,
  Col,
  Container,
  Button,
  FormGroup,
  Label,
  Input,
  Row
} from 'reactstrap';
import './InventoryPage.css';
import image from '../../../images/Photos/event7.jpg';

class InventoryCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const copyofReturned = this.state.quantity.slice();
    const articleToSave = copyofReturned[event.target.getAttribute('data-id')];
    const objectToSave = {};
    objectToSave.quantity = articleToSave.quantity;

    this.setState({ quantity: this.state.quantity });
    console.log(objectToSave);
    //code to save to db or save the state for cart goes here
  };

  render() {
    console.log('state: ', this.state);
    console.log('props: ', this.props);
    return (
      <Card className="py-3">
        <Row>
          <Col md="4">
            <CardImg src={image} alt="Card image cap " />
          </Col>
          <Col md="8" className="px-3">
            <CardBody className="px-3">
              <CardTitle>{this.props.cardTitle}</CardTitle>
              <CardText>{this.props.cardDesc}</CardText>
              <FormGroup>
                <Label for="item-quantity" />
                <Input
                  value={this.state.quantity}
                  onChange={this.handleInputChange}
                  data-id={this.props.id}
                  type="number"
                  name="quantity"
                  id="item-quantity"
                  max="1000"
                  maxLength="4"
                  placeholder={'Quantity'}
                />
              </FormGroup>

              <Button
                type="submit"
                value="Submit"
                onClick={this.state.handleFormSubmit}
                data-id={this.props.id}
              >
                Add To Cart
              </Button>
            </CardBody>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default InventoryCard;
