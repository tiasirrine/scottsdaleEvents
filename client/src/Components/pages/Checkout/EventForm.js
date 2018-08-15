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
  MDBDatePicker,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'mdbreact';
import axios from 'axios';
import './Checkout.css';
import { Link } from 'react-router-dom';

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
    e.preventDefault();
    console.log('go to summary');
  }
  getPickerValue = value => {
    console.log(value);
  };

  render() {
    return (
      <Container>
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <form>
                  <Row>
                    <Col md="6">
                      <p className="h4 text-center py-4">Event Details</p>
                      <div className="grey-text">
                        <Input
                          label="Customer Name"
                          icon="user-circle"
                          onChange={this.handleChange}
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <Input
                          label="Group Name"
                          icon="group"
                          onChange={this.handleChange}
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <Input
                          label="Venue"
                          icon="building"
                          onChange={this.handleChange}
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <Input
                          label="Date of Event"
                          icon="calendar"
                          onChange={this.handleChange}
                          group
                          type="date"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <Input
                          label="Time of Event"
                          icon="lock"
                          onChange={this.handleChange}
                          group
                          type="time"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <Input
                          label="Location of Event"
                          icon="group"
                          onChange={this.handleChange}
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <Input
                          label="Room"
                          icon="group"
                          onChange={this.handleChange}
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <div class="md-form">
                          <i class="fa fa-pencil prefix" />
                          <textarea
                            type="text"
                            id="form10"
                            class="md-textarea form-control"
                            rows="3"
                          />
                          <label for="form10">
                            Comments/Note/File addition (blueprints,designs..etc)
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <p className="h4 text-center py-4">Event Setup & Strike</p>
                      <div className="grey-text">
                        <Input
                          label="Set-up at"
                          icon="clock"
                          onChange={this.handleChange}
                          group
                          type="time"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <Input
                          label="Set-up by"
                          icon="clock"
                          onChange={this.handleChange}
                          group
                          type="time"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <div class="md-form">
                          <i class="fa fa-pencil prefix" />
                          <textarea
                            type="text"
                            id="form10"
                            class="md-textarea form-control"
                            rows="3"
                          />
                          <label for="form10">Comments/Notes</label>
                        </div>
                      </div>
                      <div class="custom-control custom-radio">
                        <input
                          type="radio"
                          class="custom-control-input"
                          id="defaultUnchecked"
                          name="defaultExampleRadios"
                        />
                        <label
                          class="custom-control-label h4 text-center py-4"
                          for="defaultUnchecked"
                        >
                          Will-Call Order
                        </label>
                      </div>

                      <div className="grey-text">
                        <Input
                          label="Customer Name"
                          icon="user-circle"
                          onChange={this.handleChange}
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <Input
                          label="Pick Up Date"
                          icon="calendar"
                          onChange={this.handleChange}
                          group
                          type="date"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <Input
                          label="Pick Up Time"
                          icon="clock"
                          onChange={this.handleChange}
                          group
                          type="time"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <Input
                          label="Return Date"
                          icon="calendar"
                          onChange={this.handleChange}
                          group
                          type="date"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <Input
                          label="Return Time"
                          icon="clock"
                          onChange={this.handleChange}
                          group
                          type="time"
                          validate
                          error="wrong"
                          success="right"
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center py-4 mt-3">
                    <Link to="/checkout/cart">
                      <Button color="success" className="aButton" size="md">
                        Back to Cart
                      </Button>
                    </Link>
                    <Link to="/checkout/summary">
                      <Button color="success" className="aButton" size="md">
                        Go to Summary
                      </Button>
                    </Link>
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
