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
  Fa,
  Row
} from 'mdbreact';

const CategoryComponentWrapper = props => {
  const { categories, image } = props;

  return (
    <div className="container-fluid">
      <Row>
        {categories
          ? categories.map(a => (
              <Card
                className="card-image"
                style={{ backgroundImage: 'url(' + { image } + ')' }}
                key={a}
              >
                <div className="text-white text-center d-flex align-items-center rgba-indigo-strong py-5 px-4">
                  <CardTitle>{a}</CardTitle>
                  <Link to={`/inventory/${a}`}>
                    {/* <CardImage className="image" src={image} /> */}

                    <Button color="deep-orange">
                      <Fa icon="clone left" /> View project
                    </Button>
                  </Link>
                </div>
              </Card>
            ))
          : null}
      </Row>
    </div>
  );
};

export default CategoryComponentWrapper;
