import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
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

  console.log(getInvItems);

  return (
    <Container fluid>
      <Row>
        {getInvItems
          ? getInvItems.map((a, i) => {
              console.log('a: ', a);
              return (
                <Col md="4" key={i}>
                  <InventoryCard cardTitle={a.name} cardDesc={a.description} id={i} />
                </Col>
              );
            })
          : null}
      </Row>
    </Container>
  );
};

export default InventoryComponentWrapper;
