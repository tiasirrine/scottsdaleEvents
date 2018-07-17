import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class SidebarButton extends Component {
  state = {};
  render() {
    const { props } = this;
    const { category, subCategories } = props;

    return (
      <li className="nav-item mb-3">
        {!subCategories.includes('') ? (
          <Fragment>
            <a
              className="nav-link d-flex justify-content-between waves-effect"
              data-toggle="collapse"
              aria-expanded="false"
              href={`#${category.split(' ')[0]}-sub-menu`}
            >
              {category}
              <i className="fa fa-angle-down rotate-icon" />
            </a>
            <ul
              className="collapse list-unstyled sub-category"
              id={`${category.split(' ')[0]}-sub-menu`}
            >
              {subCategories
                ? subCategories.map((a, i) => (
                    <Link key={i} to={`/inventory/${category}/${a}`}>
                      <li className="waves-effect">{a}</li>
                    </Link>
                  ))
                : null}
            </ul>
          </Fragment>
        ) : (
          <Link
            to={`/inventory/${category}`}
            className="nav-link d-flex justify-content-between waves-effect"
          >
            {category}
          </Link>
        )}
      </li>
    );
  }
}

export default SidebarButton;
