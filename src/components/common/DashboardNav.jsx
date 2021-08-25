import React from "react";
import setAuthToken from "../../utilities/setAuthToken";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Menu from '../../components/dashboard/Menu';

const DashboardNav = ({ reportTitle, otherProps }) => {
  const onLogoutClick = e => {
    e.preventDefault();
    //remove token from local storage
    localStorage.removeItem("jwtToken");
    //remove auth header for future request
    setAuthToken(false);
    window.location.href = "/admin";
  };
  return (
    <div className="header py-2" data-test="DashboardNavComponent">
      <div className="container-fluid d-flex justify-content-between">
        {otherProps}
        <h1>{reportTitle}</h1>
        <Menu/>
        <div className="dropdown">
          <button
            className="btn dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-bars" />
          </button>
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenuButton"
          >
            <h6 className="dropdown-header">Settings</h6>

            <Link className="dropdown-item" to="/personnel">
              Personnel
            </Link>
            <Link className="dropdown-item" to="/scouting">
              Scouting
            </Link>
            <div className="dropdown-divider" />
            <Link className="dropdown-item" to="/personnel">
              Configurations
            </Link>
            <Link className="dropdown-item" to="" onClick={onLogoutClick}>
              Log Out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

DashboardNav.propTypes = {
  reportTitle: PropTypes.string,
};

export default DashboardNav;
