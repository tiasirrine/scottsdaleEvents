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

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  // clears sessions storage and logs a user out
  logout = () => sessionStorage.clear();

  render() {
    const MainContent = this.props.mainContent;
    console.log(this.props);
    return (
      <Sidebar
        sidebar={<SidebarContent />}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
      >
        <MainContent />
      </Sidebar>
    );
  }
}

export default AdminSidebar;
