import React, { Component } from 'react';
import { Container, Row, Col, Card } from 'mdbreact';

class EcommercePage extends Component {
  render() {
    return (
      <Container>
        <section className="text-center my-5">
          <h2 className="h1-responsive font-weight-bold text-center my-5">
            Our bestsellers
          </h2>
          <p className="grey-text text-center w-responsive mx-auto mb-5">
            At Scottsdale Event Decor we are proud to deliver superb quality
            rental items that are designed and manufactured locally in our
            warehouse.
          </p>
          <Row>
            <Col lg="3" md="6" className="mb-lg-0 mb-4">
              <Card collection className="z-depth-1-half">
                <div className="view zoom">
                  <img
                    src="https://s3-us-west-2.amazonaws.com/scottsdaleevents/carousel/bar11.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="stripe dark">
                    <a>
                      <p>Bistro Lighting</p>
                    </a>
                  </div>
                </div>
              </Card>
            </Col>
            <Col lg="3" md="6" className="mb-lg-0 mb-4">
              <Card collection className="z-depth-1-half">
                <div className="view zoom">
                  <img
                    src="https://s3-us-west-2.amazonaws.com/scottsdaleevents/carousel/bar11.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="stripe dark">
                    <a>
                      <p>Wood Tables</p>
                    </a>
                  </div>
                </div>
              </Card>
            </Col>
            <Col lg="3" md="6" className="mb-lg-0 mb-4">
              <Card collection className="z-depth-1-half">
                <div className="view zoom">
                  <img
                    src="https://s3-us-west-2.amazonaws.com/scottsdaleevents/carousel/bar11.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="stripe dark">
                    <a>
                      <p>Premium Seating</p>
                    </a>
                  </div>
                </div>
              </Card>
            </Col>
            <Col lg="3" md="6" className="mb-lg-0 mb-4">
              <Card collection className="z-depth-1-half">
                <div className="view zoom">
                  <img
                    src="https://s3-us-west-2.amazonaws.com/scottsdaleevents/carousel/bar11.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="stripe dark">
                    <a>
                      <p>Bars</p>
                    </a>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </section>
      </Container>
    );
  }
}

export default EcommercePage;
