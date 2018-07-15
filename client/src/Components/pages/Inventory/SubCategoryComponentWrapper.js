import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

const SubCategoryComponentWrapper = props => {
  const { inventory, image } = props;

  // grabs the current path
  const param = props.match.params.category;

  // will contain the subcategories, if there are any
  const subCategories = [];

  // grabs the sub categories
  const getSubCategories = inventory
    ? inventory[param].map(a => {
        if (!subCategories.includes(a.subcategory)) {
          subCategories.push(a.subcategory);
        }
      })
    : null;

  // checks if there are no sub categories. if not, gets the inventory items.
  const getInvItems = subCategories.includes('')
    ? inventory[param].map(a => a.name)
    : null;

  // contains individual inventory items if there are no sub categories
  const itemsToRender = subCategories.length ? subCategories : null;

  return (
    <Container fluid>
      <Row>
        {itemsToRender && !getInvItems
          ? itemsToRender.map(a => (
              <Col key={a}>
                <Link to={`${props.match.url}/${a}`}>
                  <img className="image" src={image} />
                  <p>{a}</p>
                </Link>
              </Col>
            ))
          : null}
        {getInvItems
          ? getInvItems.map((a, i) => (
              <Col key={i}>
                <Link to={`${props.match.url}/${a}`}>
                  <img className="image" src={image} />
                  <p>{a}</p>
                </Link>
              </Col>
            ))
          : null}
      </Row>
    </Container>
  );
};

export default SubCategoryComponentWrapper;
