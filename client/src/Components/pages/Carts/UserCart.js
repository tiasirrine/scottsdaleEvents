/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { Container, Row, Button, Card, CardBody, CardTitle, Input } from 'mdbreact';
import API from '../../../api/API';
import { handleInputChange, timeout } from '../../../api/validate';
import { Link } from 'react-router-dom';

export default class UserCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      changeName: false,
      cartName: null,
      cart: null
    };

    this.id = sessionStorage.getItem('userId');
    this.handleInputChange = handleInputChange.bind(this);
    this.timeout = timeout.bind(this);
    this.cart = () => this.props.cart;
    this.index = this.props.index;
    this.cartId = this.props.cart.id;
  }

  componentDidMount() {
    this.setState({ cartName: this.props.cartName, cart: this.props.cart });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cart.id !== this.props.cart.id) {
      this.setState({ cartName: this.props.cartName, cart: this.props.cart });
    }
  }

  nameBtnClick = () => (this.state.changeName ? this.saveName() : this.changeName());

  changeName = () => this.setState({ changeName: true });

  saveName = () => {
    this.setState({ changeName: false });
    API.updateCartName(this.cart().id, this.state.cartName)
      .then(() => this.props.changeName(this.props.index, this.state.cartName))
      .catch(error => {
        console.log(error);
        const err =
          error.message && error.message.includes('timeout')
            ? 'Connection timed out'
            : error.response.data.message;
        this.setState({ error: err });
      });
  };

  setHeight = () => {
    if (!this.state.changeName) {
      return { minHeight: '287px' };
    } else {
      return { minHeight: '345px' };
    }
  };

  render() {
    return (
      <div className="col-lg-4">
        <Card style={this.setHeight()}>
          <CardBody style={{ paddingLeft: '0px' }}>
            {!this.state.changeName ? (
              <CardTitle style={{ paddingLeft: '1.25rem' }}>
                {this.state.cartName}
              </CardTitle>
            ) : (
              <div style={{ margin: '0 1.25rem' }}>
                <Input
                  value={this.state.cartName}
                  name="cartName"
                  onChange={this.handleInputChange}
                  group
                  type="text"
                />
              </div>
            )}
            {this.cart().isActive ? (
              <span
                style={{ padding: '.25rem 1.25rem' }}
                className="bg-success text-white rounded-right"
              >
                Active
              </span>
            ) : (
              <br />
            )}
            <div className="mt-2" style={{ paddingLeft: '1.25rem' }}>
              <p className="mb-1">Last Modified: {this.cart().date}</p>
              <Link
                className="text-white"
                to={{
                  pathname: '/checkout/cart',
                  state: { viewCart: [this.cart()] }
                }}
              >
                <Button size="md" className="text-white w-100 mx-0">
                  View
                </Button>
              </Link>
              <Button
                onClick={() => this.props.setActiveCart(this.props.index)}
                size="md"
                className="text-white w-100 mx-0"
              >
                Set Active Cart
              </Button>
              <Button
                onClick={this.nameBtnClick}
                size="md"
                className="text-white w-100 mx-0"
              >
                {this.state.changeName ? 'Save' : 'Change Name'}
              </Button>
              {!this.props.cart.isActive && (
                <Button
                  onClick={() => this.props.deleteCart(this.cartId, this.index)}
                  className="text-white w-100 mx-0"
                  size="md"
                >
                  Delete
                </Button>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}
