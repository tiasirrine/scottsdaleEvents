/* eslint-disable */
import React from 'react';
import { Card, CardBody, Table, Row, Col } from 'mdbreact';
import './Checkout.css';

export default class EstimateDetails extends React.Component {
  render() {
    return (
      <Card className="border-dark mb-3">
        <CardBody>
          <h3 className="text-center mb-3">Event Details</h3>{' '}
          <Row>
            <Col md="6">
              <Table>
                <thead className="blue-grey lighten-4">
                  <tr>
                    <th className="text-center">Event Details</th>
                    <th className="text-center">Your Event</th>
                  </tr>
                </thead>

                <tbody>
                  {this.props.detailsCol1 &&
                    this.props.detailsCol1.map((obj, index) => {
                      const camelCase = obj
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, str => str.toUpperCase());
                      return (
                        <tr key={index}>
                          <td className="text-center">{camelCase}</td>
                          <td className="text-center">
                            {this.props.realValues[obj]}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Col>
            <Col md="6">
              {' '}
              <Table>
                <thead className="blue-grey lighten-4">
                  <tr>
                    <th className="text-center">Event Details</th>
                    <th className="text-center">Your Event</th>
                  </tr>
                </thead>

                <tbody>
                  {this.props.detailsCol2 &&
                    this.props.detailsCol2.map((obj, index) => {
                      const camelCase = obj
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, str => str.toUpperCase());
                      return (
                        <tr key={index}>
                          <td className="text-center">{camelCase}</td>
                          <td className="text-center">
                            {this.props.realValues[obj]}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}
