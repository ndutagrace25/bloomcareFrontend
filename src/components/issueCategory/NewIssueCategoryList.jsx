import React from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import { NewTable, NewButton } from "../common";
import { NewEditIssueCategory } from ".";

const NewIssueCategoryList = ({
  issueCategory,
  errors,
  issueCategoryCount,
  issueList,
  successMessage,
  updateIssueCategory,
  handlePreloaderStyle,
  deleteIssueCategory
}) => {
  const sweetAlert = id => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete issue category!"
    }).then(result => {
      if (result.value) {
        deleteIssueCategory(id);
        Swal.fire("Deleted!", "Issue category has been deleted.", "success");
      }
    });
  };

  let allissueCategory =
    issueCategory instanceof Array
      ? issueCategory.map((category, index) => (
          <tr key={index}>
            <td style={{ width: "10px" }}>{issueCategoryCount++}</td>
            <td>{category.issue_category_name}</td>
            <td>{category.issue_name}</td>
            <td className="d-flex flex-nowrap">
              <NewButton
                className="btn btn-primary rounded-0 d-flex btn-sm mr-2"
                dataToggle="modal"
                dataTarget={"#editissuecategoryselected" + category.id}
                otherProperties={
                  <img
                    src={require("../../assets/img/edit-icon.svg")}
                    height="16"
                    alt="del_issue_type"
                  />
                }
              />
              <NewEditIssueCategory
                updateIssueCategory={updateIssueCategory}
                key={category.id}
                _id={category.id}
                issueList={issueList}
                name={category.issue_category_name}
                errors={errors}
                issue={category.issue_id}
                handlePreloaderStyle={handlePreloaderStyle}
                successMessage={successMessage}
              />
              <NewButton
                className="btn btn-danger btn-sm"
                onClick={() => {
                  sweetAlert(category.id);
                }}
                otherProperties={
                  <img
                    src={require("../../assets/img/delete-icon.svg")}
                    height="16"
                    alt="del_issue_type"
                  />
                }
              />
            </td>
          </tr>
        ))
      : null;

  return (
    <NewTable
      data-test="IssueCategoryListComponent"
      tableHead={
        <tr>
          <th>#</th>
          <th>Issue Category Name</th>
          <th>Issue Name</th>
          <th className="w-100p">Actions</th>
        </tr>
      }
      tableBody={allissueCategory}
    />
  );
};

NewIssueCategoryList.propTypes = {
  updateIssueCategory: PropTypes.func.isRequired,
  handlePreloaderStyle: PropTypes.func.isRequired,
  deleteIssueCategory: PropTypes.func.isRequired,
  issueCategory: PropTypes.array.isRequired,
  errors: PropTypes.object,
  issueCategoryCount: PropTypes.number.isRequired,
  // issueList: PropTypes.array.isRequired,
  successMessage: PropTypes.string.isRequired
};

export default NewIssueCategoryList;
