/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { Button, Col, Container, Row, CardBody } from 'mdbreact';
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

  // used to display images on the side column on lg screens, and on the bottom on sm screens
  displayExtraImages = (img, i) => {
    return (
      <div className="mb-3 mx-auto">
        <img
          src={img}
          alt={i}
          className="img-thumbnail img-fluid z-depth-1 extra-pointer"
          onClick={event => this.pictureMover(event, i)}
        />
      </div>
    );
  };

  // saves the product to the users cart.
  handleFormSubmit = event => {
    // prevents adding 0 items of something or too many
    if (
      this.state.quantity > 0 &&
      this.state.quantity <=
        parseInt(this.props.location.state.inventoryProps.cardQuantity)
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

  // css styles for the extra images
  respClasses = (leftCol, btmRow) => {
    const { inventoryImages } = this.state;
    const display = (offset = '') =>
      `col-12 ${
        inventoryImages.length > 1 ? 'col-lg-10' + offset : 'col-lg-12'
      } text-center`;

    if (leftCol) {
      return display();
    }

    if (btmRow) {
      return display('offset-lg-2');
    }
  };

  render() {
    const {
      inventoryImages,
      isAuthed,
      isAdmin,
      result,
      error,
      quantity
    } = this.state;
    const inventoryItem = this.props.location.state.inventoryProps;

    return (
      <Container className="animated fadeInUpBig">
        <Row>
          {inventoryImages.length > 1 && (
            <Col className="col-lg-2 thumb-images d-none d-lg-block">
              {inventoryImages.map((a, i) => {
                if (i != 0) {
                  return <div key={i}>{this.displayExtraImages(a, i)}</div>;
                }
              })}
            </Col>
          )}
          <Col className={this.respClasses(true, false)}>
            <h2 className="mt-5">{inventoryItem.cardTitle}</h2>
            <img
              src={inventoryImages[0]}
              className="d-block img-fluid mx-auto my-5 z-depth-1 main-show"
              alt={inventoryItem.cardTitle}
            />{' '}
            <p style={{ fontSize: '20px' }}>{inventoryItem.cardDesc}</p>
          </Col>
        </Row>
        <Row>
          <CardBody className="text-center col-12">
            {' '}
            <div className="col-md-12 border-bottom pb-3 pb-sm-3">
              {isAuthed &&
                inventoryItem.cardPrice > 0 &&
                !isAdmin && (
                  <Fragment>
                    <Col className={this.respClasses(false, true)}>
                      <p>${inventoryItem.cardPrice}</p>
                      <p>{inventoryItem.cardQuantity} units in inventory</p>

                      {result && <p className="text-success my-2">{result}</p>}
                      {error && <p className="text-danger">{error}</p>}
                      <label>Quantity</label>
                      <select
                        value={quantity.toString()}
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
          {inventoryImages.length > 1 &&
            inventoryImages.map((a, i) => {
              if (i != 0) {
                return (
                  <div key={i} className="col-3 px-2 d-lg-none">
                    {this.displayExtraImages(a, i)}
                  </div>
                );
              }
            })}
        </Row>
      </Container>
    );
  }
}

export default ShowPageComponentWrapper;
