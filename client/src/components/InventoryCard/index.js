// get card component used for inventory item
// click on image, could expand card
// click on a catrgory and go to a new route for that cat
// create a new page folder call inventory
// witihn inventory, need, inventory card
// when somebody clicks on bar, it takes them to inventory / bars
// create an aray with fake data, get data from database, (we dont have this)
// button on card to add quanitity and item to cart(+ or -)
import React, { Component, Fragment } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

const InventoryCard = props => {
  return (
    <div>
      <Card>
        <CardImg
          top
          width="100%"
          src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>{props.item}</CardTitle>
          <CardSubtitle>{props.indItem}</CardSubtitle>
          <CardText>Here is some text for a detailed description...or not</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default InventoryCard;
