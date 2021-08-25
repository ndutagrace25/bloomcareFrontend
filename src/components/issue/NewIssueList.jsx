import React, { Component } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { NewTable, NewButton } from "../common";

import { NewEditIssue } from ".";

class NewIssueList extends Component {
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
          ? issue.map((issue, index) => (
              <tr key={index}>
                <td style={{ width: "10px" }}>{issueCount++}</td>
                <td>{issue.issue_name}</td>
                <td>{issue.issue_type_name && issue.issue_type_name}</td>
                <td>
                  {issue.tolerance_type_name && issue.tolerance_type_name}
                </td>
                <td>{issue.score_name && issue.score_name}</td>
                <td className="d-flex flex-nowrap">
                  <NewButton
                    className="btn btn-primary rounded-0 d-flex btn-sm mr-2"
                    dataToggle="modal"
                    dataTarget={"#editissueselected" + issue.id}
                    otherProperties={
                      <img
                        src={require("../../assets/img/edit-icon.svg")}
                        height="16"
                        alt="del_station"
                      />
                    }
                  />
                  <NewEditIssue
                    updateIssue={this.props.updateIssue}
                    key={issue.id}
                    _id={issue.id}
                    issueType={issueType}
                    toleranceType={toleranceType}
                    scoreList={scoreList}
                    issue_name={issue.issue_name}
                    errors={errors}
                    issue_type={issue.issue_type_id}
                    score={issue.score_id}
                    tolerance_type={issue.tolerance_type_id}
                    handlePreloaderStyle={this.props.handlePreloaderStyle}
                    successMessage={this.props.successMessage}
                  />
                  <NewButton
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      this.sweetAlert(issue.id);
                    }}
                    otherProperties={
                      <img
                        src={require("../../assets/img/delete-icon.svg")}
                        height="16"
                        alt="del_issue"
                      />
                    }
                  />
                </td>
              </tr>
            ))
          : null;
    }

    return (
      <NewTable
        data-test="IssueListComponent"
        tableHead={
          <tr>
            <th>#</th>
            <th>Issue Name</th>
            <th>Issue Type Name</th>
            <th>Tolerance Type</th>
            <th>Score</th>
            <th className="w-100p">Actions</th>
          </tr>
        }
        tableBody={allissue}
      />
    );
  }
}

NewIssueList.propTypes = {
  updateIssue: PropTypes.func.isRequired,
  handlePreloaderStyle: PropTypes.func.isRequired,
  deleteIssue: PropTypes.func.isRequired,
  issue: PropTypes.array,
  issueCount: PropTypes.number.isRequired,
  // issueType: PropTypes.array.isRequired,
  // toleranceType: PropTypes.array.isRequired,
  scoreList: PropTypes.array.isRequired,
  successMessage: PropTypes.string.isRequired,
  errors: PropTypes.object
};

export default NewIssueList;
