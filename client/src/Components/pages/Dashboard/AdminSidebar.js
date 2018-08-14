// import './dashboard.css';
import React, { Component, Fragment } from 'react';
import Sidebar from 'react-sidebar';
import SidebarContent from './SidebarContent';

const mql = window.matchMedia(`(min-width: 800px)`);

class AdminSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false
    };
  }

  componentDidMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  // componentWillUnmount() {
  //   this.state.mql.removeListener(this.mediaQueryChanged);
  // }

  onSetSidebarOpen = open => this.setState({ sidebarOpen: open });

  mediaQueryChanged = () =>
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });

  render() {
    const MainContent = this.props.mainContent;
    return (
      <Sidebar
        sidebar={<SidebarContent />}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
      >
        {MainContent}
      </Sidebar>
    );
  }
}

export default AdminSidebar;
