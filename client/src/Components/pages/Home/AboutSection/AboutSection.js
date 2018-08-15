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
                  <h4 className="font-weight-bold text-center"> Quality</h4>
                  <p className="grey-text">
                    As a boutique rental company, our commitment to quality is second to none. From
                    seeking out the best materials, to painstakingly handcrafting our items, our
                    furniture grade rentals and pieces that most of our clients even want for their
                    own homes! We provide the quality deserving of display in the finest resorts of
                    the area.
                  </p>
                </Col>
              </Row>
            </Col>
            <Col md="4" className="md-0 mb-5">
              <Row>
                <Col lg="10" md="9" size="10">
                  <h4 className="font-weight-bold"> The Industry Choice</h4>
                  <p className="grey-text">
                    It comes as no surprise that our commitment to service & quality has made us the
                    industry choice many years running. Our clientele knows that when only the best
                    will do, Scottsdale Event Decor is it!
                  </p>
                </Col>
              </Row>
            </Col>
            <Col md="4" className="md-0 mb-5">
              <Row>
                <Col lg="10" md="9" size="10">
                  <h4 className="font-weight-bold text-center"> Service</h4>
                  <p className="grey-text">
                    From the initial email to the strike of the event, our team is committed to your
                    satisfaction. Unlike other rental companies who just “drop” off the order, our
                    crew is works with your onsite operations team to make sure everything gets to
                    the right place and set in the right area. Bottom line, Scottsdale Event Decor
                    gets the job done right.
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
