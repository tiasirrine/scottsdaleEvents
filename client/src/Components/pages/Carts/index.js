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
      carts: null,
      error: null,
      changeName: false,
      activeCart: null
    };

    this.id = sessionStorage.getItem('userId');
    this.handleInputChange = handleInputChange.bind(this);
    this.timeout = timeout.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
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
    sessionStorage.setItem('activeCart', mapped[i].id);

    // oldCart, newCart
    this.setState({ carts: mapped, activeCart: null });

    if (oldCart.id !== mapped[i].id) {
      API.updateActiveCart(oldCart.id, mapped[i].id)
        .then(() => {})
        .catch(error => {
          console.log(error);
        });
    }
  };

  getCarts = () => {
    API.getCarts()
      .then(result => {
        this.setState({ carts: result.data });
      })
      .catch(error => {
        const err =
          error.message && error.message.includes('timeout')
            ? 'Connection timed out'
            : error.response.data.message;
        console.log(err);
        this.setState({ error: err });
      });
  };

  createCart = () => {
    API.createCart(this.id)
      .then(() => {
        this.getCarts();
      })
      .catch(error => {
        const err =
          error.message && error.message.includes('timeout')
            ? 'Connection timed out'
            : error.response.data.message;
        console.log(err);
        this.setState({ error: err });
      });
  };

  deleteCart = (cartId, index) => {
    const carts = [...this.state.carts];
    carts.splice(index, 1);
    API.deleteCart(cartId)
      .then(() => {
        this.setState({ carts });
      })
      .catch(error => {
        const err =
          error.message && error.message.includes('timeout')
            ? 'Connection timed out'
            : error.response.data.message;
        console.log(err);
        this.setState({ error: err });
      });
  };

  changeName = (index, newName) => {
    const carts = [...this.state.carts];
    carts[index].cartName = newName;
    this.setState({ carts });
  };

  render() {
    if (!this.state.carts && !this.state.error) {
      return <div className="loader" />;
    } else {
      return (
        <Container className="margintop-100">
          <Row>
            <div className="col-lg-6 text-center text-lg-left">
              <h2>My Carts</h2>
              <p className="text-center text-danger">{this.state.error && this.state.error}</p>
            </div>
            <div className="col-lg-6 text-center text-lg-right">
              <Button onClick={this.createCart}>
                Create Cart
                {'  '}
                <i className="fa fa-wrench" aria-hidden="true" />
              </Button>
            </div>
          </Row>
          <Row>
            {this.state.carts &&
              this.state.carts.map((a, i) => (
                <UserCart
                  key={i}
                  cart={a}
                  changeName={this.changeName}
                  cartName={a.cartName}
                  setActiveCart={this.setActiveCart}
                  index={i}
                  deleteCart={this.deleteCart}
                />
              ))}
          </Row>
        </Container>
      );
    }
  }
}
