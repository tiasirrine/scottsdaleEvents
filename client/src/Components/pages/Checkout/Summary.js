/* eslint-disable */
import React from 'react';
import { Container, Row, Col, Button, Modal, ModalBody, ModalHeader, ModalFooter, Table } from 'mdbreact';
import API from '../../../api/API';
import { Link } from 'react-router-dom';
import './Checkout.css';

class Summary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      shippingCost: '',
      isActive: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleSubmit = e => {
    API.getEstimate(this.props.location.state)
      .then(result => {
        sessionStorage.setItem('activeCart', result.data.activeCart);
      })
      .catch(err => console.log(err));
  };

  handleCheck(event) {
    this.setState({ isActive: event.target.checked });
  }

  submitButton = () => {
    console.log('Button Pushed');
    this.toggle();
    this.handleSubmit();
  };

  submitHandler = event => {
    event.preventDefault();
    event.target.className += ' was-validated';
  };

  changeHandler = event => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  render() {
    const eventDetails = this.props.location.state;
    console.log(this.props);
    return (
      <Container className="mt-5">
        <div className="text-center">Summary</div>
        <Row>
          <Col md="6">
            {' '}
            <Table>
              <thead className="blue-grey lighten-4">
                <tr>
                  <th className="text-center">Items</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center">Price</th>
                </tr>
              </thead>
              <tbody>
                {this.props.location.state.cartProps.map((obj, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center">{obj.name}</td>
                      <td className="text-center">{obj.qty}</td>
                      <td className="text-center">${obj.total}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td className="text-center">{''} </td>
                  <td className="text-center">{''} </td>
                  <td className="text-center">
                    Est. Subtotal: $
                    {this.props.location.state.cartProps.reduce((a, b) => a + parseInt(b.total), 0)}{' '}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md="6">
            {' '}
            <Table>
              <thead className="blue-grey lighten-4">
                <tr>
                  <th className="text-center">Event Details</th>
                  <th className="text-center">Your Event</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(eventDetails.eventProps).map((obj, index) => {
                  console.log('obj: ', obj);
                  const camelCase = obj
                    .replace(/([A-Z])/g, ' $1')

                    .replace(/^./, function(str) {
                      return str.toUpperCase();
                    });
                  return (
                    <tr key={index}>
                      <td className="text-center">{camelCase}</td>
                      <td className="text-center">{eventDetails.eventProps[obj]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row className="mt-6">
          <Col md="">
            <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
              <div className="custom-control custom-checkbox animated jello mb-3">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customControlValidation1"
                  onChange={event => this.handleCheck(event)}
                  required
                />
                <label className="custom-control-label" htmlFor="customControlValidation1">
                  Agree To Terms and Conditions
                </label>
                <div className="invalid-feedback">You must agree before submitting.</div>
              </div>
              <Link
                to={{
                  pathname: '/checkout/event',
                  state: {
                    cartProps: this.props.location.state.cartProps,
                    eventProps: this.props.location.state.eventProps
                  }
                }}
              >
                <Button color="success" className="aButton" size="md">
                  Back
                </Button>
              </Link>
              {
                <button
                  className="btn btn-unique"
                  disabled={!this.state.isActive}
                  onClick={this.submitButton}
                >
                  Submit Order
                </button>
              }
            </form>
          </Col>
        </Row>

        <Modal isOpen={this.state.modal}>
          <Link to={`/`}>
            <ModalHeader toggle={this.toggle}>Thank you!</ModalHeader>{' '}
          </Link>
          <ModalBody>We will be contacting you soon.</ModalBody>
          <ModalFooter>
            <Link to={`/`}>
              <Button className="aButton" onClick={this.toggle}>
                Close
              </Button>
            </Link>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default Summary;
