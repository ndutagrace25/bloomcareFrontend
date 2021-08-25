import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { InputFields, Button } from "../common";

class EditBlock extends Component {
  state = {
    _id: 0,
    parent: "",
    name: "",
    errors: {}
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    const { _id, parent, name } = this.props;
    this.setState({
      _id,
      parent,
      name
    });
  }

  submitNewBlock = e => {
    e.preventDefault();
    const { _id, parent, name } = this.state;
    const block = {
      parent,
      name
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.updateBlock(_id, block);
  };

  render() {
    const { _id, parent, name } = this.state;
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
      <div data-test="EditBlockComponent">
        <Button
          type="button"
          className="btn btn-primary btn-sm"
          dataTarget={"#editBlock" + _id}
          dataToggle="modal"
          otherProps={
            <i
              className="fas fa-pen"
              data-toggle="tooltip"
              data-placement="top"
              title="Edit Block"
            />
          }
        />
        <div
          className="modal fade"
          id={"editBlock" + _id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-notify modal-info" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Block{" "}
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
                    {/* BLOCK NAME */}
                    <div className="form-group">
                      <span
                        className="input-group-addon"
                        style={{ marginRight: "3px" }}
                      >
                        <i className="fas fa-th-large" />
                      </span>
                      <label htmlFor="parent">Block Name</label>
                      <select
                        name="parent"
                        className={classnames("form-control", {
                          "is-invalid": errors && errors.name
                        })}
                        value={parent}
                        onChange={this.onChange}
                        style={{ fontSize: "14px" }}
                      >
                        <option value="">--Select Block--</option>
                        {allBlocks}
                      </select>

                      {errors && (
                        <div className="invalid-feedback">{errors.parent}</div>
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
                    value="Update Block"
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

EditBlock.propTypes = {
  updateBlock: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  parent: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.object,
  parentBlockList: PropTypes.array.isRequired
};

export default EditBlock;
