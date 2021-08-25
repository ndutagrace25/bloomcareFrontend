import React, { Component } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import { Table, Button } from "../common";
import EditToleranceType from "./EditToleranceType";

class ToleranceTypeList extends Component {
  sweetAlert = id => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete tolerance type!"
    }).then(result => {
      if (result.value) {
        this.props.deleteToleranceType(id);
        Swal.fire("Deleted!", "Tolerance type has been deleted.", "success");
      }
    });
  };
  render() {
    const { toleranceType, errors } = this.props;

    let { toleranceTypeCount } = this.props;
    let alltoleranceType;

    // if(typeof toleranceType === 'undefined'){
    //     return null;
    // }

    alltoleranceType =
      toleranceType instanceof Array
        ? toleranceType.map(toleranceType => (
            <tr key={toleranceType._id}>
              <td style={{ width: "10px" }}>{toleranceTypeCount++}</td>
              <td>{toleranceType.name}</td>
              <td className="d-flex flex-nowrap">
                <EditToleranceType
                  updateToleranceType={this.props.updateToleranceType}
                  key={toleranceType._id}
                  _id={toleranceType._id}
                  name={toleranceType.name}
                  errors={errors}
                  handlePreloaderStyle={this.props.handlePreloaderStyle}
                  successMessage={this.props.successMessage}
                />
                <Button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    this.sweetAlert(toleranceType._id);
                  }}
                  otherProps={
                    <i
                      className="fas fa-trash"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete Tolerance Type"
                    />
                  }
                />
              </td>
            </tr>
          ))
        : null;

    return (
      <React.Fragment>
        <Table
          data-test="ToleranceTypeListComponent"
          tableHead={
            <tr>
              <th>#</th>
              <th>Tolerance Type Name</th>
              <th>Actions</th>
            </tr>
          }
          tableBody={alltoleranceType}
        />
      </React.Fragment>
    );
  }
}

ToleranceTypeList.propTypes = {
  updateToleranceType: PropTypes.func,
  handlePreloaderStyle: PropTypes.func.isRequired,
  deleteToleranceType: PropTypes.func,
  toleranceType: PropTypes.array,
  errors: PropTypes.object
};

export default ToleranceTypeList;
