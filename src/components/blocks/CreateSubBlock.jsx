import React, { Component } from "react";
import PropTypes from "prop-types";

class CreateSubBlock extends Component {
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
            <React.Fragment key={parentBlockList.id}>
              <option
                value={parentBlockList.id}
                style={{ fontStyle: "normal" }}
              >
                {parentBlockList.block_name}
              </option>
            </React.Fragment>
          ))
        : null;

    return (
      <div
        className="modal fade"
        id="createsubblock"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <form className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Sub Block
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.props.clearModalErrorAfterClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex flex-nowrap align-items-baseline">
                <label className="col-sm-3 pl-n15">Select Block:</label>
                <div className="form-group col-sm-5 pl-n15">
                   {/* SELECT BLOCK */}
                <select
                  className="form-control"
                  name="parent"
                  value={parent}
                  onChange={this.onChange}
                >
                  <option>--Select Block--</option>
                  {allBlocks}
                </select>
                {errors && (
                  <small className="form-text text-danger">
                    {errors.parent}
                  </small>
                )}
                </div>
               
               
              </div>
              <div className="d-flex flex-nowrap align-items-baseline">
                <label className="col-sm-3 pl-n15">Sub Block Name:</label>
                <div className="form-group col-sm-5 pl-n15">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Sub Block Name"
                  name="name"
                  onChange={this.onChange}
                  value={name}
                  autoComplete="off"

                />
                {errors && (
                  <small className="form-text text-danger">{errors.name}</small>
                )}
                </div>
                
              </div>
            </div>

            <div className="modal-footer d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline-danger rounded-0"
                data-dismiss="modal"
              >
                CLOSE
              </button>
              <button
                type="button"
                className="btn btn-primary rounded-0"
                onClick={this.submitNewBlock}
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

CreateSubBlock.propTypes = {
  handleCreateBlock: PropTypes.func.isRequired,
  errors: PropTypes.object,
  parentBlockList: PropTypes.array.isRequired
};

export default CreateSubBlock;
