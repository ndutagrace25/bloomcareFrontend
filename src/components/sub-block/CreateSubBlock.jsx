import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { InputFields, Button } from "../common";

class CreateSubBlock extends Component {
  state = {
    name: "",
    block: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitNewSubBlock = e => {
    e.preventDefault();
    const { name, block } = this.state;
    const subBlock = {
      name,
      block
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.handleCreateSubBlock(subBlock);
  };

  componentWillReceiveProps = () => {
    const { name, block } = this.props;
    this.setState({
      name,
      block
    });
  };

  render() {
    const { name, block } = this.state;
    const { errors, blockList } = this.props;

    const allBlocks = blockList.map(blockList => (
      <React.Fragment key={blockList._id}>
        <option value={blockList._id} style={{ fontStyle: "normal" }}>
          {blockList.block_name}
        </option>
      </React.Fragment>
    ));

    return (
      <React.Fragment>
        <Button
          type="button"
          className="btn btn-primary btn-sm"
          dataTarget="#addNewSubBlock"
          dataToggle="modal"
          value="Add Sub-Block"
        />
        <div
          className="modal fade"
          id="addNewSubBlock"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-notify modal-info" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Sub-Block{" "}
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
                    {/* SELECT BLOCK */}
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
                        className={classnames(
                          "form-control selectPlaceholder",
                          {
                            "is-invalid": errors.block
                          }
                        )}
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
                    value="Add Sub-Block"
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

CreateSubBlock.propTypes = {
  handleCreateSubBlock: PropTypes.func.isRequired,
  blockList: PropTypes.array.isRequired
};

export default CreateSubBlock;
