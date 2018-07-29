import './Cart.css';
import React, { Component } from 'react';
import {
  Container,
  Table,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'mdbreact';
import API from '../../../api/API';
import auth from '../../../api/auth';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCart: null,
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    // gets active cart for a customer
    window.scrollTo(0, 0);

    if (auth.isAuthed()) {
      API.loadCart(auth.userId())
        .then(res => {
          console.log(res.data);
          // grabs the pertinent data from the cart
          const data = res.data[0].CartProducts.map(a => {
            // finds the total cost based on price and qty
            a.Product.total = (a.qty * Number(a.Product.price)).toString();
            a.Product.qty = a.qty.toString();
            a.Product.CartId = a.CartId;
            a.Product.CartProductId = a.id;
            return a.Product;
          });
          console.log(data);
          this.setState({ activeCart: data });
        })
        .catch(err => console.log(err.response.data));
    }
  }

  onChange = e => {
    // gets the name and value from the input field
    const { name } = e.target;
    let { value } = e.target;

    // ensures only numbers are passed in
    if (isNaN(value.slice(-1))) {
      value = value.replace(/[^0-9]+/g, '');
    }

    // updates the appropriate object with the new quantity and price
    const updated = this.state.activeCart.map(a => {
      if (a.name === name) {
        a.qty = value;
        a.total = Number(a.price) * Number(value);
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

  onSubmit = () => {
    API.getEstimate(this.state)
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    // console.log(this.state);
    const { activeCart } = this.state;
    Array.prototype.sum = function(prop) {
      var totalPrice = 0;
      for (var i = 0, _len = this.length; i < _len; i++) {
        totalPrice += parseInt(this[i][prop]);
      }
      return totalPrice;
    };

    if ((activeCart && !activeCart.length) || !activeCart) {
      return <h3>Your cart is empty</h3>;
    } else {
      return (
        <Container className="cart-top">
          <Table>
            <thead className="blue-grey lighten-4">
              <tr>
                <th>Product</th>
                <th>Quantity</th>
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
                          onChange={this.onChange}
                          name={a.name}
                          label="Quantity"
                          value={activeCart[i].qty}
                          size="sm"
                        />
                      </td>
                      <td>${activeCart[i].price}</td>
                      <td>${activeCart[i].total}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <div className="text-right">${activeCart.sum('total')}</div>
          <Button
            color="success"
            onClick={(this.onSubmit, this.toggle)}
            className="aButton"
          >
            Submit
          </Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Thank you!</ModalHeader>
            <ModalBody>Your order has been placed.</ModalBody>
            <ModalFooter>
              <Button className="aButton" onClick={this.toggle}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      );
    }
  }
}

export default Cart;
