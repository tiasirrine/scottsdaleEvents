import React, { Component } from 'react';
import SidebarButton from './SidebarButton';
// import { Link, NavLink } from 'react-router-dom';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { subCategories: null };
  }

  componentDidUpdate(prevProps) {
    console.log('aaaaaaaa', this.props.subCategories);
    if (this.props.subCategories !== prevProps.subCategories) {
      this.setState({ subCategories: this.props.subCategories });
    }
  }

  // getCategories = () => {
  //   return this.props.subCategories
  //     ? Object.entries(this.props.subCategories)
  //     : null;
  // };

  render() {
    const { subCategories } = this.state;
    return (
      <div className="sidebar">
        <ul className="nav flex-column">
          {subCategories
            ? Object.keys(subCategories).map((category, index, categories) => {
                console.log(category);
                return (
                  <SidebarButton
                    key={category}
                    category={category}
                    subCategories={subCategories[category]}
                  />
                );
              })
            : null}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
