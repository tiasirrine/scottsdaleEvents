/* eslint-disable */
import React from 'react';
import { Container, Row, Col } from 'mdbreact';
import EstimateCart from '../Checkout/EstimateCart';
import EstimateDetails from '../Checkout/EstimateDetails';
import EstimateWillCall from '../Checkout/EstimateWillCall';
import { timeout } from '../../../api/validate';
import API from '../../../api/API';
import CopyCartBtn from './CopyCartBtn';

export default class ViewEstimate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cart: null, error: null, viewWillCall: false };
    this.cartId = this.props.location.state.cart.id;
    this.event = this.props.location.state.event;
    this.timeout = timeout.bind(this);
  }

  componentDidMount() {
    API.getCart(this.cartId)
      .then(result => {
        const { CartProducts } = result.data.success;
        console.log(CartProducts);
        this.setState({
          cart: this.sortCart(CartProducts),
          ...this.sortDetails(this.event),
          cartId: CartProducts[0].CartId
        });
      })
      .catch(error => {
        console.log(error.message);
        const err =
          error.message && error.message.includes('timeout')
            ? 'Connection timed out'
            : error.response.data.message;
        this.timeout({ error: err });
      });
  }

  sortCart = carts => {
    return carts.map(cart => ({
      name: cart.Product.name,
      qty: cart.qty,
      total: Number(cart.qty) * Number(cart.Product.price)
    }));
  };

  sortDetails = details => {
    delete details.Cart;
    delete details.CartId;
    delete details.CustomerId;
    delete details.id;
    const detailsFirst = Object.keys(details).slice(0, 6);
    const detailsSecond = Object.keys(details).slice(6, 12);
    const detailsWill = Object.keys(details).slice(12, 17);
    const viewWillCall = this.viewWillCall(detailsWill, details);
    return { detailsFirst, detailsSecond, detailsWill, viewWillCall };
  };

  viewWillCall = (keys, details) => {
    let hasValues = false;

    keys.map(key => {
      if (details[key]) {
        hasValues = true;
        return;
      }
    });

    return hasValues;
  };

  render() {
    return (
      <Container className="mt-5">
        <div className="text-center">
          <h3 style={{ marginTop: '80px' }} className="mb-3">
            Summary
          </h3>
          <CopyCartBtn cartId={this.state.cartId} />
          {this.state.error && <p>{this.state.error}</p>}
        </div>
        <Row>
          <Col lg="6">
            <EstimateCart cart={this.state.cart} />
          </Col>
          <Col lg="6">
            <EstimateDetails
              detailsCol1={this.state.detailsFirst}
              detailsCol2={this.state.detailsSecond}
              realValues={this.event}
            />
          </Col>
        </Row>
        {this.state.viewWillCall && (
          <EstimateWillCall
            details={this.state.detailsWill}
            realValues={this.event}
          />
        )}
      </Container>
    );
  }
}
