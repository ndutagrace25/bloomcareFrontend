import React, { Component } from "react";
import PropTypes from "prop-types";

class NewEditBlock extends Component {
  state = { _id: 0, parent: "", name: "", errors: {} };
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
      <React.Fragment>
        <div
          className="modal fade"
          id={"editblockselected" + _id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <form className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Block(s)
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
                <div className="d-flex justify-content-between align-items-end mb-4">
                  <label className="col-sm-2 pl-n15">Name:</label>
                  <div className="d-flex justify-content-between col-sm-10 px-n15">
                    {/* SELECT BLOCK */}
                    <select
                      className="form-control col-sm-4"
                      name="parent"
                      value={parent}
                      onChange={this.onChange}
                    >
                      <option>Block</option>
                      {allBlocks}
                    </select>
                  </div>
                  {errors && (
                    <small className="form-text text-danger">
                      {errors.parent}
                    </small>
                  )}
                </div>
                <div className="d-flex justify-content-between align-items-end mb-4">
                  <label className="col-sm-2 pl-n15">Sub Block:</label>
                  <div className="d-flex justify-content-between col-sm-10 px-n15">
                    <input
                      className="form-control col-sm-5"
                      type="text"
                      placeholder="Sub Block"
                      name="name"
                      onChange={this.onChange}
                      value={name}
                      autoComplete="off"
                    />
                  </div>
                  {errors && (
                    <small className="form-text text-danger">
                      {errors.number}
                    </small>
                  )}
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
                  UPDATE
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

NewEditBlock.propTypes = {
  updateBlock: PropTypes.func.isRequired,
  _id: PropTypes.number.isRequired,
  parent: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.object,
  parentBlockList: PropTypes.array.isRequired
};

export default NewEditBlock;
