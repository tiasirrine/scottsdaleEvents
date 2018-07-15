import React from 'react';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const CategoryComponent = props => (
  <Col>
    <Link to={`/inventory/${props.path}`}>
      <img className="image" src={props.image} />
      <p>{props.title}</p>
    </Link>
  </Col>
);
