import React, { Component } from 'react';
import { handleInputChange } from '../../../../api/validate';
import API from '../../../../api/API';

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
      error: false,
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

  setErr = () => {
    this.setState({ loading: false, error: true });
    setTimeout(() => this.setState({ error: false }), 3000);
  };

  sendEmail = () => {
    const { error, modal, loading, ...info } = this.state;
    this.setState({ loading: true });
    API.contactEmail(info)
      .then(result => {
        console.log(result);
        if (result.data.error) {
          this.setErr();
          return;
        }
        console.log(result.data);
        this.toggle();
      })
      .catch(error => {
        console.log(error);
        this.setErr();
      });
  };

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
                >
                  {this.state.loading ? (
                    <i className="fa fa-spinner fa-spin" />
                  ) : (
                    'Send'
                  )}
                </Button>
                {this.state.error && (
                  <p className="text-danger">
                    An error occured. Please call us so we can resolve this issue.
                  </p>
                )}
              </div>
            </Col>
            <Col md="3" className="text-center">
              <ul className="list-unstyled mb-0">
                <li>
                  <Fa icon="map-marker" size="2x" className="grey-text" />
                  <p>Scottsdale, Arizona</p>
                </li>
                <li>
                  <Fa icon="phone" size="2x" className="grey-text mt-4" />
                  <p>(480) 699-9381</p>
                </li>
                <li>
                  <Fa icon="envelope" size="2x" className="grey-text mt-4" />
                  <p> cristina@scottsdaleme.com</p>
                </li>
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
