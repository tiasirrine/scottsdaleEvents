import React, { Component, Fragment } from 'react';
import './About';
import { Container, Jumbotron, Row, Col } from 'reactstrap';

class AboutPage extends Component {
  render() {
    return (
      <Fragment>
        <Jumbotron fluid>
          <Container fluid>
            <div className="about-bio">
              <p>
                Founder and owner of Scottsdale Event Decor and Scottsdale Music & Entertainment,
                Kaine Stathakis is a veteran in the corporate event industry with over 20 years of
                experience. Having worked events at some of the finest resorts in the region,
                including The Phoenician, Royal Palms, Four Seasons Scottsdale, J.W. Marriott Desert
                Ridge, J.W. Marriott Camelback Inn, Ritz Carlton Phoenix, Westin Kierland, Hyatt
                Gainey Ranch, The Boulders, Fairmont Scottsdale Princess and Omni Montelucia in
                Arizona, The Lodge at Pebble Beach, Spanish Bay, Baccara, Hotel Del Coronado, Four
                Seasons Aviara, The Montage Laguna Beach, Marriott San Diego and St Regis Monarch
                Beach in California as well as Wynn, Bellagio, Caesars Palace and Mandalay Bay in
                Las Vegas. With a passion for providing the finest in products and service, it's no
                question that Kaine has been such a prominent figure in Arizona's corporate event
                industry.
              </p>
              ​
              <p>
                Founder and owner Cristina Stathakis recognized a need for luxury rentals in the
                corporate event market. Having been involved in over a thousand events since 2013,
                Cristina's eye for design craved something more from what was currently available in
                the marketplace. As a result, Scottsdale Event Decor came to life. Her love for
                beautiful events helped in the design of our collections.
              </p>
              ​
              <p>
                At Scottsdale Event Decor we are proud to deliver superb quality rental items that
                are designed and manufactured locally in our warehouse.
              </p>
            </div>
          </Container>
        </Jumbotron>
      </Fragment>
    );
  }
}

export default AboutPage;
