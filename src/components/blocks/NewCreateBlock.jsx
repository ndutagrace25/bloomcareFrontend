import React, { Component } from "react";
import PropTypes from "prop-types";

class NewCreateBlock extends Component {
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
      <div
        className="modal fade"
        id="createblock"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <form className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Block
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
                <label className="col-sm-3 pl-n15">Block Name:</label>
                <div className="form-group col-sm-5 pl-n15">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Block Name"
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
              <div className="d-flex flex-nowrap align-items-baseline">
                <label className="col-sm-3 pl-n15">Block Number:</label>
                <div className="form-group col-sm-5 pl-n15">
                <input
                  className="form-control"
                  type="number"
                  placeholder="Block Number"
                  name="number"
                  onChange={this.onChange}
                  value={number}
                  autoComplete="off"
                />
                {errors && (
                  <small className="form-text text-danger">
                    {errors.number}
                  </small>
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

NewCreateBlock.propTypes = {
  handleCreateParentBlock: PropTypes.func.isRequired
};

export default NewCreateBlock;
