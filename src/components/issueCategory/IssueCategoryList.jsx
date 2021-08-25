import React from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import { Table, Button } from "../common";
import EditIssueCategory from "./EditIssueCategory";

const IssueCategoryList = ({
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

  // if (errors.length > 0) {
  //   JSON.stringify(Swal.fire({ type: "error", title: "Oops! " + errors }));
  // }

  let allissueCategory =
    issueCategory instanceof Array
      ? issueCategory.map(category => (
          <tr key={category._id}>
            <td style={{ width: "10px" }}>{issueCategoryCount++}</td>
            <td>{category.issue_category_name}</td>
            <td>{category.issue_name}</td>
            <td className="d-flex flex-nowrap">
              <EditIssueCategory
                updateIssueCategory={updateIssueCategory}
                key={category.id}
                _id={category.id}
                issueList={issueList}
                name={category.name}
                errors={errors}
                issue={category.issue && category.issue_id}
                handlePreloaderStyle={handlePreloaderStyle}
                successMessage={successMessage}
              />
              <Button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  sweetAlert(category._id);
                }}
                otherProps={
                  <i
                    className="fas fa-trash"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete Issue Category"
                  />
                }
              />
            </td>
          </tr>
        ))
      : null;

  return (
    <Table
      data-test="IssueCategoryListComponent"
      tableHead={
        <tr>
          <th>#</th>
          <th>Issue Category Name</th>
          <th>Issue Name</th>
          <th>Actions</th>
        </tr>
      }
      tableBody={allissueCategory}
    />
  );
};

IssueCategoryList.propTypes = {
  updateIssueCategory: PropTypes.func.isRequired,
  handlePreloaderStyle: PropTypes.func.isRequired,
  deleteIssueCategory: PropTypes.func.isRequired,
  issueCategory: PropTypes.array.isRequired,
  errors: PropTypes.object,
  issueCategoryCount: PropTypes.number.isRequired,
  issueList: PropTypes.array.isRequired,
  successMessage: PropTypes.string.isRequired
};

export default IssueCategoryList;
