import React from "react";

const Portfolio = props => (
  <section id="portfolio">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h5>Services</h5>
          <h2>Featured Packages</h2>
        </div>
      </div>
      <div className="row">
        <div className="portfolio-wrapper col-md-12">
          <div className="filter-buttons">
            <div className="button-group filters-button-group">
              <button className="button is-checked" data-filter="*">
                Package 1
              </button>
              <button className="button" data-filter=".ct1">
                Package 2
              </button>
              <button className="button" data-filter=".ct2">
                Package 3
              </button>
              <button className="button" data-filter=".ct3">
                Package 4
              </button>
              <button className="button" data-filter=".ct4">
                Package 5
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid">
        <div className="row">
          <div className="col-md-4 grid-item ct3 ct4">
            <div className="single-portfolio-item">
              <a href="">
                <img src="images/p1.png" alt="" />
              </a>
            </div>
            <div className="search">
              <a href="images/p1.png" className="port-view">
                <i className="fas fa-search-plus" />
              </a>
            </div>
            <div className="description d-flex">
              <p>
                Rappox Template<br />
                <span>Html template design.</span>
              </p>
              <i className="far fa-heart" />
            </div>
          </div>
          <div className="col-md-4 grid-item ct1">
            <div className="single-portfolio-item ">
              <a href="">
                <img src="images/p2.png" alt="" />
              </a>
            </div>
            <div className="search">
              <a href="images/p2.png" className="port-view">
                <i className="fas fa-search-plus" />
              </a>
            </div>
            <div className="description d-flex">
              <p>
                Rappox Template<br />
                <span>Html template design.</span>
              </p>
              <i className="far fa-heart" />
            </div>
          </div>
          <div className="col-md-4 grid-item ct3">
            <div className="single-portfolio-item">
              <a href="">
                <img src="images/p3.png" alt="" />
              </a>
            </div>
            <div className="search">
              <a href="images/p3.png" className="port-view">
                <i className="fas fa-search-plus" />
              </a>
            </div>
            <div className="description d-flex">
              <p>
                Rappox Template<br />
                <span>Html template design.</span>
              </p>
              <i className="far fa-heart" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 grid-item ct2 ct3 ct4">
            <div className="single-portfolio-item">
              <a href="">
                <img src="images/p4.png" alt="" />
              </a>
            </div>
            <div className="search">
              <a href="images/p4.png" className="port-view">
                <i className="fas fa-search-plus" />
              </a>
            </div>
            <div className="description d-flex">
              <p>
                Rappox Template<br />
                <span>Html template design.</span>
              </p>
              <i className="far fa-heart" />
            </div>
          </div>
          <div className="col-md-4 grid-item ct1">
            <div className="single-portfolio-item ">
              <a href="">
                <img src="images/p5.png" alt="" />
              </a>
            </div>
            <div className="search">
              <a href="images/p5.png" className="port-view">
                <i className="fas fa-search-plus" />
              </a>
            </div>
            <div className="description d-flex">
              <p>
                Rappox Template<br />
                <span>Html template design.</span>
              </p>
              <i className="far fa-heart" />
            </div>
          </div>
          <div className="col-md-4 grid-item ct2 ct3 ct4">
            <div className="single-portfolio-item">
              <a href="">
                <img src="images/p6.png" alt="" />
              </a>
            </div>
            <div className="search">
              <a href="images/p6.png" className="port-view">
                <i className="fas fa-search-plus" />
              </a>
            </div>
            <div className="description d-flex">
              <p>
                Rappox Template<br />
                <span>Html template design.</span>
              </p>
              <i className="far fa-heart" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Portfolio;
