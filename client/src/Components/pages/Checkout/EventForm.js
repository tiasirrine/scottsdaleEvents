import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Button, Input } from 'mdbreact';
import './Checkout.css';
import { Link } from 'react-router-dom';

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.eventProps = this.props.location.state.eventProps;

    this.state = {
      customerName: this.eventProps ? this.eventProps.customerName : '',
      groupName: '',
      venue: '',
      eventDate: '',
      eventStartTime: '',
      eventEndTime: '',
      location: '',
      commentsOnEvent: '',
      loadIn: '',
      setByTime: '',
      strikeTime: '',
      commentsOnSetup: '',
      willCallCustomerName: '',
      willCallPickupDate: '',
      willCallPickupTime: '',
      willCallReturnDate: '',
      willCallReturnTime: ''
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // allows the form to submit on enter.
  // handleKeyPress = e => {
  //   if (e.key === 'Enter') {
  //     this.handleSubmit();
  //   }
  // };

  handleSubmit = e => {
    e.preventDefault();
    console.log('go to summary');
  };

  getPickerValue = value => {
    console.log(value);
  };

  render() {
    console.log(this.props);
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
                          value={this.state.customerName}
                          label="Customer Name"
                          name="customerName"
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
                          name="groupName"
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
                          name="venue"
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
                          name="eventDate"
                          icon="calendar"
                          onChange={this.handleChange}
                          group
                          type="date"
                          placeholder=""
                          validate
                          error="wrong"
                          success="right"
                        />
                        <Input
                          label="Start Time of Event"
                          name="eventStartTime"
                          icon="lock"
                          onChange={this.handleChange}
                          group
                          type="time"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <Input
                          label="End Time of Event"
                          name="eventEndTime"
                          icon="lock"
                          onChange={this.handleChange}
                          group
                          type="time"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <Input
                          label="Site/Room"
                          name="location"
                          icon="group"
                          onChange={this.handleChange}
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                        />

                        <div className="md-form">
                          <i className="fa fa-pencil prefix" />
                          <textarea
                            name="commentsOnEvent"
                            onChange={this.handleChange}
                            type="text"
                            id="form10"
                            className="md-textarea form-control"
                            rows="3"
                          />
                          <label htmlFor="form10">
                            Comments/Note/File addition (blueprints,designs..etc)
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <p className="h4 text-center py-4">Event Setup & Strike</p>
                      <div className="grey-text">
                        <Input
                          label="Load-in Time"
                          name="loadIn"
                          icon="clock"
                          onChange={this.handleChange}
                          group
                          type="time"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <Input
                          label="Set-by Time"
                          name="setByTime"
                          icon="clock"
                          onChange={this.handleChange}
                          group
                          type="time"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <Input
                          label="Strike Time"
                          name="strikeTime"
                          icon="clock"
                          onChange={this.handleChange}
                          group
                          type="time"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <div className="md-form">
                          <i className="fa fa-pencil prefix" />
                          <textarea
                            name="commentsOnSetup"
                            onChange={this.handleChange}
                            type="text"
                            id="form10"
                            className="md-textarea form-control"
                            rows="3"
                          />
                          <label htmlFor="form10">Comments/Notes</label>
                        </div>
                      </div>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input"
                          id="defaultUnchecked"
                          name="defaultExampleRadios"
                        />
                        <label
                          className="custom-control-label h4 text-center py-4"
                          htmlFor="defaultUnchecked"
                        >
                          Will-Call Order
                        </label>
                      </div>

                      <div className="grey-text">
                        <Input
                          label="Customer Name"
                          name="willCallCustomerName"
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
                          name="willCallPickupDate"
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
                          name="willCallPickupTime"
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
                          name="willCallReturnDate"
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
                          name="willCallReturnTime"
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
                    <Link
                      to={{
                        pathname: '/checkout/summary',
                        state: {
                          cartProps: this.props.location.state.cartProps,
                          eventProps: this.state
                        }
                      }}
                    >
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
