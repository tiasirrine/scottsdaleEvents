/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { Container, Row, Button, Card, CardBody, CardTitle, Input } from 'mdbreact';
import API from '../../../api/API';
import { handleInputChange, timeout } from '../../../api/validate';
import EstimateCard from './EstimateCard';

export default class Estimates extends Component {
  constructor(props) {
    super(props);
    this.state = { estimates: null, error: null };
    this.customerId = sessionStorage.getItem('userId');
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getEstimates();
  }

  getEstimates = () => {
    API.getEstimates(this.customerId)
      .then(result => {
        console.log(result);
        this.setState({ estimates: result.data.success });
      })
      .catch(error => {
        const err =
          error.message && error.message.includes('timeout')
            ? 'Connection timed out'
            : error.response.data.message;
        console.log(err);
        this.setState({ error: err });
      });
  };

  render() {
    return (
      <Container>
        <Row>
          {this.state.estimates &&
            this.state.estimates.map((estimate, i) => (
              <EstimateCard key={i} estimate={estimate} />
            ))}
        </Row>
      </Container>
    );
  }
}
