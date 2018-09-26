/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { Button, Card, CardImage, Input, Row, View } from 'mdbreact';
import './InventoryPage.css';
import API from '../../../api/API';
import { Link } from 'react-router-dom';
import { CartValueContext } from './index';
import { timeout, handleInputChange } from '../../../api/validate';

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
    this.timeout = timeout.bind(this);
    this.handleInputChange = handleInputChange.bind(this);
    this.product = this.props;
  }

  // checks if a user is authed. If so, displays cart and qty.
  componentDidMount() {
    window.scrollTo(0, 0);
    this.checkToken();
  }

  checkToken = () => {
    API.checkToken().then(res =>
      this.setState({ isAuthed: true, isAdmin: res.data.isAdmin })
    );
  };

  // saves the product to the users cart.
  handleFormSubmit = (event, qty, func) => {
    // prevents adding 0 items of something or too many
    if (this.state.quantity > 0 && this.state.quantity <= parseInt(qty)) {
      event.preventDefault();
      // grabs the values needed for the product to save to the cart
      const obj = {};
      obj.ProductId = event.target.getAttribute('data-id');
      obj.qty = this.state.quantity;
      obj.CartId = sessionStorage.getItem('activeCart');
      obj.maxQty = event.target.getAttribute('data-maxqty');
      obj.userId = sessionStorage.getItem('userId');

      API.saveProduct(obj)
        .then(result => {
          func(result.data);
          this.timeout({ success: 'Success' });
        })
        .catch(error => {
          console.log(error);
          const err =
            error.message && error.message.includes('timeout')
              ? 'Connection timed out'
              : error.response.data.message;
          this.timeout({ error: err });
        });
    } else {
      this.timeout({ error: 'Please choose a valid quantity' });
    }
  };

  createSelectItems(value) {
    let items = [];
    let i = 0;
    while (i <= value) {
      items.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
      i++;
    }
    return items;
  }

  submitBtn = (dataId, maxQty, func) => (
    <Button
      type="submit"
      value="Submit"
      onClick={e => this.handleFormSubmit(e, maxQty, func)}
      data-id={dataId}
      data-maxqty={maxQty}
      className="aButton"
    >
      {' '}
      Add To Cart
    </Button>
  );

  resultMsg = (success, error) => {
    const style = success ? 'text-success' : 'text-danger';
    return <p className={`my-2 ${style}`}>{success || error}</p>;
  };

  selectElem = (qty, productId, totalQty, price) => {
    return (
      <Fragment>
        <p>${price}</p>
        <p>{totalQty} units in inventory</p>
        <label>Quantity</label>
        <select
          value={qty.toString()}
          data-id={productId}
          className="browser-default mx-2"
          onChange={this.handleInputChange}
          name="quantity"
        >
          {this.createSelectItems(totalQty)}
        </select>
      </Fragment>
    );
  };

  render() {
    const { product } = this;
    return (
      <div className="row my-5 pb-4 text-center text-md-left animated fadeInUpBig">
        <div className="col-md-5 mb-3 mb-sm-3">
          <Link
            to={{
              pathname: `${window.location.pathname}/${product.cardTitle}`,
              state: { inventoryProps: product }
            }}
          >
            <img
              className="img-fluid product-img"
              src={product.url}
              alt={product.cardTitle}
            />
          </Link>
        </div>

        <div className="col-md-7 border-bottom pb-3 pb-sm-3">
          <h3 className="mb-2">{product.cardTitle}</h3>
          {this.state.isAuthed &&
            product.cardPrice > 0 &&
            !this.state.isAdmin && (
              <Fragment>
                {this.selectElem(
                  this.state.quantity,
                  product.id,
                  product.cardQuantity,
                  product.cardPrice
                )}
                {this.resultMsg(this.state.success, this.state.error)}
                <CartValueContext.Consumer>
                  {func => this.submitBtn(product.id, product.cardQuantity, func)}
                </CartValueContext.Consumer>
              </Fragment>
            )}
          <Link
            to={{
              pathname: `${window.location.pathname}/${product.cardTitle}`,
              state: { inventoryProps: product }
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
