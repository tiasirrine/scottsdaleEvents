import React, { Component } from 'react';
import { handleInputChange } from '../../../api/validate';
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
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  toggle = () => this.setState({ modal: !this.state.modal, loading: false });

  setErr = msg => {
    this.setState({ loading: false, error: msg });
    setTimeout(() => this.setState({ error: null }), 3000);
  };

  sendEmail = () => {
    const { error, modal, loading, ...info } = this.state;
    this.setState({ loading: true });
    API.contactEmail(info)
      .then(result => {
        this.toggle();
      })
      .catch(error => {
        const err =
          error.message && error.message.includes('timeout')
            ? 'Connection timed out'
            : error.response.data.message;
        this.setErr(err);
      });
  };

  inputValues = [
    {
      type: 'text',
      label: 'Your Name',
      name: 'name',
      icon: 'user'
    },
    {
      type: 'text',
      label: 'Your Email',
      name: 'email',
      icon: 'envelope'
    },
    {
      type: 'text',
      label: 'Your Company',
      name: 'company',
      icon: 'building'
    },
    {
      type: 'text',
      label: 'Contact Number',
      name: 'number',
      icon: 'phone'
    },
    {
      type: 'textarea',
      label: 'Your message',
      name: 'message',
      icon: 'comment'
    }
  ];

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
            Please fill out the form below and we will get back to you as quickly as possible!
          </p>
          <Row>
            <Col md="9" className="md-0 mb-5">
              <form>
                <Row>
                  {this.inputValues.map(val => (
                    <Col md="12">
                      <div className="md-form mb-0">
                        <Input
                          type={val.text}
                          label={val.label}
                          name={val.name}
                          icon={val.icon}
                          onChange={this.handleChange}
                          value={this.state.name}
                        />
                      </div>
                    </Col>
                  ))}
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
                  {this.state.loading ? <i className="fa fa-spinner fa-spin" /> : 'Send'}{' '}
                  <i className="fa fa-rocket" aria-hidden="true" />
                </Button>
                {this.state.error && (
                  <p className="text-danger">An error occured: {this.state.error}</p>
                )}
              </div>
            </Col>
            <Col md="3" className="text-center">
              <ul className="list-unstyled mb-0">
                {this.sideDetails.map(detail => (
                  <li>
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
