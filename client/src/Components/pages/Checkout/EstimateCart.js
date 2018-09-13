/* eslint-disable */
import React from 'react';
import { Card, CardBody, Table, Row } from 'mdbreact';
import './Checkout.css';

export default class EstimateCart extends React.Component {
  render() {
    return (
      <Card>
        <CardBody>
          {' '}
          <h3 className="text-center mb-3">Cart</h3>{' '}
          <Table>
            <thead className="blue-grey lighten-4">
              <tr>
                <th className="text-left">
                  <b>Items</b>
                </th>
                <th className="text-center">
                  <b>Quantity</b>
                </th>
                <th className="text-center">
                  <b>Price</b>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.cart &&
                this.props.cart.map((obj, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-left">{obj.name}</td>
                      <td className="text-center">{obj.qty}</td>
                      <td className="text-center">${obj.total}</td>
                    </tr>
                  );
                })}
              <tr>
                <td className="text-right">
                  <tr style={{ background: 'transparent' }}>
                    <b style={{ fontWeight: '300' }}>Est. Subtotal:</b>
                  </tr>
                  <tr style={{ background: 'transparent' }}>
                    <b style={{ fontWeight: '300' }}>Labor:</b>
                  </tr>
                  <tr style={{ background: 'transparent' }}>
                    <b style={{ fontWeight: '300' }}>Tax:</b>
                  </tr>
                  <tr style={{ background: 'transparent' }}>
                    <b style={{ fontWeight: '300' }}>Trucking:</b>
                  </tr>
                  <tr>_______________</tr>
                  <tr style={{ background: 'transparent' }}>
                    <b style={{ fontWeight: '600' }}>Est. Total:</b>
                  </tr>
                </td>
                <td className="text-right">
                  <tr style={{ background: 'transparent' }}>
                    <b style={{ fontWeight: '300' }}>
                      $
                      {this.props.cart &&
                        parseFloat(
                          Math.round(
                            this.props.cart.reduce((a, b) => a + parseInt(b.total), 0) * 100
                          ) / 100
                        ).toFixed(2)}{' '}
                    </b>
                  </tr>
                  <tr style={{ background: 'transparent' }}>
                    <b style={{ fontWeight: '300' }}>
                      $
                      {this.props.cart &&
                        parseFloat(
                          Math.round(
                            this.props.cart.reduce((a, b) => a + parseInt(b.total), 0) * 0.15 * 100
                          ) / 100
                        ).toFixed(2)}{' '}
                    </b>
                  </tr>
                  <tr style={{ background: 'transparent' }}>
                    <b style={{ fontWeight: '300' }}>
                      $
                      {this.props.cart &&
                        parseFloat(
                          Math.round(
                            this.props.cart.reduce((a, b) => a + parseInt(b.total), 0) * 0.085 * 100
                          ) / 100
                        ).toFixed(2)}{' '}
                    </b>
                  </tr>
                  <tr style={{ background: 'transparent' }}>
                    <b style={{ fontWeight: '300' }}>
                      ${this.props.cart && parseFloat(Math.round(285 * 100) / 100).toFixed(2)}{' '}
                    </b>
                  </tr>
                  <tr>_______________</tr>
                  <tr style={{ background: 'transparent' }}>
                    <b style={{ fontWeight: '600' }}>
                      $
                      {this.props.cart &&
                        parseFloat(
                          Math.round(
                            (this.props.cart.reduce((a, b) => a + parseInt(b.total), 0) +
                              this.props.cart.reduce((a, b) => a + parseInt(b.total), 0) * 0.15 +
                              this.props.cart.reduce((a, b) => a + parseInt(b.total), 0) * 0.085 +
                              285) *
                              100
                          ) / 100
                        ).toFixed(2)}{' '}
                    </b>
                  </tr>
                </td>
                <td className="text-center">{''} </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}
// parseFloat(Math.round(this.props.cart.reduce((a, b) => a + parseInt(b.total), 0) * 100) / 100).toFixed(2);
