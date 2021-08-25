import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { InputFields, Button } from "../common";

class CreateBlock extends Component {
  state = {
    parent: "",
    name: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitNewBlock = e => {
    e.preventDefault();
    const { parent, name } = this.state;
    const block = {
      parent,
      name
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.handleCreateBlock(block);
  };

  componentWillReceiveProps = () => {
    const { parent, name } = this.props;
    this.setState({
      parent,
      name
    });
  };

  render() {
    const { parent, name } = this.state;
    const { errors, parentBlockList } = this.props;
    const allBlocks =
      parentBlockList instanceof Array
        ? parentBlockList.map(parentBlockList => (
            <React.Fragment key={parentBlockList._id}>
              <option
                value={parentBlockList._id}
                style={{ fontStyle: "normal" }}
              >
                {parentBlockList.name}
              </option>
            </React.Fragment>
          ))
        : null;

    return (
      <div data-test="CreateBlockComponent">
        <Button
          type="button"
          className="btn btn-sm btn-outline-default waves-effect"
          dataTarget="#addNewBlock"
          dataToggle="modal"
          value="Sub-Block"
          otherProps={<i className="fas fa-plus mr-1" />}
        />
        <div
          className="modal fade"
          id="addNewBlock"
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
                    <div className="form-group">
                      <span
                        className="input-group-addon"
                        style={{ marginRight: "3px" }}
                      >
                        <i className="fas fa-th-large" />
                      </span>
                      <label htmlFor="block">Block Name</label>
                      <select
                        name="parent"
                        className={classnames(
                          "form-control selectPlaceholder",
                          {
                            "is-invalid": errors && errors.parent
                          }
                        )}
                        value={parent}
                        onChange={this.onChange}
                        style={{ fontSize: "14px" }}
                      >
                        <option value="">--Select Block--</option>
                        {allBlocks}
                      </select>

                      {errors && (
                        <div className="invalid-feedback">
                          {errors && errors.parent}
                        </div>
                      )}
                    </div>
                    <InputFields
                      otherProps={
                        <span
                          className="input-group-addon"
                          style={{ marginRight: "3px" }}
                        >
                          <i className="fas fa-list-ol" />
                        </span>
                      }
                      type="text"
                      name="name"
                      value={name}
                      onChange={this.onChange}
                      label="Sub-Block"
                      placeholder="Sub-Block"
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
                    onClick={this.submitNewBlock}
                    className="btn btn-sm btn-outline-default waves-effect mr-0"
                    // dataDismiss="modal"
                    value="Add Block"
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

CreateBlock.propTypes = {
  handleCreateBlock: PropTypes.func.isRequired,
  errors: PropTypes.object,
  parentBlockList: PropTypes.array.isRequired
};

export default CreateBlock;
