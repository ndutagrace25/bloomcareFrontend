import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import { loginPersonnel } from "../../actions/authActions";

import { Preloader, InputFields } from "../common";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      phone: "",
      password: "",
      errors: {},
      preloaderStyle: "d-none"
    };
  }

  handlePreloaderStyle = newStyle => {
    this.setState({ preloaderStyle: newStyle });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.redirectUser(this.props.auth.personnel.personne_type_id);
    }

    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    this.handlePreloaderStyle("d-none");
    if (nextProps.auth.isAuthenticated) {
      this.redirectUser(nextProps.auth.personnel.personne_type_id);
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  redirectUser = () => {
    this.props.history.push("/dashboard");
  };

  onSubmit = e => {
    e.preventDefault();
    this.handlePreloaderStyle("d-block");
    const personnel = {
      phone: this.state.phone,
      password: this.state.password
    };

    this.props.loginPersonnel(personnel, this.props.history);
  };
  render() {
    const { errors, preloaderStyle } = this.state;
    console.log(errors);
    return (
      <React.Fragment>
        <Preloader preloaderStyle={preloaderStyle} />
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
            {errors.server && <h6 className="text-danger text-center mb-4">{errors.server}</h6>}
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

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/resetPassword" className="text-decoration-none">
                Reset Password
              </Link>
              <button type="submit" className="btn btn-primary rounded-0">
                LOG IN
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  loginPersonnel: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};
export default connect(mapStateToProps, { loginPersonnel })(withRouter(Login));
