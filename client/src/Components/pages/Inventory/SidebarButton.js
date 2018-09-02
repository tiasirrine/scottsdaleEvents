/* eslint-disable */
import React, { Component } from 'react';
import { Collapse } from 'mdbreact';
import { Link } from 'react-router-dom';

export default class SideBarButton extends Component {
  constructor(props) {
    super(props);
    this.state = { collapse: false, active: false };
  }

  // this is used to auto open the sidebar cat and subcat if a user does not interact with the sidebar,
  // and instead opens the them up by pressing the image
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      let activeC;
      let activeS;
      const lc = this.props.location.pathname.split('/')[2];
      const ls = this.props.location.pathname.split('/')[3];
      const { categories, getActiveIndex, subCategories } = this.props;
      categories.forEach((a, i) => (a === lc ? (activeC = i) : null));
      getActiveIndex(activeC);
      subCategories.forEach((a, i) => (a === ls ? (activeS = i) : null));
      this.setState({ active: activeS });
    }
  }

  // this is used to add the active class for a sub category
  subCatLinkClick(index) {
    this.setState({ active: index });
  }

  // this is used to add the active class for a main category
  categoryFontWeight = () => {
    if (this.props.index === this.props.activeIndex) {
      return { fontWeight: '700', fontSize: '22px', letterSpacing: '1px' };
    }
  };

  // styles for sub category active class
  // also used to set and remove active class on a sub category
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
      }
    }
  };

  // used to determine if a main category can open or not.
  // only 1 category is open at a time. Whenever a category is opened, the index of that category
  // gets set in the state of Sidebar component.
  // if the index value in Sidebar component matches the current index, then it can be opened
  canItOpen = () => {
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
      <div>
        <Link to={`/inventory/${category}`}>
          <p
            className="mb-0 mr-2 d-flex justify-content-between shadow main-btn"
            style={{
              fontSize: '19px',
              cursor: 'pointer',
              color: 'white',
              padding: '1rem',
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
          <Collapse
            style={{
              backgroundColor: 'white',
              padding: '1rem',
              paddingLeft: '2rem'
            }}
            ref={el => (this.el = el)}
            isOpen={this.canItOpen()}
          >
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
