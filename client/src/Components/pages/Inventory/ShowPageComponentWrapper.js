import React, { Component, Fragment } from 'react';
import { Button, Col, Container, Row, CardBody } from 'mdbreact';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import { Link } from 'react-router-dom';
import API from '../../../api/API';

class ShowPageComponentWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      isAuthed: false,
      result: null,
      isAdmin: null,
      inventoryImages: []
    };
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
    allImages.push(inventoryItem.url);
    allImages.push(...inventoryItem.extra.trim().split(' '));
    console.log('load images: ', allImages);
    this.setState({ inventoryImages: allImages });
    console.log(this.state);
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
          this.setState({ result: result.data });
        })
        .catch(err => {
          this.setState({ result: 'Failed to save product' });
        });
    } else {
      this.setState({ result: 'Please choose a valid quantity' });
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

  pictureLooper = () => {
    if (this.props.location.state.inventoryProps.extra) {
      return this.state.inventoryImages;
    } else {
      return [];
    }
  };

  pictureMover = (event, i) => {
    const newImagesArray = [...this.state.inventoryImages];
    const newVariable = newImagesArray.splice(i, 1);
    newImagesArray.unshift(newVariable);
    console.log(this.state.inventoryImages);
    this.setState({ inventoryImages: newImagesArray });
    console.log(this.state);
  };

  render() {
    const inventoryItem = this.props.location.state.inventoryProps;

    return (
      <Container className="animated fadeInUpBig">
        <br />

        <Row>
          <img
            src={this.state.inventoryImages[0]}
            className=" mx-auto d-block img-fluid z-depth-1 main-show"
            alt={inventoryItem.cardTitle}
          />
        </Row>
        <Row>
          {' '}
          {this.state.inventoryImages.map((a, i) => {
            if (i != 0) {
              return (
                <div key={i} className="col-xl-3 col-md-4 mb-3 mx-auto d-block img-fluid z-depth-1">
                  <img
                    src={a}
                    alt={i}
                    className="img-thumbnail mx-auto d-block img-fluid z-depth-1 extra-pointer"
                    onClick={event => this.pictureMover(event, i)}
                  />
                </div>
              );
            }
          })}
        </Row>
        <Row>
          <CardBody className="text-center col-12">
            {' '}
            <div className="col-md-12 border-bottom pb-3 pb-sm-3">
              <h3 className="mb-2">{inventoryItem.cardTitle}</h3>
              <p className="mb-2">{inventoryItem.cardDesc}</p>
              {this.state.isAuthed &&
                inventoryItem.cardPrice > 0 &&
                !this.state.isAdmin && (
                  <Fragment>
                    <Col className="col-12">
                      <p>${inventoryItem.cardPrice}</p>
                      <p>{inventoryItem.cardQuantity} units in inventory</p>

                      {this.state.result && <p className="my-2">{this.state.result}</p>}

                      <label>Quantity</label>
                      <select
                        value={this.state.quantity.toString()}
                        data-id={inventoryItem.id}
                        className="browser-default"
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
