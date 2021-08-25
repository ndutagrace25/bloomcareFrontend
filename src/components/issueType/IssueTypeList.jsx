import React, { Component } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import { Table, Button } from "../common";
// import EditIssueType from "./EditIssueType";

class IssueTypeList extends Component {
  sweetAlert = id => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete issue type!"
    }).then(result => {
      if (result.value) {
        this.props.deleteIssueType(id);
        Swal.fire("Deleted!", "Issue type has been deleted.", "success");
      }
    });
  };
  render() {
    const { issueType, errors } = this.props;

    let { issueTypeCount } = this.props;
    let allissueType;

    if (typeof issueType.items !== "undefined") {
      allissueType =
        issueType.items instanceof Array
          ? issueType.items.map(issueType => (
              <tr key={issueType._id}>
                <td style={{ width: "10px" }}>{issueTypeCount++}</td>
                <td>{issueType.name}</td>
                {/* UPDATE AND DELETE ARE INACTIVE AT THE MOMENT */}
                {/* <td className="d-flex flex-nowrap">
                  <EditIssueType
                    updateIssueType={this.props.updateIssueType}
                    key={issueType._id}
                    _id={issueType._id}
                    name={issueType.name}
                    errors={errors}
                    handlePreloaderStyle={this.props.handlePreloaderStyle}
                    successMessage={this.props.successMessage}
                  />
                  <Button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      this.sweetAlert(issueType._id);
                    }}
                    otherProps={
                      <i
                        className="fa fa-trash-alt"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Delete IssueType"
                      />
                    }
                  />
                </td> */}
              </tr>
            ))
          : null;
    }

    return (
      <div data-test="IssueTypeListComponent">
        <Table
          tableHead={
            <tr>
              <th>#</th>
              <th>Issue Type Name</th>
              {/* <th className="w-100p">Actions</th> */}
            </tr>
          }
          tableBody={allissueType}
        />
      </div>
    );
  }
}

IssueTypeList.propTypes = {
  updateIssueType: PropTypes.func.isRequired,
  handlePreloaderStyle: PropTypes.func.isRequired,
  deleteIssueType: PropTypes.func.isRequired,
  issueType: PropTypes.object.isRequired,
  errors: PropTypes.object,
  issueTypeCount: PropTypes.number
};

export default IssueTypeList;
