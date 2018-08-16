import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Fa, Button, Input } from 'mdbreact';
import './Checkout.css';
import { Link } from 'react-router-dom';

class EventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventCustName: '',
      eventGroupName: '',
      eventVenue: '',
      eventDate: '',
      eventTime: '',
      eventLocation: '',
      eventRoom: '',
      eventComments: '',
      setupAt: '',
      setupBy: '',
      setupComments: '',
      willCustName: '',
      willPickupDate: '',
      willPickupTime: '',
      willReturnDate: '',
      willReturnTime: ''
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // allows the form to submit on enter.
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  };

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
                          // value={this.props.location.state.eventProps.eventCustName}
                          label="Customer Name"
                          name="eventCustName"
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
                          name="eventGroupName"
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
                          name="eventVenue"
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
                          label="Time of Event"
                          name="eventTime"
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
                          name="eventLocation"
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
                          name="eventRoom"
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
                            name="eventComments"
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
                          label="Set-up at"
                          name="setupAt"
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
                          name="setupBy"
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
                            name="setupComments"
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
                          name="willCustName"
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
                          name="willPickupDate"
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
                          name="willPickupTime"
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
                          name="willReturnDate"
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
                          name="willReturnTime"
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
                          cartProps: this.props.location.state,
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
