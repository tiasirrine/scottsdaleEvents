/* eslint-disable */
import './Checkout.css';
import React, { Component } from 'react';
import {
  Container,
  Table,
  Input,
  Button,
  Popover,
  PopoverBody,
  PopoverHeader
} from 'mdbreact';
import API from '../../../api/API';
import { Link } from 'react-router-dom';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCart: null,
      error: null,
      cartName: ''
    };
    this.getCartId = () => this.state.activeCart[0].CartId;
  }

  // gets active cart for a customer
  componentDidMount() {
    window.scrollTo(0, 0);

    if (!this.props.location.state) {
      API.getCarts()
        .then(res => {
          this.setState({
            activeCart: this.sortCart(res.data),
            cartName: res.data[0].cartName
          });
        })
        .catch(error => {
          const err =
            error.message && error.message.includes('timeout')
              ? 'Connection timed out'
              : error.response.data.message;
          this.setState({ error: err });
        });
    } else {
      this.setState({
        activeCart: this.sortCart(this.props.location.state.viewCart),
        cartName: this.props.location.state.viewCart[0].cartName
      });
    }
  }

  sortCart = data => {
    if (data.length) {
      const activeCart = data[0].CartProducts;

      // grabs the pertinent data from the cart
      return activeCart.map(a => {
        // finds the total cost based on price and qty
        a.Product.total = (a.qty * Number(a.Product.price)).toString();
        a.Product.qty = a.qty.toString();
        a.Product.CartId = a.CartId;
        a.Product.CartProductId = a.id;

        return a.Product;
      });
    }
  };

  nameCart = e => {
    const id = this.getCartId();
    const { value, name } = e.target;
    this.setState({ [name]: value });
    API.updateCartName(id, e.target.value)
      .then()
      .catch(error => {
        console.log(error);
        const err =
          error.message && error.message.includes('timeout')
            ? 'Connection timed out'
            : error.response.data.message;
        this.setState({ error: err });
      });
  };

  // used to update the quantity to checkout
  onChange = e => {
    // gets the name and value from the input field
    const { name } = e.target;
    // value is the quantity to update
    let { value } = e.target;
    // this is the product id of the product to update
    const ProductId = e.target.getAttribute('data-id');

    // ensures only numbers are passed in
    if (isNaN(value.slice(-1))) {
      value = value.replace(/[^0-9]+/g, '');
    }

    API.updateQty({ ProductId, qty: Number(value), CartId: this.getCartId() })
      .then(result => {
        // updates the appropriate object with the new quantity and price
        // loops through the active cart array
        const updated = this.state.activeCart.map(a => {
          // if the id of the current object matches the id of the saved object,
          // then attempt to save the new quantity
          if (a.id === ProductId) {
            // does a check to make sure only a valid quantity gets saved to the db
            if (value > 0 && value <= a.quantity) {
              a.qty = value;
              a.total = Number(a.price) * Number(value);
            }
          }
          return a;
        });

        this.setState({ products: updated, error: null });
      })
      .catch(error => {
        console.log(error);
        const err =
          error.message && error.message.includes('timeout')
            ? 'Connection timed out'
            : error.response.data.message;
        this.setState({ error: err });
      });
  };

  // deletes a product from the cart.
  deleteProduct = e => {
    // cartProductId is needed to know which product to delete from
    // the cartProducts table
    const cartProductId = e.target.getAttribute('data-cartproductid');

    // i is used in case there is an error. indicates which product had the error
    // while deleting
    const i = e.target.getAttribute('data-index');

    // grabs the name value of the clicked element
    const { name } = e.target;

    API.deleteProduct({ cartProductId })
      .then(res => {
        // copies the current value of the saved products to a new array
        // loops through the saved products
        // returns a new array without the clicked element
        const updated = [...this.state.activeCart]
          .map(a => {
            if (a.name !== name) {
              return a;
            }
          })
          .filter(a => a !== undefined);
        this.setState({ activeCart: updated });
      })
      .catch(error => {
        const err =
          error.message && error.message.includes('timeout')
            ? 'Connection timed out'
            : error.response.data.message;
        this.setState({ error: err });
      });
  };

  // allows the form to submit on enter.
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  };

  createSelectItems(value) {
    let items = [];
    for (let i = 1; i <= value.quantity; i++) {
      items.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return items;
  }

  render() {
    const { activeCart } = this.state;

    Array.prototype.sum = function(prop) {
      var totalPrice = 0;
      for (var i = 0, _len = this.length; i < _len; i++) {
        totalPrice += parseInt(this[i][prop]);
      }
      sessionStorage.setItem('cartTotal', totalPrice);
      return totalPrice;
    };

    if (activeCart && !activeCart.length) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '70vh'
          }}
        >
          <h3>Your cart is empty</h3>
          <br />
          <Link id="browse-btn" to="/inventory">
            Browse our inventory to get started!
          </Link>
        </div>
      );
    } else if (!activeCart) {
      return <div className="loader" />;
    } else {
      return (
        <Container className="cart-top">
          {this.state.error && (
            <div className="text-center text-danger mb-2">
              <p>{this.state.error}</p>
            </div>
          )}
          <Input
            value={this.state.cartName}
            label="Cart Name"
            name="cartName"
            onChange={this.nameCart}
            group
            type="text"
            className="w-25"
          />
          <Table hover>
            <thead className="blue-grey lighten-4">
              <tr>
                <th>
                  <b>Product</b>
                </th>
                <th>
                  <b>Quantity</b>
                </th>
                <th className="text-center">
                  <b>Inventory</b>
                </th>
                <th>
                  <b>Price</b>
                </th>
                <th>
                  <b>Total</b>
                </th>
                <th>
                  <b>Remove</b>
                </th>
              </tr>
            </thead>
            <tbody>
              {activeCart &&
                activeCart.map((a, i) => {
                  return (
                    <tr key={i}>
                      <td scope="row">{a.name}</td>
                      <td>
                        <label className="mr-2">Current:</label>
                        <select
                          data-id={a.id}
                          className="browser-default"
                          onChange={this.onChange}
                          name={a.name}
                        >
                          <option>{activeCart[i].qty}</option>
                          {this.createSelectItems(activeCart[i])}
                        </select>
                      </td>
                      <td className="text-center">{activeCart[i].quantity}</td>
                      <td>${activeCart[i].price}</td>
                      <td>${activeCart[i].total}</td>
                      <td>
                        {' '}
                        <Popover
                          component="div"
                          placement="right"
                          popoverBody="Remove"
                          className="text-danger remove-pointer"
                        >
                          <PopoverHeader className="text-center remove-pointer text-primary">
                            {' '}
                            Are You Sure?
                          </PopoverHeader>
                          <PopoverBody className="text-center">
                            {' '}
                            <a
                              name={a.name}
                              className="text-danger text-center"
                              onClick={this.deleteProduct}
                              data-cartproductid={a.CartProductId}
                              data-index={i}
                            >
                              {a.err ? a.err : 'Yes'}
                            </a>
                          </PopoverBody>
                        </Popover>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <div>
            <div className="text-right est-sub">
              Est Subtotal: {'   '}$
              {parseFloat(Math.round(activeCart.sum('total') * 100) / 100).toFixed(
                2
              )}
            </div>
            <div className="text-right est-sub">
              Labor(15%): {'   '}$
              {parseFloat(
                Math.round(activeCart.sum('total') * 0.15 * 100) / 100
              ).toFixed(2)}
            </div>
            <div className="text-right est-sub">
              Taxes(8.5%): {'   '}$
              {parseFloat(
                Math.round(activeCart.sum('total') * 0.085 * 100) / 100
              ).toFixed(2)}
            </div>
            <div className="text-right est-sub">
              {' '}
              Shipping: {'   '}${parseFloat(Math.round(285 * 100) / 100).toFixed(2)}
            </div>
            <div className="text-right est-sub2">______________________________</div>
            <div className="text-right est-sub2">
              Est Total: {'         '}$
              {parseFloat(
                Math.round(
                  (activeCart.sum('total') +
                    activeCart.sum('total') * 0.15 +
                    activeCart.sum('total') * 0.085 +
                    285) *
                    100
                ) / 100
              ).toFixed(2)}
            </div>
          </div>
          <Link
            className="text-white"
            to={{
              pathname: '/checkout/event',
              state: { cartProps: this.state.activeCart }
            }}
          >
            <Button color="success" className="aButton text-white">
              Next
            </Button>
          </Link>
        </Container>
      );
    }
  }
}

export default Cart;
