import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  btnContainer: {
    padding: '20px'
  },
  mainDiv: {
    marginTop: 30
  }
};

// clears sessions storage and logs a user out
const logout = () => sessionStorage.clear();

const SidebarContent = () => (
  <div style={styles.mainDiv}>
    <div style={styles.btnContainer}>
      <Link to="/dashboard">Profile</Link>
    </div>
    <div style={styles.btnContainer}>
      <Link to="/dashboard/create/customer">Create Customer</Link>
    </div>
    <div style={styles.btnContainer}>
      <Link to="/dashboard/delete/customer">Delete Customer</Link>
    </div>
    <div style={styles.btnContainer}>
      <Link to="/dashboard/suspend/customer">Suspend Customer</Link>
    </div>
    <div style={styles.btnContainer}>
      <Link to="/dashboard/create/admin">Create Admin</Link>
    </div>
    <div style={styles.btnContainer}>
      <Link to="/dashboard/delete/admin">Delete Admin</Link>
    </div>
    <div style={styles.btnContainer}>
      <Link to="/dashboard/suspend/admin">Suspend Admin</Link>
    </div>
    <div style={styles.btnContainer}>
      <Link to="/" className="waves-effect waves-light">
        Logout
      </Link>
    </div>
  </div>
);

export default SidebarContent;
