import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Collapse,
  Input
} from 'mdbreact';
import './Checkout.css';
import { Link } from 'react-router-dom';
import { handleInputChange } from '../../../api/validate';

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.eventProps = this.props.location.state.eventProps;

    this.state = {
      customerName: sessionStorage.getItem('company'),
      groupName: this.eventProps ? this.eventProps.groupName : '',
      venue: this.eventProps ? this.eventProps.venue : '',
      eventDate: this.eventProps ? this.eventProps.eventDate : '',
      operationsManager: this.eventProps ? this.eventProps.operationsManager : '',
      eventStartTime: this.eventProps ? this.eventProps.eventStartTime : '',
      eventEndTime: this.eventProps ? this.eventProps.eventEndTime : '',
      room: this.eventProps ? this.eventProps.room : '',
      commentsOnEvent: this.eventProps ? this.eventProps.commentsOnEvent : '',
      loadIn: this.eventProps ? this.eventProps.loadIn : '',
      setByTime: this.eventProps ? this.eventProps.setByTime : '',
      strikeTime: this.eventProps ? this.eventProps.strikeTime : '',
      commentsOnSetup: this.eventProps ? this.eventProps.commentsOnSetup : '',
      willCallCustomerName: this.eventProps
        ? this.eventProps.willCallCustomerName
        : '',
      willCallPickupDate: this.eventProps ? this.eventProps.willCallPickupDate : '',
      willCallPickupTime: this.eventProps ? this.eventProps.willCallPickupTime : '',
      willCallReturnDate: this.eventProps ? this.eventProps.willCallReturnDate : '',
      willCallReturnTime: this.eventProps ? this.eventProps.willCallReturnTime : '',
      collapse: false
    };
    this.handleChange = handleInputChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  submitHandler = event => {
    event.preventDefault();
    event.target.className += ' was-validated';
  };

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const { collapse, ...stateEventProps } = this.state;
    return (
      <Container>
        <Card>
          <CardBody>
            <form onSubmit={this.submitHandler}>
              <Row>
                <Col md="8">
                  <p className="h4 text-center py-4">Event Details</p>
                  <Row>
                    <Col md="6">
                      <div className="grey-text">
                        <Input
                          value={sessionStorage.getItem('company')}
                          disabled
                          label="Customer Name"
                          name="customerName"
                          icon="user-circle"
                          onChange={this.handleChange}
                          type="text"
                          error="wrong"
                          success="right"
                          className="h-25"
                        />
                        <Input
                          value={this.state.groupName}
                          label="Group Name"
                          name="groupName"
                          icon="group"
                          onChange={this.handleChange}
                          type="text"
                          error="wrong"
                          success="right"
                          required
                          className="h-25"
                        />
                        <Input
                          value={this.state.eventDate}
                          label="Date of Event"
                          name="eventDate"
                          icon="calendar"
                          onChange={this.handleChange}
                          type="date"
                          error="wrong"
                          success="right"
                          required
                          className="h-25"
                        />

                        <Input
                          value={this.state.operationsManager}
                          label="Operation's Manager"
                          name="operationsManager"
                          icon="user-plus"
                          onChange={this.handleChange}
                          type="text"
                          error="wrong"
                          success="right"
                          className="h-25"
                        />
                        {<p>{this.state.groupNameresult}</p>}
                        <Input
                          value={this.state.venue}
                          label="Venue"
                          name="venue"
                          icon="building"
                          onChange={this.handleChange}
                          type="text"
                          error="wrong"
                          success="right"
                          required
                          className="h-25"
                        />
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="grey-text">
                        {<p>{this.state.groupNameresult}</p>}
                        <Input
                          value={this.state.eventStartTime}
                          label="Start Time of Event"
                          name="eventStartTime"
                          icon="clock-o"
                          onChange={this.handleChange}
                          type="time"
                          error="wrong"
                          success="right"
                          className="h-25"
                        />
                        <Input
                          value={this.state.eventEndTime}
                          label="End Time of Event"
                          name="eventEndTime"
                          icon="clock-o"
                          onChange={this.handleChange}
                          type="time"
                          error="wrong"
                          success="right"
                          className="h-25"
                        />
                        <Input
                          value={this.state.room}
                          label="Site/Room"
                          name="room"
                          icon="building-o"
                          onChange={this.handleChange}
                          type="text"
                          error="wrong"
                          success="right"
                          className="h-25"
                        />

                        <div className="md-form">
                          <i className="fa fa-pencil prefix" />
                          <textarea
                            value={this.state.commentsOnEvent}
                            name="commentsOnEvent"
                            icon="comment"
                            onChange={this.handleChange}
                            type="text"
                            id="form10"
                            className="md-textarea form-control h-25"
                            rows="3"
                          />
                          <label htmlFor="form10">Venue Comments/Notes</label>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>

                <Col md="4">
                  <p className="h4 text-center py-4">Event Setup & Strike</p>
                  <div className="grey-text">
                    <Input
                      value={this.state.loadIn}
                      label="Load-in Time"
                      name="loadIn"
                      icon="clock-o"
                      onChange={this.handleChange}
                      type="time"
                      error="wrong"
                      success="right"
                      className="h-25"
                    />
                    <Input
                      value={this.state.setByTime}
                      label="Set-by Time"
                      name="setByTime"
                      icon="clock-o"
                      onChange={this.handleChange}
                      type="time"
                      error="wrong"
                      success="right"
                      className="h-25"
                    />
                    <Input
                      value={this.state.strikeTime}
                      label="Strike Time"
                      name="strikeTime"
                      icon="clock-o"
                      onChange={this.handleChange}
                      type="time"
                      error="wrong"
                      success="right"
                      className="h-25"
                    />
                    <div className="md-form">
                      <i className="fa fa-pencil prefix" />
                      <textarea
                        value={this.state.commentsOnSetup}
                        name="commentsOnSetup"
                        icon="comment"
                        onChange={this.handleChange}
                        type="text"
                        id="form10"
                        className="md-textarea form-control h-25"
                        rows="3"
                      />
                      <label htmlFor="form10">Set/Strike Comments/Notes</label>
                    </div>
                  </div>
                </Col>
              </Row>

              <div className="text-center py-4 mt-3">
                <Button
                  color="success"
                  className="aButton"
                  size="md"
                  onClick={this.toggle}
                >
                  Will Call Order
                </Button>
                <Collapse isOpen={this.state.collapse}>
                  <div className="grey-text">
                    <Row className="justify-content-center">
                      <Col md="3">
                        <Input
                          value={this.state.willCallCustomerName}
                          label="Customer Name"
                          name="willCallCustomerName"
                          icon="clock"
                          onChange={this.handleChange}
                          type="text"
                          error="wrong"
                          success="right"
                        />
                      </Col>

                      <Col md="2">
                        <Input
                          value={this.state.willCallPickupDate}
                          label="Pick Up Date"
                          name="willCallPickupDate"
                          icon="clock"
                          onChange={this.handleChange}
                          type="date"
                          error="wrong"
                          success="right"
                        />
                      </Col>
                      <Col md="2">
                        <Input
                          value={this.state.willCallPickupTime}
                          label="Pick Up Time"
                          name="willCallPickupTime"
                          icon="clock"
                          onChange={this.handleChange}
                          type="time"
                          error="wrong"
                          success="right"
                        />
                      </Col>
                    </Row>
                    <Row className="justify-content-center">
                      <Col md="2">
                        <Input
                          value={this.state.willCallReturnDate}
                          label="Return Date"
                          name="willCallReturnDate"
                          icon="clock"
                          onChange={this.handleChange}
                          type="date"
                          error="wrong"
                          success="right"
                        />
                      </Col>
                      <Col md="2">
                        <Input
                          value={this.state.willCallReturnTime}
                          label="Return Time"
                          name="willCallReturnTime"
                          icon="clock"
                          onChange={this.handleChange}
                          type="time"
                          error="wrong"
                          success="right"
                        />
                      </Col>
                    </Row>
                  </div>
                </Collapse>
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
                      eventProps: stateEventProps
                    }
                  }}
                >
                  <Button
                    color="success"
                    className="aButton"
                    size="md"
                    name="event-form-submit"
                  >
                    Go to Summary
                  </Button>
                </Link>
              </div>
            </form>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default EventForm;
