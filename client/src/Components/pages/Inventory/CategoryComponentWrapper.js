/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImage, Col, Row, View } from 'mdbreact';

const CategoryComponentWrapper = props => {
  const { categories, images } = props;
  // const param = props.match.params.category;
  return (
    <Row className="justify-content center justify-content-lg-left">
      {categories
        ? categories.map((a, i) => (
            <Col xs="12" md="6" lg="4" xl="3" key={a} className="">
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
                <figcaption className="figure-caption text-center animated fadeInUpBig">{a}</figcaption>
              </Link>
            </Col>
          ))
        : null}
    </Row>
  );
};

export default CategoryComponentWrapper;
