/* eslint-disable */
import React, { Component } from 'react';
import SidebarButton from './SidebarButton';
// import { Link, NavLink } from 'react-router-dom';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subCategories: this.props.subCategories ? this.props.subCategories : null,
      activeIndex: null
    };
  }

  // without this, the sidebar buttons will not load if you refresh in the inventory page
  // re-renders the sidebar buttons whenever the component receives new props
  componentDidUpdate(prevProps) {
    if (this.props.subCategories !== prevProps.subCategories) {
      this.setState({ subCategories: this.props.subCategories });
    }
  }

  // this is used for tracking which dropdown is open, since only 1 dropdown is open at a time.
  // it gets called in an onClick function in SidebarButton. Grabs the index of that dropdown button,
  // and sets it in the state of this component to track which one is open.
  getActiveIndex = i => this.setState({ activeIndex: i });

  render() {
    const { subCategories } = this.state;
    return (
      <div
        className="sidebar"
        style={
          this.props.sidebarOpen
            ? { transform: 'translateX(0%)' }
            : { transform: 'translateX(-100%)' }
        }
      >
        <div className="inner-scroll">
          <ul className="nav flex-column">
            {subCategories
              ? Object.keys(subCategories).map((category, index, categories) => {
                  return (
                    <SidebarButton
                      {...this.props}
                      key={category}
                      category={category}
                      subCategories={subCategories[category]}
                      index={index}
                      getActiveIndex={this.getActiveIndex}
                      activeIndex={this.state.activeIndex}
                    />
                  );
                })
              : null}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
