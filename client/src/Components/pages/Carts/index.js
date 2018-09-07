/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { Container, Row, Button, Card, CardBody, CardTitle, Input } from 'mdbreact';
import API from '../../../api/API';
import { handleInputChange, timeout } from '../../../api/validate';
import UserCart from './UserCart';

export default class Carts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carts: [],
      //TODO: handle errors
      error: null,
      changeName: false,
      activeCart: null
    };

    this.id = sessionStorage.getItem('userId');
    this.handleInputChange = handleInputChange.bind(this);
    this.timeout = timeout.bind(this);
  }

  componentDidMount() {
    this.getCarts();
  }

  setActiveCart = i => {
    const carts = [...this.state.carts];
    let oldCart;

    const mapped = carts.map(a => {
      if (a.isActive === true) {
        oldCart = a;
      }
      a.isActive = false;
      return a;
    });

    mapped[i].isActive = true;

    // oldCart, newCart

    if (oldCart.id !== mapped[i].id) {
      API.updateActiveCart(oldCart.id, mapped[i].id)
        .then(() => {
          this.setState({ carts: mapped, activeCart: null });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  getCarts = () => {
    API.getCarts()
      .then(result => {
        console.log(result);
        this.setState({ carts: result.data });
      })
      .catch(error => {
        const err =
          error.message && error.message.includes('timeout')
            ? 'Connection timed out'
            : error.response.data.message;
        this.setState({ error: err });
      });
  };

  render() {
    if (!this.state.carts.length) {
      return <div className="loader" />;
    }
    return (
      <Container>
        <h2>My Carts</h2>
        <Row>
          {this.state.carts.length &&
            this.state.carts.map((a, i) => (
              <UserCart
                key={i}
                cart={a}
                cartName={a.cartName}
                setActiveCart={this.setActiveCart}
                index={i}
              />
            ))}
        </Row>
      </Container>
    );
  }
}
