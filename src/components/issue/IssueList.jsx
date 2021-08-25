import React, { Component } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import { Table, Button } from "../common";
import EditIssue from "./EditIssue";

class IssueList extends Component {
  sweetAlert = id => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete issue!"
    }).then(result => {
      if (result.value) {
        this.props.deleteIssue(id);
        Swal.fire("Deleted!", "Issue has been deleted.", "success");
      }
    });
  };
  render() {
    const { issue, errors } = this.props;

    let { issueCount, issueType, toleranceType, scoreList } = this.props;
    let allissue;

    if (errors.length > 0) {
      JSON.stringify(Swal.fire({ type: "error", title: "Oops! " + errors }));
    }

    if (typeof issue !== "undefined") {
      allissue =
        issue instanceof Array
          ? issue.map(issue => (
              <tr key={issue._id}>
                <td style={{ width: "10px" }}>{issueCount++}</td>
                <td>{issue.issue_name}</td>
                <td>{issue.issue_type && issue.issue_type.name}</td>
                <td>{issue.tolerance_type && issue.tolerance_type.name}</td>
                <td>{issue.score && issue.score.name}</td>
                <td className="d-flex flex-nowrap">
                  <EditIssue
                    updateIssue={this.props.updateIssue}
                    key={issue._id}
                    _id={issue._id}
                    issueType={issueType}
                    toleranceType={toleranceType}
                    scoreList={scoreList}
                    issue_name={issue.issue_name}
                    errors={errors}
                    issue_type={issue.issue_type && issue.issue_type._id}
                    score={issue.score && issue.score._id}
                    tolerance_type={
                      issue.tolerance_type && issue.tolerance_type._id
                    }
                    handlePreloaderStyle={this.props.handlePreloaderStyle}
                    successMessage={this.props.successMessage}
                  />
                  <Button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      this.sweetAlert(issue._id);
                    }}
                    otherProps={
                      <i
                        className="fa fa-trash"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Delete Issue"
                      />
                    }
                  />
                </td>
              </tr>
            ))
          : null;
    }

    return (
      <Table
        data-test="IssueListComponent"
        tableHead={
          <tr>
            <th>#</th>
            <th>Issue Name</th>
            <th>Issue Type Name</th>
            <th>Tolerance Type</th>
            <th>Score</th>
            <th>Actions</th>
          </tr>
        }
        tableBody={allissue}
      />
    );
  }
}

IssueList.propTypes = {
  updateIssue: PropTypes.func.isRequired,
  handlePreloaderStyle: PropTypes.func.isRequired,
  deleteIssue: PropTypes.func.isRequired,
  issue: PropTypes.array,
  issueCount: PropTypes.number.isRequired,
  issueType: PropTypes.array.isRequired,
  toleranceType: PropTypes.array.isRequired,
  scoreList: PropTypes.array.isRequired,
  successMessage: PropTypes.string.isRequired,
  errors: PropTypes.object
};

export default IssueList;
