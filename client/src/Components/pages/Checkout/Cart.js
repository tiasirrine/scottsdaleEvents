import './Checkout.css';
import React, { Component } from 'react';
import { Container, Table, Input, Button } from 'mdbreact';
import API from '../../../api/API';
import { Link } from 'react-router-dom';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCart: null,
      errorMsg: null
    };
  }

  // gets active cart for a customer
  componentDidMount() {
    window.scrollTo(0, 0);

    API.loadCart()
      .then(res => {
        console.log('asdf', res.data);
        // only sorts the active cart if there are items already saved for it
        if (res.data.length) {
          const activeCart = res.data[0].CartProducts;
          console.log(activeCart);
          // grabs the pertinent data from the cart
          const sortedActiveCart = activeCart.map(a => {
            // finds the total cost based on price and qty
            a.Product.total = (a.qty * Number(a.Product.price)).toString();
            a.Product.qty = a.qty.toString();
            a.Product.CartId = a.CartId;
            a.Product.CartProductId = a.id;
            return a.Product;
          });

          this.setState({
            activeCart: sortedActiveCart
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

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
          API.updateQty({ ProductId, qty: Number(value) })
            .then(result => {
              console.log(result);
            })
            .catch(err => {
              console.log(err.response.data);
              this.setState({ errorMsg: err.response.data });
            });
        }
      }
      return a;
    });

    this.setState({ products: updated });
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
      .catch(err => {
        // copies the current state value to make changes
        const copy = [...this.state.activeCart];
        // the .err value is checked at render to display the err message
        copy[i].err = err.response.data;
        this.setState({ products: copy });
      });
  };

  // allows the form to submit on enter.
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  };

  createSelectItems() {
    let items = [];
    for (let i = 0; i <= this.props.maxValue; i++) {
      items.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return items;
  }

  render() {
    console.log('cart: ', this.state);
    const { activeCart } = this.state;

    Array.prototype.sum = function(prop) {
      var totalPrice = 0;
      for (var i = 0, _len = this.length; i < _len; i++) {
        totalPrice += parseInt(this[i][prop]);
      }
      return totalPrice;
    };

    if (activeCart && !activeCart.length) {
      return <h3>Your cart is empty</h3>;
    } else if (!activeCart) {
      return <div className="loader" />;
    } else {
      return (
        <Container className="cart-top">
          {this.state.errorMsg && (
            <div className="text-center text-danger mb-2">
              <small>{this.state.errorMsg}</small>
            </div>
          )}
          <Table>
            <thead className="blue-grey lighten-4">
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total Quantity in Inventory</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {activeCart &&
                activeCart.map((a, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">
                        {a.name}
                        <br />
                        <br />
                        <a
                          name={a.name}
                          className={`text-danger`}
                          onClick={this.deleteProduct}
                          data-cartproductid={a.CartProductId}
                          data-index={i}
                        >
                          {a.err ? a.err : 'Remove'}
                        </a>
                      </th>
                      <td>
                        <Input
                          data-id={a.id}
                          type="number"
                          onChange={this.onChange}
                          name={a.name}
                          value={activeCart[i].qty}
                          size="sm"
                          max={a.quantity}
                          min="0"
                        />
                      </td>
                      <td>{activeCart[i].quantity}</td>
                      <td>${activeCart[i].price}</td>
                      <td>${activeCart[i].total}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <div className="text-right">
            Est Subtotal: {'   '}${activeCart.sum('total')}
          </div>

          <Link to={{ pathname: '/checkout/event', state: { cartProps: this.state.activeCart } }}>
            <Button color="success" className="aButton">
              Next
            </Button>
          </Link>
        </Container>
      );
    }
  }
}

export default Cart;
