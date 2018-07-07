import React, { Component, Fragment } from 'react';
import {
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Collapse
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const styles = {
  ListItemText: {
    paddingLeft: 10
  }
};

class SidebarItem extends Component {
  state = { isOpen: false };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    return (
      <Fragment>
        <MenuItem onClick={this.handleClick}>
          <ListItemText>{this.props.text}</ListItemText>
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </MenuItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button>
              <ListItemText
                style={styles.ListItemText}
                inset
                primary="Sub Category"
              />
            </ListItem>
          </List>
        </Collapse>
      </Fragment>
    );
  }
}

export default SidebarItem;
