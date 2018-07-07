import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const Navbar = props => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="headline" color="inherit">
        Exercise Database
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Navbar;
