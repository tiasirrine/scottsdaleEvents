// get card component used for inventory item
// click on image, could expand card
// click on a catrgory and go to a new route for that cat
// create a new page folder call inventory
// witihn inventory, need, inventory card
// when somebody clicks on bar, it takes them to inventory / bars
// create an aray with fake data, get data from database, (we dont have this)
// button on card to add quanitity and item to cart(+ or -)

//turn into a class, statefull
//keep track of state, quantity
//update state when click - or +
// whaen user hits submit, save the value of the state (track it)
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
  Col
} from 'reactstrap';
import images from './Images';
import './InventoryPage.css';

class InventoryCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card className="item-card-class">
        <CardImg top width="50px" src="http://via.placeholder.com/100x100" alt="Card image cap" />
        <CardBody>
          <CardTitle>{this.props.cardTitle}</CardTitle>
          <CardSubtitle>a subtitle</CardSubtitle>
          <CardText>Here is some text for a detailed description...or not</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    );
  }
}

// const InventoryCard = props => {
//   return (

//   );
// };

export default InventoryCard;
