import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

const InventoryComponentWrapper = props => {
  const { inventory, categories, image } = props;

  // grabs the current path
  const categoryParam = props.match.params.category;
  const subCategoryParam = props.match.params.subcategory;

  const getInvItems = inventory
    ? inventory[categoryParam]
        .map(a => {
          if (a.subcategory === subCategoryParam) {
            return a.name;
          }
        })
        .filter(a => a !== undefined)
    : null;

  console.log(getInvItems);

  return (
    <Container fluid>
      <Row>
        {getInvItems
          ? getInvItems.map(a => (
              <Col key={a}>
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

export default InventoryComponentWrapper;
