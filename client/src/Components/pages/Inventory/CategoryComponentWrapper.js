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
  const { categories, images } = props;
  const param = props.match.params.category;
  return (
    <Row className="justify-content-md-center">
      {categories
        ? categories.map((a, i) => (
            <Col md="6" lg="4" xl="3" key={a} className="ind-card-col">
              <Card className="card card-cascade wider reverse my-4 animated fadeInUpBig w-300">
                <Link to={`/inventory/${a}`}>
                  <div className="view view-cascade overlay">
                    <View zoom>
                      <CardImage
                        cascade
                        src={images[i]}
                        className="ind-card-image card-image"
                        alt="Category Image"
                      />
                      <div className="mask flex-center waves-effect waves-light cat-names text-justify" />
                    </View>
                  </div>
                </Link>
              </Card>
              <Link to={`/inventory/${a}`}>
                <figcaption className="figure-caption text-center">{a}</figcaption>
              </Link>
            </Col>
          ))
        : null}
    </Row>
  );
};

export default CategoryComponentWrapper;
