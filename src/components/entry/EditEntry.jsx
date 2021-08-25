import React, { Component } from "react";
import PropTypes from "prop-types";

import { InputFields, Button } from "../common";

class EditEntry extends Component {
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

  submitNewEntry = e => {
    e.preventDefault();
    const { _id, name } = this.state;
    const entry = {
      name
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.updateEntry(_id, entry);
  };

  render() {
    const { _id, name } = this.state;
    const { errors } = this.props;
    return (
      <div data-test="EditEntryComponent">
        <Button
          type="button"
          className="btn btn-primary btn-sm"
          dataTarget={"#editEntry" + _id}
          dataToggle="modal"
          otherProps={
            <i
              className="fas fa-pen"
              data-toggle="tooltip"
              data-placement="top"
              title="Edit Entry"
            />
          }
        />
        <div
          className="modal fade"
          id={"editEntry" + _id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-notify modal-info" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Entry
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
                    {/* ENTRY NAME */}
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
                      label="Entry Name"
                      placeholder="Entry Name"
                      value={name}
                      error={errors && errors.name}
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
                    onClick={this.submitNewEntry}
                    className="btn btn-sm btn-outline-default waves-effect mr-0"
                    value="Update Entry"
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

EditEntry.propTypes = {
  updateEntry: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
  //   errors: PropTypes.object
};

export default EditEntry;
