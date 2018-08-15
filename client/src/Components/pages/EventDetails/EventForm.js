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
      <Container className="m120">
        <section className="my-5">
          <h2 className="h1-responsive font-weight-bold text-center">Event Details</h2>
          <p className="text-center w-responsive mx-auto pb-5">
            Please provide us with the details of the Event
          </p>
          <Row>
            <Col md="9" className="md-0 mb-5">
              <form>
                <Row>
                  <Col md="12">
                    <div className="md-form mb-0">
                      {this.state.resultName && <p className="my-2">{this.state.resultName}</p>}
                      <Input
                        type="text"
                        id="name"
                        label="Event Details
Customer Name 
Group Name (Required)
Venue 
Date of Event 
Time of Event 
Location of Event 
Room 
Comments/Note/File addition (blueprints,designs..etc)
Event Setup & Strike
Set-up at 
Set-up by 
Comments/Notes 
 Will Call Order (Only if button is activated; means they are subleasing from us)
Customer Name 
Pick Up Date 
Pick Up Time 
Return Date 
Return Time
"
                        name="name"
                        onChange={this.handleChange}
                        onKeyPress={(this.handleKeyPress, this.toggle)}
                        value={this.state.resultName}
                      />
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="md-form mb-0">
                      {this.state.resultCompany && (
                        <p className="my-2">{this.state.resultCompany}</p>
                      )}
                      <Input
                        type="text"
                        id="companyName"
                        label="Company name"
                        name="companyName"
                        onChange={this.handleChange}
                        onKeyPress={(this.handleKeyPress, this.toggle)}
                        required
                        value={this.state.resultCompany}
                      />
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="md-form mb-0">
                      {this.state.resultEmail && <p className="my-2">{this.state.resultEmail}</p>}
                      <Input
                        type="text"
                        id="contactEmail"
                        label="Your email"
                        name="contactEmail"
                        onChange={this.handleChange}
                        onKeyPress={(this.handleKeyPress, this.toggle)}
                        value={this.state.resultEmail}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <div className="md-form mb-0">
                      {this.state.resultNumber && <p className="my-2">{this.state.resultNumber}</p>}
                      <Input
                        type="text"
                        id="number"
                        label="Contact Number"
                        name="number"
                        onChange={this.handleChange}
                        onKeyPress={(this.handleKeyPress, this.toggle)}
                        value={this.state.resultNumber}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <div className="md-form mb-0">
                      {this.state.resultMessage && (
                        <p className="my-2">{this.state.resultMessage}</p>
                      )}
                      <Input
                        type="textarea"
                        id="message"
                        label="Your message"
                        name="message"
                        onChange={this.handleChange}
                        onKeyPress={(this.handleKeyPress, this.toggle)}
                        value={this.state.resultMessage}
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
                  onKeyPress={this.handleKeyPress}
                  type="send"
                >
                  Summary
                </Button>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    );
  }
}

export default EventForm;
