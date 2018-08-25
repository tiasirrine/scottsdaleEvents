import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

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

const SideNavContent = ({ user }) => {
  console.log(user);
  return (
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
        <Link style={styles.link} to="/dashboard/view/customers">
          View Customers
        </Link>
      </div>
      {user.superAdmin && (
        <Fragment>
          <div style={styles.btnContainer}>
            <Link style={styles.link} to="/dashboard/create/admin">
              Create Admin
            </Link>
          </div>
          <div style={styles.btnContainer}>
            <Link style={styles.link} to="/dashboard/view/admins">
              View Admins
            </Link>
          </div>
        </Fragment>
      )}
      <div style={styles.btnContainer}>
        <Link to="/" style={styles.link} onClick={logout} className="waves-effect waves-light">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default SideNavContent;
