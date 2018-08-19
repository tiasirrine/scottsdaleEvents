import React, { Component } from 'react';
import SidebarButton from './SidebarButton';
// import { Link, NavLink } from 'react-router-dom';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subCategories: this.props.subCategories ? this.props.subCategories : null
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.subCategories !== prevProps.subCategories) {
      this.setState({ subCategories: this.props.subCategories });
    }
  }

  render() {
    const { subCategories } = this.state;
    return (
      <div
        className="sidebar"
        style={
          this.props.sidebarOpen
            ? { transform: 'translateX(0%)', zIndex: 2 }
            : { transform: 'translateX(-100%)' }
        }
      >
        <ul className="nav flex-column">
          {subCategories
            ? Object.keys(subCategories).map((category, index, categories) => {
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
