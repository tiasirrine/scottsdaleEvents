import React, { Component, Fragment } from 'react';
import Sidebar from 'react-sidebar';

const mql = window.matchMedia(`(min-width: 800px)`);

export default class SideNav extends Component {
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

  toggleSidebar = () => {
    console.log(this.state);
    if (this.state.sidebarOpen === false) {
      this.setState({ sidebarDocked: false, sidebarOpen: true });
    } else {
      this.setState({ sidebarDocked: false, sidebarOpen: false });
    }
  };

  mediaQueryChanged = () =>
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });

  render() {
    const MainContent = this.props.mainContent;
    const SideNavContent = this.props.SideNavContent;
    console.log(SideNavContent);
    return (
      <Sidebar
        sidebar={SideNavContent}
        sidebarClassName={'sidebarClassName'}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
      >
        {MainContent(this.toggleSidebar)}
      </Sidebar>
    );
  }
}
