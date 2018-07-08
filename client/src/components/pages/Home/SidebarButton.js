import React, { Component } from 'react';

class SidebarButton extends Component {
  state = {};
  render() {
    const { props } = this;
    const { category, subCategories } = props;

    return (
      <ul className="nav flex-column">
        <li className="nav-item">
          <a
            className="nav-link d-flex justify-content-between"
            data-toggle="collapse"
            aria-expanded="false"
            href={`#${category}-sub-menu`}
          >
            {category}
            <i className="fa fa-caret-down" />
          </a>
          <ul
            className="collapse list-unstyled sub-category"
            id={`${category}-sub-menu`}
          >
            {subCategories.map(subCategory => (
              <li key={subCategory}>
                <a>{subCategory}</a>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    );
  }
}

export default SidebarButton;
