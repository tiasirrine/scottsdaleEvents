/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { Container, Row, Button, Card, CardBody, CardTitle, Input } from 'mdbreact';
import API from '../../../api/API';
import { handleInputChange, timeout } from '../../../api/validate';
import { Link } from 'react-router-dom';

export default class EstimateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estimate: this.props.estimate
    };
  }

  render() {
    return (
      <div className="col-lg-4">
        <Card>
          <CardBody style={{ paddingLeft: '0px' }}>
            <CardTitle style={{ paddingLeft: '1.25rem' }}>
              {this.state.estimate.Cart.cartName}
            </CardTitle>

            <div className="mt-2" style={{ paddingLeft: '1.25rem' }}>
              <p className="mb-1">Checkout Date: {this.state.estimate.Cart.date}</p>
              <p className="mb-1">Estimate ID: {this.state.estimate.id}</p>
              <Link
                className="text-white"
                to={{
                  pathname: `/estimates/${this.state.estimate.id}`,
                  state: {
                    event: this.state.estimate,
                    cart: this.state.estimate.Cart
                  }
                }}
              >
                <Button size="md" className="text-white w-100 mx-0">
                  View
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}
