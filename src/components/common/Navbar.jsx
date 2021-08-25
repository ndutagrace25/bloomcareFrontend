import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { logoutPersonnel } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutPersonnel();
    window.location.href = "/admin";
  };

  render() {
    const { personnel } = this.props.auth;
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark primary-color"
        data-test="NavBarComponent"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="">
            <img
              // src={require("../../assets/img/logo-white.png")}
              alt="Bloomcare"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent-333"
            aria-controls="navbarSupportedContent-333"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent-333"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to=""
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Reporting
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link
                    className="dropdown-item"
                    to="/dashboard"
                    // target="_blank"
                  >
                    Dashboard
                  </Link>
                  <Link className="dropdown-item" to="/personnel">
                    Personnel
                  </Link>
                  <Link className="dropdown-item" to="/scouting">
                    Scouting
                  </Link>
                  <Link className="dropdown-item" to="/timeReport">
                    Time Report
                  </Link>
                  <Link className="dropdown-item" to="/tracking">
                    Tracking
                  </Link>
                </div>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to=""
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Configurations
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="blocks">
                    Blocks
                  </Link>
                  <Link className="dropdown-item" to="beds">
                    Beds
                  </Link>
                  <Link className="dropdown-item" to="entry">
                    Entry
                  </Link>
                  <Link className="dropdown-item" to="point">
                    Point
                  </Link>
                  <Link className="dropdown-item" to="variety">
                    Variety
                  </Link>
                  <Link className="dropdown-item" to="tolerance-type">
                    Tolerance Type
                  </Link>
                  <Link className="dropdown-item" to="tolerance">
                    Tolerance
                  </Link>
                  <Link className="dropdown-item" to="issue-type">
                    Issue Type
                  </Link>
                  <Link className="dropdown-item" to="issue">
                    Issue
                  </Link>
                  <Link className="dropdown-item" to="issue-category">
                    Issue Category
                  </Link>

                  {/* <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">
                  Configs another
                </a> */}
                </div>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink-333"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  to=""
                >
                  <i className="fas fa-user" />
                  {personnel.first_name}
                </Link>
                <div
                  className="dropdown-menu dropdown-menu-right dropdown-default"
                  aria-labelledby="navbarDropdownMenuLink-333"
                >
                  <Link className="dropdown-item" to="/resetPassword">
                    Reset password
                  </Link>
                  <div className="dropdown-divider" />
                  <Link
                    className="dropdown-item"
                    to=""
                    onClick={this.onLogoutClick}
                  >
                    Log Out
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutPersonnel: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutPersonnel }
)(Navbar);
