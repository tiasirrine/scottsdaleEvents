import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const styles = {
  btnContainer: {
    padding: '20px'
  },
  mainDiv: {
    marginTop: 30
  },
  link: {
    color: 'white'
  }
};

// clears sessions storage and logs a user out
const logout = () => sessionStorage.clear();

const SidebarContent = () => (
  <div style={styles.mainDiv}>
    <div style={styles.btnContainer}>
      <Link style={styles.link} to="/dashboard">
        Profile
      </Link>
    </div>
    <div style={styles.btnContainer}>
      <Link style={styles.link} to="/dashboard/create/customer">
        Create Customer
      </Link>
    </div>
    <div style={styles.btnContainer}>
      <Link style={styles.link} to="/dashboard/delete/customer">
        Delete Customer
      </Link>
    </div>
    <div style={styles.btnContainer}>
      <Link style={styles.link} to="/dashboard/suspend/customer">
        Suspend Customer
      </Link>
    </div>
    <div style={styles.btnContainer}>
      <Link style={styles.link} to="/dashboard/create/admin">
        Create Admin
      </Link>
    </div>
    <div style={styles.btnContainer}>
      <Link style={styles.link} to="/dashboard/delete/admin">
        Delete Admin
      </Link>
    </div>
    <div style={styles.btnContainer}>
      <Link style={styles.link} to="/dashboard/suspend/admin">
        Suspend Admin
      </Link>
    </div>
    <div style={styles.btnContainer}>
      <Link
        to="/"
        style={styles.link}
        onClick={logout}
        className="waves-effect waves-light"
      >
        Logout
      </Link>
    </div>
  </div>
);

export default SidebarContent;
