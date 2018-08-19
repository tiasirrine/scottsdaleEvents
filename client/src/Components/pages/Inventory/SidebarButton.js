import React, { Component, Fragment } from 'react';
import { Button, Collapse } from 'mdbreact';
import { Link } from 'react-router-dom';

export default class SideBarButton extends Component {
  constructor(props) {
    super(props);
    this.state = { collapse: false, active: false };
  }

  toggle = () => {
    this.setState({
      collapse: !this.state.collapse,
      active: !this.state.collapse && false
    });
  };

  click(index) {
    this.setState({ active: index });
  }

  categoryFontWeight = () => {
    return this.state.collapse ? { fontWeight: '700', color: 'black' } : '400';
  };

  render() {
    const { category, subCategories } = this.props;
    return (
      <div style={{ margin: '1rem', marginLeft: '2rem' }}>
        <Link to={`/inventory/${category}`}>
          <p
            className="mb-0 d-flex justify-content-between sidenav-btn-hover"
            style={{
              fontSize: '19px',
              cursor: 'pointer',
              ...this.categoryFontWeight()
            }}
            onClick={this.toggle}
          >
            {category}
            {!subCategories.includes('') && <i className="fa fa-angle-down" />}
          </p>
        </Link>
        {!subCategories.includes('') && (
          <Collapse isOpen={this.state.collapse}>
            {subCategories &&
              subCategories.map((a, i) => (
                <Link key={i} to={`/inventory/${category}/${a}`}>
                  <p
                    className={`${this.state.active === i &&
                      'weight'} sidenav-btn-hover`}
                    style={{
                      marginLeft: '1rem',
                      marginBottom: '.5rem',
                      marginTop: '1rem',
                      fontSize: '16px',
                      cursor: 'pointer'
                    }}
                    onClick={this.click.bind(this, i)}
                  >
                    {a}
                  </p>
                </Link>
              ))}
          </Collapse>
        )}
      </div>
    );
  }
}
