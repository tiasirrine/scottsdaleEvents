/* eslint-disable */
import React, { Fragment } from 'react';
import { Card, CardBody, Table, Row, Col } from 'mdbreact';
import './Checkout.css';

export default class EstimateDetails extends React.Component {
  trow = () => (
    <thead className="blue-grey lighten-4">
      <tr>
        <th className="text-center">Event Details</th>
        <th className="text-center">Your Event</th>
      </tr>
    </thead>
  );

  mapDetails = (obj, index) => {
    const camelCase = obj
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
    return (
      <tr key={index}>
        <td className="text-center">{camelCase}</td>
        <td className="text-center">{this.props.realValues[obj]}</td>
      </tr>
    );
  };

  theBody = (valToMap, sz) => {
    return (
      <Col md={sz}>
        <Table>
          {this.trow()}
          <tbody>{valToMap && valToMap.map(this.mapDetails)}</tbody>
        </Table>
      </Col>
    );
  };

  render() {
    return (
      <Card className="mb-3">
        <CardBody>
          <h3 className="text-center mb-3">Event Details</h3>{' '}
          <Row>
            {this.theBody(this.props.detailsCol1, 6)}
            {this.theBody(this.props.detailsCol2, 6)}
          </Row>
        </CardBody>
      </Card>
    );
  }
}
