import React, { Component } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import { NewTable, NewButton } from "../common";
import { NewEditToleranceType } from ".";

class NewToleranceTypeList extends Component {
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
        ? toleranceType.map((toleranceType, index) => (
            <tr key={index}>
              <td style={{ width: "10px" }}>{toleranceTypeCount++}</td>
              <td>{toleranceType.name}</td>
              {/* UPDATE AND DELETE ARE INACTIVE AT THE MOMENT */}
              {/* <td className="d-flex flex-nowrap">
                <NewButton
                  className="btn btn-primary rounded-0 d-flex btn-sm mr-2"
                  dataToggle="modal"
                  dataTarget={"#editblockselected" + toleranceType._id}
                  otherProperties={
                    <img
                      src={require("../../assets/img/edit-icon.svg")}
                      height="16"
                      alt="del_bed"
                    />
                  }
                />
                <NewEditToleranceType
                  updateToleranceType={this.props.updateToleranceType}
                  key={toleranceType._id}
                  _id={toleranceType._id}
                  name={toleranceType.name}
                  errors={errors}
                  handlePreloaderStyle={this.props.handlePreloaderStyle}
                  successMessage={this.props.successMessage}
                />
                <NewButton
                  className="btn btn-danger rounded-0 d-flex btn-sm"
                  onClick={() => {
                    this.sweetAlert(toleranceType._id);
                  }}
                  otherProperties={
                    <img
                      src={require("../../assets/img/delete-icon.svg")}
                      height="16"
                      alt="del_bed"
                    />
                  }
                />
              </td> */}
            </tr>
          ))
        : null;
    return (
      <React.Fragment>
        <NewTable
          data-test="ToleranceTypeListComponent"
          tableHead={
            <tr>
              <th>#</th>
              <th>Tolerance Type Name</th>
              {/* <th className="w-100p">Actions</th> */}
            </tr>
          }
          tableBody={alltoleranceType}
        />
      </React.Fragment>
    );
  }
}

NewToleranceTypeList.propTypes = {
  updateToleranceType: PropTypes.func,
  handlePreloaderStyle: PropTypes.func.isRequired,
  deleteToleranceType: PropTypes.func,
  toleranceType: PropTypes.array,
  // errors: PropTypes.object
};

export default NewToleranceTypeList;
