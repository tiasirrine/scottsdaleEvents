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
  ModalFooter
} from 'mdbreact';
import axios from 'axios';
import './Form.css';

class ContactPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      companyName: '',
      contactEmail: '',
      number: '',
      message: '',
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

  async handleSubmit(e) {
    //e.preventDefault();
    console.log();

    const { name, companyName, contactEmail, number, message } = this.state;

    await axios.post('/api/form', {
      name,
      companyName,
      contactEmail,
      number,
      message
    });
  }

  render() {
    return (
      <Container className="m120">
        <section className="my-5">
          <h2 className="h1-responsive font-weight-bold text-center">
            Contact us
          </h2>
          <p className="text-center w-responsive mx-auto pb-5">
            Please fill out the form below and we will get back to you as
            quickly as possilbe!
          </p>
          <Row>
            <Col md="9" className="md-0 mb-5">
              <form>
                <Row>
                  <Col md="12">
                    <div className="md-form mb-0">
                      <Input
                        type="text"
                        id="name"
                        label="Your name"
                        name="name"
                        onChange={this.handleChange}
                      />
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="md-form mb-0">
                      <Input
                        type="text"
                        id="companyName"
                        label="Company name"
                        name="companyName"
                        onChange={this.handleChange}
                      />
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="md-form mb-0">
                      <Input
                        type="text"
                        id="contactEmail"
                        label="Your email"
                        name="contactEmail"
                        onChange={this.handleChange}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <div className="md-form mb-0">
                      <Input
                        type="text"
                        id="number"
                        label="Contact Number"
                        name="number"
                        onChange={this.handleChange}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <div className="md-form mb-0">
                      <Input
                        type="textarea"
                        id="message"
                        label="Your message"
                        name="message"
                        onChange={this.handleChange}
                      />
                    </div>
                  </Col>
                </Row>
              </form>
              <div className="text-center text-md-left">
                <Button
                  className="aButton"
                  size="md"
                  onClick={this.handleSubmit}
                  onClick={this.toggle}
                  type="send"
                >
                  Send
                </Button>
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
                  <p>+ 01 234 567 89</p>
                </li>
                <li>
                  <Fa icon="envelope" size="2x" className="grey-text mt-4" />
                  <p>contact@example.com</p>
                </li>
              </ul>
            </Col>
          </Row>
        </section>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Thank you!</ModalHeader>
          <ModalBody>We will be contacting you soon.</ModalBody>
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
