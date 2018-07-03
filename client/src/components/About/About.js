import React from 'react';

const About = props => (
  <section id="about">
    <div id="about2">
      <div className="container">
        <div className="row">
          <div className="col-md-5 offset-md-1 stat wow slideInRight" data-wow-duration="3s">
            <div className="row">
              <div className="col-md-6 sub">
                <div className="facts-counter">
                  <span className="counter">482</span>
                </div>
                <h2>Projects Completed</h2>
              </div>
              <div className="col-md-6 sub">
                <div className="facts-counter">
                  <span className="counter">934</span>
                </div>
                <h2>Creative Designs</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 sub1">
                <div className="facts-counter">
                  <span className="counter">366</span>
                </div>
                <h2>Happy Clients</h2>
              </div>
              <div className="col-md-6 sub1">
                <div className="facts-counter">
                  <span className="counter">7322</span>
                </div>
                <h2>Happy Clients</h2>
              </div>
            </div>
          </div>
          <div className="col-md-5 para wow slideInLeft" data-wow-duration="3s">
            <h5>about</h5>
            <h2>
              A few words<br />about us
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. ad minim veniam, quis nostrud
              exercitation ullamco lsix blind smart out burst. Perfectly on furniture dejection
              determine my plasere lorem ipsum.
            </p>
            <a className="btn" href="">
              <i className="fas fa-eye" />My Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
export default About;
