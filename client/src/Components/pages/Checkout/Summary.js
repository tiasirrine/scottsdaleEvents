import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
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
      modal: false,
      shippingCost: ''
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
        <header className="text-center">Summary</header>
        <Row>
          <Col md="6">
            {' '}
            <Table>
              <thead className="blue-grey lighten-4">
                <tr>
                  <th className="text-center">Items</th>
                </tr>
              </thead>
              <tbody>
                {this.props.location.state.cartProps.map((obj, index) => {
                  return (
                    <tr>
                      <td key={index}> {obj.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
          <Col md="6">
            {' '}
            <Table>
              <thead className="blue-grey lighten-4">
                <tr>
                  <th className="text-center">Event</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(this.props.location.state.eventProps).map((obj, index) => {
                  console.log('obj: ', obj);
                  return (
                    <tr>
                      <td key={index}> {this.props.location.state.eventProps[obj]}</td>
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
                    cartPropsBack: this.props.location.state.cartProps,
                    eventPropsback: this.props.location.state.eventProps
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
