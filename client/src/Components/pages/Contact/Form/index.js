import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Fa, Button, Input } from 'mdbreact';

class ContactPage extends Component {
  render() {
    return (
      <Container>
        <section className="my-5">
          <h2 className="h1-responsive font-weight-bold text-center my-5">Contact us</h2>
          <p className="text-center w-responsive mx-auto pb-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure
            provident voluptate esse quasi, veritatis totam voluptas nostrum quisquam eum porro a
            pariatur veniam.
          </p>
          <Row>
            <Col md="9" className="md-0 mb-5">
              <form>
                <Row>
                  <Col md="6">
                    <div className="md-form mb-0">
                      <Input type="text" id="contact-name" label="Your name" />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="md-form mb-0">
                      <Input type="text" id="contact-email" label="Your email" />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <div className="md-form mb-0">
                      <Input type="text" id="contact-subject" label="Subject" />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <div className="md-form mb-0">
                      <Input type="textarea" id="contact-message" label="Your message" />
                    </div>
                  </Col>
                </Row>
              </form>
              <div className="text-center text-md-left">
                <Button color="primary" size="md">
                  Send
                </Button>
              </div>
            </Col>
            <Col md="3" className="text-center">
              <ul className="list-unstyled mb-0">
                <li>
                  <Fa icon="map-marker" size="2x" className="blue-text" />
                  <p>San Francisco, CA 94126, USA</p>
                </li>
                <li>
                  <Fa icon="phone" size="2x" className="blue-text mt-4" />
                  <p>+ 01 234 567 89</p>
                </li>
                <li>
                  <Fa icon="envelope" size="2x" className="blue-text mt-4" />
                  <p>contact@example.com</p>
                </li>
              </ul>
            </Col>
          </Row>
        </section>
      </Container>
    );
  }
}

export default ContactPage;
