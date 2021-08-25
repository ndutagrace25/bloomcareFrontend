import React, { Component } from "react";
import PropTypes from "prop-types";
// import Swal from "sweetalert2";

import { NewTable } from "../common";
// import { NewEditIssueType } from ".";

class NewIssueTypeList extends Component {
  // sweetAlert = id => {
  //   Swal.fire({
  //     title: "Are you sure you want to delete?",
  //     text: "You won't be able to revert this!",
  //     type: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete issue type!"
  //   }).then(result => {
  //     if (result.value) {
  //       this.props.deleteIssueType(id);
  //       Swal.fire("Deleted!", "Issue type has been deleted.", "success");
  //     }
  //   });
  // };


  render() {
    const { issueType, errors } = this.props;

    let { issueTypeCount } = this.props;
    let allissueType;

    if (typeof issueType.items !== "undefined") {
      allissueType =
        issueType.items instanceof Array
          ? issueType.items.map(issueType => (
              <tr key={issueType.id}>
                <td style={{ width: "10px" }}>{issueTypeCount++}</td>
                <td>{issueType.issue_type_name}</td>
                {/* UPDATE AND DELETE ARE INACTIVE AT THE MOMENT */}
                {/* <td className="d-flex flex-nowrap">
                  <NewButton
                    className="btn btn-primary rounded-0 d-flex btn-sm mr-2"
                    dataToggle="modal"
                    dataTarget={"#editissuetypeselected" + issueType.id}
                    otherProperties={
                      <img
                        src={require("../../assets/img/edit-icon.svg")}
                        height="16"
                        alt="del_issue_type"
                      />
                    }
                  />
                  <NewEditIssueType
                    updateIssueType={this.props.updateIssueType}
                    key={issueType.id}
                    _id={issueType.id}
                    name={issueType.issue_type_name}
                    errors={errors}
                    handlePreloaderStyle={this.props.handlePreloaderStyle}
                    successMessage={this.props.successMessage}
                  />
                  <NewButton
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      this.sweetAlert(issueType.id);
                    }}
                    otherProperties={
                      <img
                        src={require("../../assets/img/delete-icon.svg")}
                        height="16"
                        alt="del_issue_type"
                      />
                    }
                  />
                </td> */}
              </tr>
            ))
          : null;
    }

    return (
      <NewTable
        tableHead={
          <tr>
            <th scope="col">#</th>
            <th scope="col">IssueType Name</th>
            {/* <th scope="col" className="w-100p">Actions</th> */}
          </tr>
        }
        tableBody={allissueType}
      />
    );
  }
}

NewIssueTypeList.propTypes = {
  updateIssueType: PropTypes.func.isRequired,
  handlePreloaderStyle: PropTypes.func.isRequired,
  deleteIssueType: PropTypes.func.isRequired,
  issueType: PropTypes.object.isRequired,
  errors: PropTypes.object,
  issueTypeCount: PropTypes.number
};

export default NewIssueTypeList;
