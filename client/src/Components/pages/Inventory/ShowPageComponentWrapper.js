/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { Button, Col, Container, Row, CardBody } from 'mdbreact';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import { Link } from 'react-router-dom';
import API from '../../../api/API';
import { timeout, handleInputChange } from '../../../api/validate';

class ShowPageComponentWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      isAuthed: false,
      result: null,
      isAdmin: null,
      inventoryImages: [],
      error: null
    };
    this.timeout = timeout.bind(this);
    this.handleInputChange = handleInputChange.bind(this);
  }

  // checks if a user is authed. If so, displays cart and qty.
  componentDidMount() {
    window.scrollTo(0, 0);
    API.checkToken()
      .then(res => this.setState({ isAuthed: true, isAdmin: res.data.isAdmin }))
      .catch(err => {
        console.log(err);
      });
    const inventoryItem = this.props.location.state.inventoryProps;
    const allImages = [];
    if (inventoryItem.extra) {
      allImages.push(inventoryItem.url);
      allImages.push(...inventoryItem.extra.trim().split(' '));
      this.setState({ inventoryImages: allImages });
    } else {
      allImages.push(inventoryItem.url);
      this.setState({ inventoryImages: allImages });
    }
  }

  // saves the product to the users cart.
  handleFormSubmit = event => {
    // prevents adding 0 items of something or too many
    if (
      this.state.quantity > 0 &&
      this.state.quantity <= parseInt(this.props.location.state.inventoryProps.cardQuantity)
    ) {
      event.preventDefault();
      // grabs the values needed for the product to save to the cart
      const obj = {};
      obj.ProductId = event.target.getAttribute('data-id');
      obj.qty = this.state.quantity;
      obj.CartId = sessionStorage.activeCart;
      obj.maxQty = event.target.getAttribute('data-maxqty');

      API.saveProduct(obj)
        .then(result => {
          this.timeout({ result: result.data.success });
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

    for (let i = 1; i <= value; i++) {
      items.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return items;
  }

  pictureMover = (event, i) => {
    const newImagesArray = [...this.state.inventoryImages];
    const newVariable = newImagesArray.splice(i, 1);
    newImagesArray.unshift(newVariable);
    this.setState({ inventoryImages: newImagesArray });
  };

  render() {
    const inventoryItem = this.props.location.state.inventoryProps;

    return (
      <Container className="animated fadeInUpBig">
        <br />

        <Row>
          <Col className="col-sm-3 col-xs-3 col-md-3 thumb-images">
            {this.state.inventoryImages.map((a, i) => {
              if (i != 0) {
                return (
                  <Row key={i}>
                    <div className="col-xl-6 col-md-6 mb-3 d-block img-fluid">
                      <img
                        src={a}
                        alt={i}
                        className="img-thumbnail mx-auto d-block img-fluid z-depth-1 extra-pointer"
                        onClick={event => this.pictureMover(event, i)}
                      />
                    </div>
                  </Row>
                );
              }
            })}
          </Col>
          <Col className="col-9">
            <Col className="col-8 text-center">
              <h3>{inventoryItem.cardTitle}</h3>
              <img
                src={this.state.inventoryImages[0]}
                className="d-block img-fluid z-depth-1 main-show"
                alt={inventoryItem.cardTitle}
              />{' '}
              <p>{inventoryItem.cardDesc}</p>
            </Col>
          </Col>
        </Row>
        <Row>
          <CardBody className="text-center col-12">
            {' '}
            <div className="col-md-12 border-bottom pb-3 pb-sm-3">
              {this.state.isAuthed &&
                inventoryItem.cardPrice > 0 &&
                !this.state.isAdmin && (
                  <Fragment>
                    <Col className="col-12">
                      <p>${inventoryItem.cardPrice}</p>
                      <p>{inventoryItem.cardQuantity} units in inventory</p>

                      {this.state.result && (
                        <p className="text-success my-2">{this.state.result}</p>
                      )}
                      {this.state.error && <p className="text-danger">{this.state.error}</p>}
                      <label>Quantity</label>
                      <select
                        value={this.state.quantity.toString()}
                        data-id={inventoryItem.id}
                        className="browser-default mx-2"
                        onChange={this.handleInputChange}
                        name="quantity"
                      >
                        <option>0</option>
                        {this.createSelectItems(inventoryItem.cardQuantity)}
                      </select>
                      <Button
                        type="submit"
                        value="Submit"
                        onClick={this.handleFormSubmit}
                        data-id={inventoryItem.id}
                        data-maxqty={inventoryItem.cardQuantity}
                        className="aButton"
                      >
                        {' '}
                        Add To Cart
                      </Button>
                    </Col>
                  </Fragment>
                )}
            </div>
          </CardBody>
        </Row>
      </Container>
    );
  }
}

export default ShowPageComponentWrapper;
