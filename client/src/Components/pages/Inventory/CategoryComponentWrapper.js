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
              <Col md="3" key={a} className="ind-card-col">
                <Card className="card card-cascade wider reverse my-4 animated fadeInUpBig">
                  <Link to={`/inventory/${a}`}>
                    <div className="view view-cascade overlay">
                      <View zoom>
                        <CardImage
                          cascade
                          src={image}
                          className="img-fluid ind-card-image"
                          alt="Category Image"
                        />
                        <div class="mask flex-center waves-effect waves-light cat-names text-justify rgba-white-strong">
                          <strong>{a}</strong>
                        </div>
                      </View>
                    </div>
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
