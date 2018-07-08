import React, { Component } from 'react';
import SidebarButton from './SidebarButton';
// import { Link, NavLink } from 'react-router-dom';
import './Home.css';

class Sidebar extends Component {
  state = {
    categories: ['Furniture', 'Bars', 'Lighting'],
    subCategories: [
      { Furniture: ['Tables', 'Chairs', 'Sofas'] },
      { Bars: ['bar1', 'bar2', 'bar3'] },
      { Lighting: ['lights1', 'lights2', 'lights3'] }
    ]
  };

  //TODO: api call to get categories
  //TODO: api call to get sub categories of each category

  render() {
    console.log(this.state);
    const { state } = this;
    const { categories, subCategories } = state;
    return (
      <div className="sidebar">
        <ul className="nav flex-column">
          {categories.map((category, index, categories) => (
            <SidebarButton
              key={category}
              category={category}
              subCategories={subCategories[index][category]}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
