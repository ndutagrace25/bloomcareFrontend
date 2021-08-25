import React, { Component } from "react";
import PropTypes from "prop-types";

import { InputFields, Button } from "../common";

class CreatePoint extends Component {
  state = {
    name: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitNewPoint = e => {
    e.preventDefault();
    const { name } = this.state;
    const point = {
      name
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.handleCreatePoint(point);
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
      <div data-test="CreatePointComponent">
        <Button
          type="button"
          className="btn btn-sm btn-outline-default waves-effect ml-0"
          dataTarget="#addNewPoint"
          dataToggle="modal"
          value="Point"
          otherProps={<i className="fas fa-plus mr-1" />}
        />
        <div
          className="modal fade"
          id="addNewPoint"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-notify modal-info" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Point{" "}
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
                    {/* POINT NAME */}
                    <InputFields
                      otherProps={
                        <span
                          className="input-group-addon"
                          style={{ marginRight: "3px" }}
                        >
                          <i className="fas fa-fan" />
                        </span>
                      }
                      type="text"
                      name="name"
                      onChange={this.onChange}
                      label="Point Name"
                      placeholder="Point Name"
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
                    onClick={this.submitNewPoint}
                    className="btn btn-sm btn-outline-default waves-effect mr-0"
                    value="Add Point"
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

CreatePoint.propTypes = {
  handleCreatePoint: PropTypes.func.isRequired,
  errors: PropTypes.object,
  name: PropTypes.string
};

export default CreatePoint;
