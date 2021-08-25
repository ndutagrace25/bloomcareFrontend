import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logoutPersonnel } from "../../actions/authActions";

class NewNavBar extends Component {
  state = {};

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutPersonnel();
    window.location.href = "/admin";
  };
  render() {
    const { label } = this.props;
    return (
      <nav className="navbar bg-purple shadow-sm">
        <Link className="navbar-brand position-absolute" to="/dashboard">
          <img
            src={require("../../assets/img/bloomcare-white.png")}
            height="30"
            alt=""
          />
        </Link>
        <span className="font-weight-bold text-white mx-auto">{label}</span>
        <div className="dropdown upfront">
          <img
            className="dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            src={require("../../assets/img/menu-icon.svg")}
            height="30"
            alt=""
          />
          <div
            className="dropdown-menu dropdown-menu-right pb-0"
            aria-labelledby="dropdownMenuButton"
          >
            <Link className="dropdown-item" to="/dashboard">
              Dashboard
            </Link>
            <Link className="dropdown-item" to="/farmView">
              Farm
            </Link>
            {/* <Link className="dropdown-item" to="/varietyReport">
              Varieties
            </Link> */}
            <Link className="dropdown-item" to="scoutingReport">
              Scouting
            </Link>
            <Link className="dropdown-item" to="/tracking">
              Tracking
            </Link>
            <Link className="dropdown-item" to="/timeReport">
              Time Report
            </Link>
            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" to="/configurations">
              Configurations
            </Link>
            <Link className="dropdown-item" to="" onClick={this.onLogoutClick}>
              Log Out
            </Link>
            <h6
              className="dropdown-item mb-0 mt-1 text-white bg-secondary"
              href="#"
            >
              Version 2.0.0
            </h6>
          </div>
        </div>
      </nav>
    );
  }
}

NewNavBar.propTypes = {
  logoutPersonnel: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutPersonnel })(NewNavBar);
