import React, { Component } from "react";
import PropTypes from "prop-types";

import { InputFields, Button } from "../common";

class EditPoint extends Component {
  state = {
    _id: 0,
    name: "",
    errors: {}
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    const { _id, name } = this.props;
    this.setState({
      _id,
      name
    });
  }

  submitNewPoint = e => {
    e.preventDefault();
    const { _id, name } = this.state;
    const point = {
      name
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.updatePoint(_id, point);
  };

  render() {
    const { _id, name } = this.state;
    const { errors } = this.props;
    return (
      <div data-test="EditPointComponent">
        <Button
          className="btn btn-primary btn-sm"
          dataTarget={"#editPoint" + _id}
          dataToggle="modal"
          otherProps={
            <i
              className="fas fa-pen"
              data-toggle="tooltip"
              data-placement="top"
              title="Edit Point"
            />
          }
        />
        <div
          className="modal fade"
          id={"editPoint" + _id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-notify modal-info" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Point{" "}
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
                    value="Update Point"
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

EditPoint.propTypes = {
  updatePoint: PropTypes.func,
  _id: PropTypes.string,
  name: PropTypes.string,
  errors: PropTypes.object
};

export default EditPoint;
