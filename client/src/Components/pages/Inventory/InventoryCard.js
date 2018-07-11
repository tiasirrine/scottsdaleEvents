import React, { Component, Fragment } from 'react';
import {
  Card,
  CardDeck,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';
import images from './Images';
import './InventoryPage.css';

class InventoryCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state.quantity);
  };

  render() {
    return (
      <Card className="item-card-class">
        <CardImg top width="50px" src="http://via.placeholder.com/100x100" alt="Card image cap" />
        <CardBody>
          <CardTitle>{this.props.cardTitle}</CardTitle>
          <CardSubtitle>
            {' '}
            <FormGroup>
              <Label for="item-quantity">Quantity</Label>
              <Input
                value={this.state.quantity}
                onChange={this.handleInputChange}
                type="number"
                name="quantity"
                id="item-quantity"
                max="1000"
                maxLength="4"
                placeholder={'Quantity Needed'}
              />
            </FormGroup>
          </CardSubtitle>
          {/* <CardText>Here is some text for a detailed description...or not</CardText> */}
          <Button>Add To Cart</Button>
        </CardBody>
      </Card>
    );
  }
}

export default InventoryCard;
