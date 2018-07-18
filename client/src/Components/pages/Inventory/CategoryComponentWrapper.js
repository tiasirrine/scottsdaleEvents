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

const CategoryComponentWrapper = props => {
  const { categories, image } = props;
  let indCards = categories
    ? categories.map(a => {
        return (
          <Col md="4" key={a}>
            {' '}
            <Card className="card-image" style={{ backgroundImage: `url(${image})` }} key={a}>
              <div className=" card-text text-white text-bottom  rgba-black-light py-5 px-4">
                <div>
                  <CardTitle tag="h3" className="pt-2 card-title-text">
                    {a}
                  </CardTitle>
                  <Link to={`/inventory/${a}`} className="white-text d-flex justify-content-end">
                    <h5>
                      See more <Fa icon="angle-double-right" />
                    </h5>
                  </Link>
                </div>
              </div>
            </Card>
          </Col>
        );
      })
    : null;

  return (
    <Container fluid>
      <Row>{indCards}</Row>
    </Container>
  );
};

export default CategoryComponentWrapper;
