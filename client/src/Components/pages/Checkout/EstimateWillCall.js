/* eslint-disable */
import React from 'react';
import { Card, CardBody, Table, Row, Col } from 'mdbreact';
import './Checkout.css';

export default class EstimateWillCall extends React.Component {
  render() {
    return (
      <div>
        <h3 className="text-center mb-3">Will Call Details</h3>
        <Card>
          <Row>
            <Col md="12">
              <Table>
                <thead className="blue-grey lighten-4">
                  <tr>
                    <th className="text-center">
                      <b>Event Details</b>
                    </th>
                    <th className="text-center">
                      <b>Your Event</b>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {this.props.details &&
                    this.props.details.map((obj, index) => {
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
        </Card>
      </div>
    );
  }
}
