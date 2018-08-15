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
import './EventDetails.css';

class EventForm extends Component {
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
  // allows the form to submit on enter.
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  };

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
      <Container>
        <Row>
          <Col md="6">
            <Card>
              <CardBody>
                <form>
                  <p className="h4 text-center py-4">Event Details</p>
                  <div className="grey-text">
                    <Input
                      label="Your name"
                      icon="user"
                      onChange={this.handleChange}
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                    />
                    <Input
                      label="Your email"
                      icon="envelope"
                      onChange={this.handleChange}
                      group
                      type="email"
                      validate
                      error="wrong"
                      success="right"
                    />
                    <Input
                      label="Confirm your email"
                      icon="exclamation-triangle"
                      onChange={this.handleChange}
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                    />
                    <Input
                      label="Your password"
                      icon="lock"
                      onChange={this.handleChange}
                      group
                      type="password"
                      validate
                    />
                  </div>
                  <div className="text-center py-4 mt-3">
                    <Button
                      className="aButton"
                      size="md"
                      onClick={this.handleSubmit}
                      onKeyPress={this.handleKeyPress}
                      type="send"
                    >
                      Go to Summary
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default EventForm;
