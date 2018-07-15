import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

const CategoryComponentWrapper = props => {
  const { categories, image } = props;

  return (
    <Container fluid>
      <Row>
        {categories
          ? categories.map(a => (
              <Col key={a}>
                <Link to={`/inventory/${a}`}>
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

export default CategoryComponentWrapper;
