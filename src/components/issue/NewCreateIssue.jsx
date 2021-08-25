import React, { Component } from "react";


class NewCreateIssue extends Component {
  state = {
    issue_name: "",
    issue_type: "",
    tolerance_type: "",
    score: 0
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onChangeNumber = e => {
    this.setState({
      [e.target.name]: parseInt(e.target.value)
    });
  };

  submitNewIssue = e => {
    e.preventDefault();
    const { issue_name, issue_type, tolerance_type, score } = this.state;
    const issue = {
      issue_name,
      issue_type_id: issue_type,
      tolerance_type_id: tolerance_type,
      score_id: score
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.handleCreateIssue(issue);
  };

  componentWillReceiveProps = () => {
    const { issue_name, issue_type, tolerance_type, score } = this.props;
    this.setState({
      issue_name,
      issue_type,
      tolerance_type,
      score
    });
  };

  render() {
    const { issue_name, issue_type, tolerance_type, score } = this.state;
    const { errors, issueType, toleranceType, scoreList } = this.props;
    const allIssueType =
      issueType.items instanceof Array
        ? issueType.items.map((issueType, index) => (
            <React.Fragment key={index}>
              <option value={issueType.id} style={{ fontStyle: "normal" }}>
                {issueType.issue_type_name}
              </option>
            </React.Fragment>
          ))
        : null;

    const allToleranceType =
      toleranceType instanceof Array
        ? toleranceType.map((toleranceType, index) => (
            <React.Fragment key={index}>
              <option value={toleranceType.id} style={{ fontStyle: "normal" }}>
                {toleranceType.name}
              </option>
            </React.Fragment>
          ))
        : null;

    const allscoreList =
      scoreList instanceof Array
        ? scoreList.map((scoreList, index) => (
            <React.Fragment key={index}>
              <option value={scoreList.id} style={{ fontStyle: "normal" }}>
                {scoreList.score_name}
              </option>
            </React.Fragment>
          ))
        : null;
    return (
      <div
        className="modal fade"
        id="createissue"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <form className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Issue
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick= {this.props.clearModalErrorAfterClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex flex-nowrap align-items-baseline">
                <label className="text-nowrap col-sm-3 pl-n15">Name:</label>
                <div className="form-group col-sm-5 pl-n15">
                  {/* ISSUE NAME */}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Issue Name"
                    name="issue_name"
                    onChange={this.onChange}
                    value={issue_name}
                    required
                    autoComplete="off"
                  />
                  {errors && (
                    <small className="form-text text-danger">
                      {errors.issue}
                    </small>
                  )}
                </div>
              </div>
              <div className="d-flex flex-nowrap align-items-baseline">
                <label className="text-nowrap col-sm-3 pl-n15">Select:</label>
                <div className="form-group col-sm-5 pl-n15">
                  {/* SELECT SCORE */}
                  <select
                    className="form-control"
                    value={score}
                    onChange={this.onChange}
                    name="score"
                  >
                    <option>Score</option>
                    {allscoreList}
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-end">
                <label className="text-nowrap col-sm-3 pl-n15">Select:</label>
                <div className="d-flex flex-nowrap justify-content-between col-sm-9 px-n15">
                  {/* ISSUE TYPE */}
                  <div className="form-group col-sm-6 pl-n15">
                  <select
                    className="form-control"
                    name="issue_type"
                    value={issue_type}
                    onChange={this.onChange}
                  >
                    <option>Issue_Type</option>
                    {allIssueType}
                  </select>
                  </div>
                {/* TOLERANCE TYPE */}
                <div className="form-group col-sm-6 px-n15">
                <select
                  className="form-control"
                  name="tolerance_type"
                  value={tolerance_type}
                  onChange={this.onChange}
                >
                  <option>Tolerance_Type</option>
                  {allToleranceType}
                </select>
                </div>
                </div>
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline-danger rounded-0"
                data-dismiss="modal"
                onClick= {this.props.clearModalErrorAfterClose}
              >
                CLOSE
              </button>
              <button
                type="button"
                className="btn btn-primary rounded-0"
                onClick={this.submitNewIssue}
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

export default NewCreateIssue;
