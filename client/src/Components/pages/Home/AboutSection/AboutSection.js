import React, { Component } from 'react';
import { Container, Row, Col, Fa, Button } from 'mdbreact';
import './AboutSection.css';

class FeaturesPage extends Component {
  render() {
    return (
      <Container>
        <section className="my-5">
          <h2 className="h1-responsive font-weight-bold text-center my-5">What Sets Us Apart?</h2>
          <p className="lead grey-text w-responsive text-center mx-auto mb-5">
            Our collections have been handpicked and handcrafted with one specific goal in mind; to
            make your event look spectacular.
          </p>
          <Row>
            <Col md="4" className="md-0 mb-5">
              <Row>
                <Col lg="10" md="9" size="10">
                  <h4 className="font-weight-bold">Design</h4>
                  <p className="grey-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                  </p>
                </Col>
              </Row>
            </Col>
            <Col md="4" className="md-0 mb-5">
              <Row>
                <Col lg="10" md="9" size="10">
                  <h4 className="font-weight-bold">Logistics</h4>
                  <p className="grey-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                  </p>
                </Col>
              </Row>
            </Col>
            <Col md="4" className="md-0 mb-5">
              <Row>
                <Col lg="10" md="9" size="10">
                  <h4 className="font-weight-bold">Professional</h4>
                  <p className="grey-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </section>
      </Container>
    );
  }
}

export default FeaturesPage;
