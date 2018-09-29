import React, { Component } from 'react';
import {
  checkEmail,
  handleInputChange,
  timeout
} from '../../../api/validate';
import API from '../../../api/API';
import {
  Container,
  Row,
  Col,
  Fa,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'mdbreact';
import './Form.css';

class ContactPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false,
      modal: false,
      message: '',
      name: '',
      company: '',
      email: '',
      number: ''
    };
    this.handleChange = handleInputChange.bind(this);
    this.timeout = timeout.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  toggle = () => this.setState({ modal: !this.state.modal, loading: false });

  sendEmail = () => {
    if (!this.state.name) {
      this.timeout({ error: 'Please enter your name' });
      return;
    }

    if (!this.state.company) {
      this.timeout({ error: 'Please the name of your company' });
      return;
    }

    if (!checkEmail(this.state.email)) {
      this.timeout({ error: 'Please enter a valid email address' });
      return;
    }

    const reg = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})$/;
    if (!reg.test(this.state.number)) {
      this.timeout({ error: 'Please enter a valid phone number' });
      return;
    }

    if (!this.state.message) {
      this.timeout({ error: 'Please include a message' });
      return;
    }

    const { error, modal, loading, ...info } = this.state;
    this.setState({ loading: true });
    API.contactEmail(info)
      .then(() => {
        this.toggle();
      })
      .catch(error => {
        const err =
          error.message && error.message.includes('timeout')
            ? 'Connection timed out'
            : error.response.data.message;
        this.timeout({ error: err, loading: false });
      });
  };

  sideDetails = [
    {
      text: 'Scottsdale, Arizona',
      icon: 'map-marker'
    },
    {
      text: '(480) 699-9381',
      icon: 'phone'
    },
    {
      text: 'cristina@scottsdaleme.com',
      icon: 'envelope'
    }
  ];

  render() {
    return (
      <Container className="m120">
        <section className="my-5">
          <h2 className="h1-responsive font-weight-bold text-center">Contact us</h2>
          <p className="text-center w-responsive mx-auto pb-5">
            Please fill out the form below and we will get back to you as quickly as
            possible!
          </p>
          <Row>
            <Col md="9" className="md-0 mb-5">
              <form>
                <Row>
                  <Col md="12">
                    <div className="md-form mb-0">
                      <Input
                        type="text"
                        label="Your name"
                        name="name"
                        icon="user"
                        onChange={this.handleChange}
                        value={this.state.name}
                      />
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="md-form mb-0">
                      <Input
                        type="text"
                        label="Company name"
                        name="company"
                        icon="building"
                        onChange={this.handleChange}
                        required
                        value={this.state.company}
                      />
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="md-form mb-0">
                      <Input
                        type="text"
                        label="Your email"
                        name="email"
                        icon="envelope"
                        onChange={this.handleChange}
                        value={this.state.email}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <div className="md-form mb-0">
                      <Input
                        type="text"
                        label="Contact Number"
                        name="number"
                        icon="phone"
                        onChange={this.handleChange}
                        value={this.state.number}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <div className="md-form mb-0">
                      <Input
                        type="textarea"
                        label="Your message"
                        name="message"
                        onChange={this.handleChange}
                        icon="comment"
                        value={this.state.message}
                      />
                    </div>
                  </Col>
                </Row>
              </form>
              <div className="text-center text-md-left">
                <Button
                  className="aButton"
                  size="md"
                  onClick={this.sendEmail}
                  type="send"
                  disabled={this.state.loading}
                >
                  {this.state.loading ? (
                    <i className="fa fa-spinner fa-spin" />
                  ) : (
                    'Send'
                  )}{' '}
                  <i className="fa fa-rocket" aria-hidden="true" />
                </Button>
                {this.state.error && (
                  <p className="text-danger">{this.state.error}</p>
                )}
              </div>
            </Col>
            <Col md="3" className="text-center">
              <ul className="list-unstyled mb-0">
                {this.sideDetails.map(detail => (
                  <li key={detail.text}>
                    <Fa icon={detail.icon} size="2x" className="grey-text" />
                    <p>{detail.text}</p>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </section>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Thank you!</ModalHeader>
          <ModalBody>Thank you! We will be contacting you soon.</ModalBody>
          <ModalFooter>
            <Button className="aButton" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default ContactPage;
