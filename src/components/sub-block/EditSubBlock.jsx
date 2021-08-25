import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { InputFields, Button } from "../common";

class EditSubBlock extends Component {
  state = {
    _id: 0,
    name: "",
    block: "",
    errors: {}
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    const { _id, name, block } = this.props;
    this.setState({
      _id,
      name,     
      block
    });
  }

  submitNewSubBlock = e => {
    e.preventDefault();
    const { _id, name, block } = this.state;
    const subBlock = {
      name,     
      block
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.updateSubBlock(_id, subBlock);
  };

  render() {
    const { _id, name, block } = this.state;
    const { errors, blockList } = this.props;
    const allBlocks = blockList.map(blockList => (
      <React.Fragment key={blockList._id}>
        <option value={blockList._id}>{blockList.block_name}</option>
      </React.Fragment>
    ));
    return (
      <React.Fragment>
        <Button
          type="button"
          className="btn btn-info btn-sm"
          dataTarget={"#editSubBlock" + _id}
          dataToggle="modal"
          otherProps={
            <i
              className="fa fa-pen"
              data-toggle="tooltip"
              data-placement="top"
              title="Edit Sub-Block"
            />
          }
        />
        <div
          className="modal fade"
          id={"editSubBlock" + _id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-notify modal-info" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Sub-Block{" "}
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
                      {/* SUB-BLOCK NAME */}
                    <InputFields
                      otherProps={
                        <span
                          className="input-group-addon"
                          style={{ marginRight: "3px" }}
                        >
                          <i className="fas fa-stop" />
                        </span>
                      }
                      type="text"
                      name="name"
                      onChange={this.onChange}
                      label="Sub-Block Name"
                      placeholder="Sub-Block Name"
                      value={name}
                      error={errors.name}
                    />
                     {/*SELECT BLOCK  */}
                    <div className="form-group">
                      <span
                        className="input-group-addon"
                        style={{ marginRight: "3px" }}
                      >
                        <i className="fas fa-th-large" />
                      </span>
                      <label htmlFor="block">Block Name</label>
                      <select
                        name="block"
                        className={classnames("form-control", {
                          "is-invalid": errors.block
                        })}
                        value={block}
                        onChange={this.onChange}
                        style={{ fontSize: "14px" }}
                      >
                        <option value="">--Select Block--</option>
                        {allBlocks}
                      </select>

                      {errors && (
                        <div className="invalid-feedback">
                          {errors.block}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <Button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    dataDismiss="modal"
                    value="Close"
                  />

                  <Button
                    type="button"
                    onClick={this.submitNewSubBlock}
                    className="btn btn-success btn-sm"
                    // dataDismiss="modal"
                    value="Update Sub-Block"
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

EditSubBlock.propTypes = {
  updateSubBlock: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default EditSubBlock;
