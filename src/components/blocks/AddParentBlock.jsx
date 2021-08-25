import React, { Component } from "react";
import PropTypes from "prop-types";

import { InputFields, Button } from "../common";

class AddParentBlock extends Component {
  state = {
    name: "",
    number: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitNewBlock = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const block = {
      name,
      number
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.handleCreateParentBlock(block);
  };

  componentWillReceiveProps = () => {
    const { name, number } = this.props;
    this.setState({
      name,
      number
    });
  };

  render() {
    const { name, number } = this.state;
    const { errors } = this.props;

    return (
      <React.Fragment>
        <Button
          type="button"
          className="btn btn-sm btn-outline-default waves-effect ml-0"
          dataTarget="#addBlock"
          dataToggle="modal"
          value="Block"
          otherProps={<i className="fas fa-plus mr-1" />}
        />
        <div
          className="modal fade"
          id="addBlock"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-notify modal-info" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Block{" "}
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
                          <i className="fas fa-th-large" />
                        </span>
                      }
                      type="text"
                      name="name"
                      onChange={this.onChange}
                      label="Block Name"
                      placeholder="Block Name"
                      value={name}
                      error={errors.name}
                    />
                    {/* BLOCK NUMBER */}
                    <InputFields
                      otherProps={
                        <span
                          className="input-group-addon"
                          style={{ marginRight: "3px" }}
                        >
                          <i className="fas fa-th-large" />
                        </span>
                      }
                      type="text"
                      name="number"
                      onChange={this.onChange}
                      label="Block Number"
                      placeholder="Block Number"
                      value={number}
                      error={errors.number}
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
                    onClick={this.submitNewBlock}
                    className="btn btn-sm btn-outline-default waves-effect mr-0"
                    value="Add Block"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

AddParentBlock.propTypes = {
  handleCreateParentBlock: PropTypes.func.isRequired
};

export default AddParentBlock;
