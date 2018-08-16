import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Fa,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Table
} from 'mdbreact';
import API from '../../../api/API';
import { Link } from 'react-router-dom';
import './Checkout.css';

class Summary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
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
  // allows the form to submit on enter.
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  };
  handleSubmit = e => {
    API.getEstimate(this.props.location.state)
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };

  submitHandler = event => {
    event.preventDefault();
    event.target.className += ' was-validated';
  };

  changeHandler = event => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  render() {
    console.log(this.props);
    return (
      <Container className="mt-5">
        <Table>
          <thead className="blue-grey lighten-4">
            <tr>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{this.props.location.state.cartProps[0].name}</th>
              <th>{this.props.location.state.eventProps.eventCustName}</th>
            </tr>
          </tbody>
        </Table>
        <Row className="mt-6">
          <Col md="">
            <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
              <div className="custom-control custom-checkbox animated jello mb-3">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customControlValidation1"
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
              <button className="btn btn-unique" onClick={this.handleSubmit}>
                Submit Order
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Summary;
