import React, { Component } from "react";
import PropTypes from "prop-types";

import { InputFields, Button } from "../common";

class CreateEntry extends Component {
  state = {
    name: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitNewEntry = e => {
    e.preventDefault();
    const { name } = this.state;
    const entry = {
      name
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.handleCreateEntry(entry);
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
    // console.log(errors);
    return (
      <div data-test="CreateEntryComponent">
        <Button
          type="button"
          className="btn btn-sm btn-outline-default waves-effect ml-0"
          dataTarget="#addNewEntry"
          dataToggle="modal"
          value="Entry"
          otherProps={<i className="fas fa-plus mr-1" />}
        />
        <div
          className="modal fade"
          id="addNewEntry"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-notify modal-info" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Entry{" "}
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
                      error={errors ? errors.name : ""}
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
                    value="Add Entry"
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

CreateEntry.propTypes = {
  handleCreateEntry: PropTypes.func,
  errors: PropTypes.object
};

export default CreateEntry;
