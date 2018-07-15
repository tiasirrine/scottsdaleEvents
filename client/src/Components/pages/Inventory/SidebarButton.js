import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class SidebarButton extends Component {
  state = {};
  render() {
    const { props } = this;
    const { category, subCategories } = props;

    console.log('hello', props);
    return (
      <li className="nav-item">
        {!subCategories.includes('') ? (
          <Fragment>
            <a
              className="nav-link d-flex justify-content-between"
              data-toggle="collapse"
              aria-expanded="false"
              href={`#${category.split(' ')[0]}-sub-menu`}
            >
              {category}
              <i className="fa fa-caret-down" />
            </a>
            <ul
              className="collapse list-unstyled sub-category"
              id={`${category.split(' ')[0]}-sub-menu`}
            >
              {subCategories
                ? subCategories.map((a, i) => (
                    <Link to={`/inventory/${category}/${a}`}>
                      <li key={i}>{a}</li>
                    </Link>
                  ))
                : null}
            </ul>
          </Fragment>
        ) : (
          <Link
            to={`/inventory/${category}`}
            className="nav-link d-flex justify-content-between"
          >
            {category}
          </Link>
        )}
      </li>
    );
  }
}

export default SidebarButton;
