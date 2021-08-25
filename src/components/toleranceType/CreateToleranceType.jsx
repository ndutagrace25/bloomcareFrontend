import React, { Component } from "react";
import PropTypes from "prop-types";

import { InputFields, Button } from "../common";

class CreateToleranceType extends Component {
  state = {
    name: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitNewToleranceType = e => {
    e.preventDefault();
    const { name } = this.state;
    const toleranceType = {
      name
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.handleCreateToleranceType(toleranceType);
  };

  componentWillReceiveProps = () => {
    const { name } = this.props;
    this.setState({
      name
    });
  };

  render() {
    const { name } = this.state;
    const { errors } = this.props;

    return (
      <div data-test="CreateToleranceTypeComponent">
        <Button
          type="button"
          className="btn btn-sm btn-outline-default waves-effect ml-0"
          dataTarget="#addNewToleranceType"
          dataToggle="modal"
          value="Tolerance Type"
          otherProps={<i className="fas fa-plus mr-1" />}
        />
        <div
          className="modal fade"
          id="addNewToleranceType"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-notify modal-info" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Tolerance Type{" "}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form noValidate>
                <div className="modal-body">
                  <div className="container-fluid">
                    <InputFields
                      otherProps={
                        <span
                          className="input-group-addon"
                          style={{ marginRight: "3px" }}
                        >
                          <i className="fab fa-connectdevelop" />
                        </span>
                      }
                      type="text"
                      name="name"
                      onChange={this.onChange}
                      label="Tolerance Type Name"
                      placeholder="Tolerance Type Name"
                      value={name}
                      error={errors.name}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <Button
                    type="button"
                    className="btn btn-sm btn-outline-danger waves-effect ml-0"
                    dataDismiss="modal"
                    value="Close"
                  />

                  <Button
                    type="button"
                    onClick={this.submitNewToleranceType}
                    className="btn btn-sm btn-outline-default waves-effect mr-0"
                    value="Add Tolerance Type"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateToleranceType.propTypes = {
  handleCreateToleranceType: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default CreateToleranceType;
