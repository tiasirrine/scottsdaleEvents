import React, { Component } from 'react';
import { Container, Row, Col, Card, CardImage, CardBody, CardTitle, CardText, CardFooter, Fa, Tooltip, Badge, Button } from 'mdbreact';

class EcommercePage extends Component {
  render() {
    return (
      <Container>
        <section className="text-center my-5">
          <h2 className="h1-responsive font-weight-bold text-center my-5">Our bestsellers</h2>
          <p className="grey-text text-center w-responsive mx-auto mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum quisquam eum porro a pariatur veniam.</p>
          <Row>
            <Col lg="3" md="6" className="mb-lg-0 mb-4">
              <Card collection className="z-depth-1-half">
                <div className="view zoom">
                  <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/5.jpg" className="img-fluid" alt="" />
                  <div className="stripe dark">
                    <a>
                      <p>Red trousers <Fa icon="angle-right"></Fa></p>
                    </a>
                  </div>
                </div>
              </Card>
            </Col>
            <Col lg="3" md="6" className="mb-lg-0 mb-4">
              <Card collection className="z-depth-1-half">
                <div className="view zoom">
                  <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/8.jpg" className="img-fluid" alt="" />
                  <div className="stripe dark">
                    <a>
                      <p>Sweatshirt <Fa icon="angle-right"></Fa></p>
                    </a>
                  </div>
                </div>
              </Card>
            </Col>
            <Col lg="3" md="6" className="mb-lg-0 mb-4">
              <Card collection className="z-depth-1-half">
                <div className="view zoom">
                  <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/9.jpg" className="img-fluid" alt="" />
                  <div className="stripe dark">
                    <a>
                      <p>Accessories <Fa icon="angle-right"></Fa></p>
                    </a>
                  </div>
                </div>
              </Card>
            </Col>
            <Col lg="3" md="6" className="mb-lg-0 mb-4">
              <Card collection className="z-depth-1-half">
                <div className="view zoom">
                  <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/7.jpg" className="img-fluid" alt="" />
                  <div className="stripe dark">
                    <a>
                      <p>Sweatshirt <Fa icon="angle-right"></Fa></p>
                    </a>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </section>
      </Container>
    );
  };
}

export default EcommercePage;