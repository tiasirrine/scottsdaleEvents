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
  Row,
  View
} from 'mdbreact';
import InventoryCard from './InventoryCard';

const SubCategoryComponentWrapper = props => {
  const { inventory, image } = props;

  // grabs the current path
  const param = props.match.params.category;

  // will contain the subcategories, if there are any
  const subCategories = [];

  // grabs the sub categories. Even though this "isn't being used", its needed for getInvItems
  const getSubCategories = inventory
    ? inventory[param].map(a => {
        if (!subCategories.includes(a.subcategory)) {
          subCategories.push(a.subcategory);
        }
      })
    : null;

  // checks if there are no sub categories. if not, gets the inventory items.
  const getInvItems = subCategories.includes('')
    ? inventory[param].map(a => a)
    : null;

  // contains individual inventory items if there are no sub categories
  const itemsToRender = subCategories.length ? subCategories : null;

  return (
    <Container fluid>
      <Row>
        {itemsToRender && !getInvItems
          ? itemsToRender.map(a => (
              <Col md="4" key={a} className="ind-card-col">
                <Card className="card card-cascade wider reverse my-4 animated fadeInUpBig">
                  <Link to={`${props.match.url}/${a}`}>
                    <div className="mask rgba-white-slight waves-effect waves-light" />
                    <div className="view view-cascade overlay">
                      <View zoom>
                        <CardImage
                          cascade
                          src={image}
                          className="img-fluid ind-card-image"
                          alt="Category Image"
                        />
                      </View>
                    </div>
                    <CardBody
                      cascade
                      className="card-body card-body-cascade text-center"
                    >
                      <CardTitle>
                        <strong>{a}</strong>
                      </CardTitle>
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            ))
          : null}

        {getInvItems
          ? getInvItems.map((a, i) => {
              return (
                <InventoryCard
                  key={i}
                  cardTitle={a.name}
                  cardDesc={a.description}
                  id={i}
                />
              );
            })
          : null}
      </Row>
    </Container>
  );
};

export default SubCategoryComponentWrapper;
