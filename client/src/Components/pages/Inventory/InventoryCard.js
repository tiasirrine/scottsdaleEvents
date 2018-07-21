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
import API from '../../../api/API';

class InventoryCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = event => {
    const { name } = event.target;
    let { value } = event.target;
    // ensures only numbers are passed in
    if (isNaN(value.slice(-1))) {
      value = value.replace(/[^0-9]+/g, '');
    }
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const obj = {};
    obj.ProductId = event.target.getAttribute('data-id');
    obj.qty = this.state.quantity;
    obj.CartId = sessionStorage.activeCart;

    API.saveProduct(obj)
      .then(data => console.log(data))
      .catch(err => console.log(err));
    // const copyofReturned = this.state.quantity.slice();
    // const articleToSave = copyofReturned[event.target.getAttribute('data-id')];
    // const objectToSave = {};
    // objectToSave.quantity = articleToSave.quantity;
    // this.setState({ quantity: this.state.quantity });
    // console.log(objectToSave);
    // //code to save to db or save the state for cart goes here
  };

  render() {
    console.log('state: ', this.state);
    console.log('props: ', this.props);
    return (
      <Card className="py-3 clearfix inventory-card">
        <Row className="justify-content-md-center inventory-card">
          <Col md="4">
            <CardImg
              src={image}
              alt={this.props.cardTitle}
              className="d-flex align-self-center mr-3"
            />
          </Col>
          <Col md="8" className="px-3">
            <CardBody className="px-3">
              <CardTitle>{this.props.cardTitle}</CardTitle>
              <CardText>{this.props.cardDesc}</CardText>
              <CardText>${this.props.cardPrice}</CardText>
              <FormGroup>
                <Row>
                  <Col md="6">
                    <Label for="item-quantity" />
                    {sessionStorage.isAuthed && (
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
                        className="float-left"
                      />
                    )}
                  </Col>
                  <Col md="6">
                    {sessionStorage.isAuthed && (
                      <Button
                        type="submit"
                        value="Submit"
                        onClick={this.handleFormSubmit}
                        data-id={this.props.id}
                        className="float-left"
                      >
                        Add To Cart
                      </Button>
                    )}
                  </Col>
                </Row>
              </FormGroup>
            </CardBody>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default InventoryCard;
