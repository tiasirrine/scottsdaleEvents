import React, { Component, Fragment } from 'react';
import { Button, Col, Container, Row, CardBody } from 'mdbreact';
import { Link } from 'react-router-dom';
import API from '../../../api/API';

class ShowPageComponentWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 0, isAuthed: false, result: null, isAdmin: null };
  }

  // checks if a user is authed. If so, displays cart and qty.
  componentDidMount() {
    API.checkToken()
      .then(res => this.setState({ isAuthed: true, isAdmin: res.data.isAdmin }))
      .catch(err => {
        console.log(err);
      });
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
    console.log('items: ', items);
    return items;
  }

  pictureLooper = () => {
    const inventoryItemExtra = this.props.location.state.inventoryProps.extra.trim().split(' ');
    console.log(inventoryItemExtra);
    return inventoryItemExtra;
  };
  render() {
    console.log('SPCWprops: ', this.props.location.state);
    const inventoryItem = this.props.location.state.inventoryProps;
    return (
      <Container>
        <br />

        <Row>
          <img
            src={inventoryItem.url}
            className=" mx-auto d-block img-fluid z-depth-1 main-show"
            alt={inventoryItem.cardTitle}
          />
        </Row>
        <Row>
          {' '}
          {this.pictureLooper().map((a, i) => {
            return (
              <div key={i} className="col-xl-3 col-md-4 mb-3">
                <img
                  src={a}
                  alt={i}
                  className="img-thumbnail mx-auto d-block img-fluid z-depth-1"
                />
              </div>
            );
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
                    <Row>
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
                    </Row>
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
