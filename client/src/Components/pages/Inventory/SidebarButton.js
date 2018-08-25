import React, { Component, Fragment } from 'react';
import { Collapse } from 'mdbreact';
import { Link } from 'react-router-dom';

export default class SideBarButton extends Component {
  constructor(props) {
    super(props);
    this.state = { collapse: false, active: false };
  }

  subCatLinkClick(index) {
    this.setState({ active: index });
  }

  categoryFontWeight = () => {
    if (this.props.index === this.props.activeIndex) {
      return { fontWeight: '700', color: 'black' };
    }
  };

  subCatFontWeight = i => {
    const styles = {
      fontWeight: '700',
      marginLeft: 0,
      paddingLeft: '1rem',
      borderLeft: 'solid 4px #495c7a'
    };

    if (this.state.active === i) {
      return styles;
    }

    if (this.el) {
      if (!this.el.props.isOpen) {
        this.state.active = false;
        // return styles;
      }
    }
  };

  canItOpen = () => {
    // console.log(this.props.activeIndex, this.props.index);
    if (this.props.activeIndex === this.props.index) {
      return true;
    } else {
      this.subCatFontWeight();
      return false;
    }
  };

  render() {
    const { category, subCategories } = this.props;
    return (
      <div style={{ margin: '1rem', marginLeft: '2rem' }}>
        <Link to={`/inventory/${category}`}>
          <p
            className="mb-0 mr-2 d-flex justify-content-between sidenav-btn-hover"
            style={{
              fontSize: '19px',
              cursor: 'pointer',
              ...this.categoryFontWeight()
            }}
            onClick={() => {
              this.props.getActiveIndex(this.props.index);
            }}
          >
            {category}
            {!subCategories.includes('') && <i className="fa fa-angle-down" />}
          </p>
        </Link>
        {!subCategories.includes('') && (
          <Collapse ref={el => (this.el = el)} isOpen={this.canItOpen()}>
            {subCategories &&
              subCategories.map((a, i) => (
                <Link key={i} to={`/inventory/${category}/${a}`}>
                  <p
                    ref={p => (this.p = p)}
                    className={'sidenav-btn-hover'}
                    style={{
                      marginLeft: '1rem',
                      marginBottom: '.5rem',
                      marginTop: '1rem',
                      fontSize: '16px',
                      cursor: 'pointer',
                      ...this.subCatFontWeight(i)
                    }}
                    onClick={this.subCatLinkClick.bind(this, i)}
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
