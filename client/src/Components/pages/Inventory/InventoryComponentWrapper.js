import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardDeck,
  CardGroup,
  CardImage,
  CardTitle,
  CardText,
  Col,
  Container,
  Fa,
  Row
} from 'mdbreact';
import InventoryCard from './InventoryCard';

const InventoryComponentWrapper = props => {
  const { inventory, categories, image } = props;

  // grabs the current path
  const categoryParam = props.match.params.category;
  const subCategoryParam = props.match.params.subcategory;

  const getInvItems = inventory
    ? inventory[categoryParam]
        .map(a => {
          if (a.subcategory === subCategoryParam) {
            return a;
          }
        })
        .filter(a => a !== undefined)
    : null;

  return (
    <Container fluid>
      {getInvItems
        ? getInvItems.map((a, i) => {
            return (
              <InventoryCard
                key={i}
                cardTitle={a.name}
                cardDesc={a.description}
                cardPrice={a.price}
                id={a.id}
              />
            );
          })
        : null}
    </Container>
  );
};

export default InventoryComponentWrapper;
