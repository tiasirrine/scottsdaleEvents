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

const CategoryComponentWrapper = props => {
  const { categories, image } = props;

  return (
    <Container fluid>
      <Row>
        {categories
          ? categories.map(a => (
              <Col md="4" key={a} className="ind-card-col">
                <Card className="card card-cascade wider reverse my-4 animated fadeInUpBig">
                  <Link to={`/inventory/${a}`}>
                    <div className="mask rgba-white-slight waves-effect waves-light" />
                    <div className="view view-cascade overlay">
                      <View zoom>
                        <CardImage
                          src={image}
                          className="img-fluid ind-card-image"
                          alt="Category Image"
                        />
                      </View>
                    </div>
                    <CardBody className="card-body card-body-cascade text-center">
                      <CardTitle>
                        <strong>{a}</strong>
                      </CardTitle>
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            ))
          : null}
      </Row>
    </Container>
  );
};

export default CategoryComponentWrapper;
