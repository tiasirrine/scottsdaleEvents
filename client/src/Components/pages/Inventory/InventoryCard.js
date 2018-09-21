/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { Button, Card, CardImage, Input, Row, View } from 'mdbreact';
import './InventoryPage.css';
import API from '../../../api/API';
import { Link } from 'react-router-dom';

class InventoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      isAuthed: false,
      success: null,
      error: null,
      isAdmin: null
    };
  }

  // checks if a user is authed. If so, displays cart and qty.
  componentDidMount() {
    API.checkToken()
      .then(res => this.setState({ isAuthed: true, isAdmin: res.data.isAdmin }))
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    clearTimeout(this.reset);
  }

  // updates qty for a product
  handleInputChange = event => {
    const { name } = event.target;
    let { value } = event.target;
    // ensures only numbers are passed in
    if (isNaN(value.slice(-1))) {
      value = value.replace(/[^0-9]+/g, '');
    }
    this.setState({
      [name]: value
    });
  };

  reset = () => setTimeout(() => this.setState({ success: null, error: null, quantity: 0 }), 3000);

  // saves the product to the users cart.
  handleFormSubmit = event => {
    // prevents adding 0 items of something or too many
    if (this.state.quantity > 0 && this.state.quantity <= parseInt(this.props.cardQuantity)) {
      event.preventDefault();
      // grabs the values needed for the product to save to the cart
      const obj = {};
      obj.ProductId = event.target.getAttribute('data-id');
      obj.qty = this.state.quantity;
      obj.CartId = sessionStorage.getItem('activeCart');
      obj.maxQty = event.target.getAttribute('data-maxqty');

      API.saveProduct(obj)
        .then(result => {
          this.setState({ success: result.data.success });
          this.reset();
        })
        .catch(error => {
          console.log(error);
          const err =
            error.message && error.message.includes('timeout')
              ? 'Connection timed out'
              : error.response.data.message;
          this.setState({ error: err });
          this.reset();
        });
    } else {
      this.setState({ error: 'Please choose a valid quantity' });
      this.reset();
    }
  };

  createSelectItems(value) {
    let items = [];

    for (let i = 1; i <= value; i++) {
      items.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return items;
  }

  render() {
    return (
      <div className="row my-5 pb-4 text-center text-md-left animated fadeInUpBig">
        <div className="col-md-5 mb-3 mb-sm-3">
          <Link
            to={{
              pathname: `${window.location.pathname}/${this.props.cardTitle}`,
              state: { inventoryProps: this.props }
            }}
          >
            <img
              className="img-fluid product-img"
              src={this.props.url}
              alt={this.props.cardTitle}
            />
          </Link>
        </div>

        <div className="col-md-7 border-bottom pb-3 pb-sm-3">
          <h3 className="mb-2">{this.props.cardTitle}</h3>
          {/* <p className="mb-2">{this.props.cardDesc}</p> */}
          {this.state.isAuthed &&
            this.props.cardPrice > 0 &&
            !this.state.isAdmin && (
              <Fragment>
                <p>${this.props.cardPrice}</p>
                <p>{this.props.cardQuantity} units in inventory</p>

                {this.state.success && <p className="my-2 text-success">{this.state.success}</p>}
                {this.state.error && <p className="my-2 text-danger">{this.state.error}</p>}

                <label>Quantity</label>
                <select
                  value={this.state.quantity.toString()}
                  data-id={this.props.id}
                  className="browser-default mx-2"
                  onChange={this.handleInputChange}
                  name="quantity"
                >
                  <option>0</option>
                  {this.createSelectItems(this.props.cardQuantity)}
                </select>
                <Button
                  type="submit"
                  value="Submit"
                  onClick={this.handleFormSubmit}
                  data-id={this.props.id}
                  data-maxqty={this.props.cardQuantity}
                  className="aButton"
                >
                  {' '}
                  Add To Cart
                </Button>
              </Fragment>
            )}
          <Link
            to={{
              pathname: `${window.location.pathname}/${this.props.cardTitle}`,
              state: { inventoryProps: this.props }
            }}
          >
            <Button className="aButton"> More Info</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default InventoryCard;
