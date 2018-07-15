import React, { Component, Fragment } from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle,
  Container,
  Button,
  FormGroup,
  Label,
  Input
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
    console.log(this.state);
    return (
      <Container>
        <Card className="item-card-class text-white bg-primary text-center card card-cascade narrower">
          <CardImg
            src={image}
            alt="Card image cap "
            className="view view-cascade gradient-card-header card-image"
          />
          <CardText>
            {' '}
            <div className="overlay">
              <div className="text">{this.props.cardDesc}</div>
            </div>
          </CardText>

          <CardBody>
            <CardTitle>{this.props.cardTitle}</CardTitle>
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
            {/* <CardText>Here is some text for a detailed description...or not</CardText> */}

            {/* <CardSubtitle>{this.props.cardDesc}</CardSubtitle> */}
          </CardBody>
        </Card>
        <Button
          type="submit"
          value="Submit"
          onClick={this.state.handleFormSubmit}
          data-id={this.props.id}
        >
          Add To Cart
        </Button>
      </Container>
    );
  }
}

export default InventoryCard;
