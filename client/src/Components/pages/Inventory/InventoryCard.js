import React, { Component, Fragment } from 'react';
// import {
//   Card,
//   CardImg,
//   CardBody,
//   CardText,
//   CardTitle,
//   CardSubtitle,
//   Col,
//   Container,
//   Button,
//   FormGroup,
//   Label,
//   Input,
//   Row
// } from 'reactstrap';
import { Button, Input } from 'mdbreact';
import './InventoryPage.css';
import image from '../../../images/Photos/event7.jpg';
import API from '../../../api/API';
import auth from '../../../api/auth';

class InventoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 0, isAuthed: false };
  }

  // checks if a user is authed. If so, displays cart and qty.
  componentDidMount() {
    this.setState({ isAuthed: auth.isAuthed() });
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
    // prevents adding 0 items of something
    if (this.state.quantity) {
      event.preventDefault();
      // grabs the values needed for the product to save to the cart
      const obj = {};
      obj.ProductId = event.target.getAttribute('data-id');
      obj.qty = this.state.quantity;
      obj.CartId = sessionStorage.activeCart;

      API.saveProduct(obj)
        .then(data => console.log(data))
        .catch(err => console.log(err));
    } else {
      //TODO: display message asking to choose a quantity
    }
  };

  render() {
    return (
      <div className="row my-5 pb-4">
        <div className="col-md-5 mb-3 mb-sm-3">
          <img
            className="img-fluid product-img"
            src={image}
            alt={this.props.cardTitle}
          />
        </div>
        <div className="col-md-7 border-bottom pb-3 pb-sm-3">
          <h3 className="mb-2">{this.props.cardTitle}</h3>
          <p className="mb-2">{this.props.cardDesc}</p>
          <p>${this.props.cardPrice}</p>
          {this.state.isAuthed && (
            <Fragment>
              <Button
                type="submit"
                value="Submit"
                onClick={this.handleFormSubmit}
                data-id={this.props.id}
              >
                Add To Cart
              </Button>
              <Input
                value={this.state.quantity.toString()}
                onChange={this.handleInputChange}
                data-id={this.props.id}
                type="number"
                name="quantity"
                id="item-quantity"
                max="1000"
                maxLength="4"
                placeholder={'Quantity'}
              />
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default InventoryCard;

// render() {
//   return (
//     <Card className="py-3 clearfix inventory-card">
//       <Row className="justify-content-md-center inventory-card">
//         <Col md="4">
//           <CardImg
//             src={image}
//             alt={this.props.cardTitle}
//             className="d-flex align-self-center mr-3"
//           />
//         </Col>
//         <Col md="8" className="px-3">
//           <CardBody className="px-3">
//             <CardTitle>{this.props.cardTitle}</CardTitle>
//             <CardText>{this.props.cardDesc}</CardText>
//             <CardText>${this.props.cardPrice}</CardText>
//             <FormGroup>
//               <Row>
//                 <Col md="6">
//                   <Label for="item-quantity" />
// {this.state.isAuthed && (
//   <Input
//     value={this.state.quantity}
//     onChange={this.handleInputChange}
//     data-id={this.props.id}
//     type="number"
//     name="quantity"
//     id="item-quantity"
//     max="1000"
//     maxLength="4"
//     placeholder={'Quantity'}
//     className="float-left"
//   />
// )}
//                 </Col>
//                 <Col md="6">
// {
//   this.state.isAuthed && (
//     <Button
//       type="submit"
//       value="Submit"
//       onClick={this.handleFormSubmit}
//       data-id={this.props.id}
//       className="float-left"
//     >
//       Add To Cart
//     </Button>
//   );
// }
//                 </Col>
//               </Row>
//             </FormGroup>
//           </CardBody>
//         </Col>
//       </Row>
//     </Card>
//   );
// }
