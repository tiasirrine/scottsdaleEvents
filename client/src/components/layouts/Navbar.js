import React from 'react';
import { AppBar, Tab, Tabs, Typography, Toolbar } from '@material-ui/core';


class Navbar extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { value } = this.state;
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="headline" color="inherit">
            Scottsdale Events
          </Typography>
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="hey">Hello</Tab>
            <Tab label="Hi">Hi</Tab>
            <Tab label="Hello">Hey</Tab>
          </Tabs>
        </Toolbar>
      </AppBar>
    );
  }
}


export default Navbar;
