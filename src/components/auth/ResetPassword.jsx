import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { resetPersonnelPassword } from "../../actions/authActions";
import { InputFields } from "../common";

// import {LoginTextFieldGroup} from "../common";

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      phone: "",
      password: "",
      confirmPassword: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.reset) {
      this.props.history.push("/admin");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ errors: { password: "Passwords do not match" } });
    } else {
      const personnel = {
        phone: this.state.phone,
        password: this.state.password
      };

      this.props.resetPersonnelPassword(personnel, this.props.history);
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="login-page d-flex justify-content-center align-items-center">
        <form
          className="col-xm-6 bg-white shadow d-flex flex-column rounded p-4 m-4"
          onSubmit={this.onSubmit}
        >
          <img
            src={require("../../assets/img/product-logo.png")}
            className="img-fluid mb-4"
            alt=""
          />
          <InputFields
            label="Enter Phone Number"
            name="phone"
            value={this.state.phone}
            onChange={this.onChange}
            id="phone"
            type="text"
            error={errors.phone}
          />
          <InputFields
            label="Enter Password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            id="password"
            type="password"
            error={errors.password}
          />
          <InputFields
            label="Confirm Password"
            name="confirmPassword"
            value={this.state.confirmPassword}
            onChange={this.onChange}
            id="password"
            type="password"
            error={errors.password}
          />

          <div className="d-flex justify-content-between align-items-center">
            <Link to="/admin" className="text-decoration-none">
              Login
            </Link>
            <button type="submit" className="btn btn-primary rounded-0">
              RESET PASSWORD
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  resetPersonnelPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
  //   errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(mapStateToProps, { resetPersonnelPassword })(
  withRouter(ResetPassword)
);
