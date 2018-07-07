import React, { Component } from 'react';
import { Paper, MenuList, withStyles } from '@material-ui/core';

import SidebarItem from './SidebarItem';

const styles = {
  Paper: {
    width: 300,
    borderRadius: 0,
    flex: 1
  }
};

class Sidebar extends Component {
  state = {
    sidebarItems: ['Tables', 'Chairs', 'Bars']
  };

  //TODO:
  // Create API call to csv file to get inventory categories and items

  //TODO:
  // set sidebarItems to be an array of all major inventory categories
  // create one button for each category
  // pass the sidebarItem, and all sidebarItemChildren into the SidebarItem component
  // SidebarItem component will render all inventory items for the inventory category

  render() {
    const state = this.state;
    return (
      <Paper style={styles.Paper}>
        <MenuList>
          {state.sidebarItems.map(item => (
            <SidebarItem key={item} text={item} />
          ))}
        </MenuList>
      </Paper>
    );
  }
}

export default Sidebar;
