import './Footer.css';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Col, Container, Row, Footer } from 'mdbreact';

class FooterPage extends React.Component {
  render() {
    const { href } = window.location;
    if (href.includes('/admin') || href.includes('/dashboard')) {
      return null;
    }
    return (
      <Footer
        className={`font-small ${href.includes('/inventory') &&
          'mv-footer'} pt-4 footer-z`}
      >
        <Container fluid className="text-center text-md-left">
          <Row>
            <Col md="4" lg="4">
              <h5 className="text-uppercase mb-4 font-weight-bold">
                Scottsdale Event Dècor
              </h5>
              <p>
                Handcrafted, handselected, premier event rental company based in
                Scottsdale, Arizona.
              </p>
            </Col>
            <hr className="clearfix w-100 d-md-none" />
            <Col md="2" lg="2" className="ml-auto">
              <ul className="list-unstyled mb-2">
                <p className="mb-1">
                  <Link to="/">Home</Link>
                </p>
                <p className="mb-1">
                  <Link to="/inventory">Inventory</Link>
                </p>
                <p className="mb-1">
                  <Link to="/gallery">Gallery</Link>
                </p>
                <p className="mb-1">
                  <Link to="/about">About Us</Link>
                </p>
                <p className="mb-1">
                  <Link to="/contact">Contact Us</Link>
                </p>
                <p className="mb-1">
                  <Link to="/login">Login</Link>
                </p>
              </ul>
            </Col>
            <hr className="clearfix w-100 d-md-none" />
            <Col md="5" lg="3">
              <h5 className="text-uppercase mb-4 font-weight-bold">Address</h5>
              <p className="mb-1">
                <i className="fa fa-home mr-3" /> Scottsdale, Arizona
              </p>
              <p className="mb-1">
                <i className="fa fa-envelope mr-3" /> cristina@scottsdaleme.com
              </p>
              <p className="mb-1">
                <i className="fa fa-phone mr-3" /> (480)-699-9381
              </p>
            </Col>
            <hr className="clearfix w-100 d-md-none" />
            <hr className="clearfix w-100 d-md-none" />
          </Row>
        </Container>
        <div className="footer-copyright text-center py-3">
          <Container fluid>
            &copy; {new Date().getFullYear()} Copyright:{' '}
            <Link to="/"> Scottsdale Event Dècor</Link>
          </Container>
        </div>
      </Footer>
    );
  }
}

export default FooterPage;
