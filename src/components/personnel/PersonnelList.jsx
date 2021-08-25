import React, { Component } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import { Table, Button } from "../common";
import EditPersonnel from "./EditPersonnel";

class PersonnelList extends Component {
  sweetAlert = id => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete personnel!"
    }).then(result => {
      if (result.value) {
        this.props.deletePersonnel(id);
        Swal.fire("Deleted!", "Personnel has been deleted.", "success");
      }
    });
  };
  render() {
    const { personnel, errors } = this.props;

    let { personnelCount, personnelType } = this.props;
    let allPersonnel;

    if (typeof personnel.items !== "undefined") {
      allPersonnel = (personnel.items instanceof Array)
        ? personnel.items.map(personnel => (
            <tr key={personnel._id}>
              <td style={{ width: "10px" }}>{personnelCount++}</td>
              <td>{personnel.first_name}</td>
              <td>{personnel.last_name}</td>
              <td>{personnel.phone}</td>
              <td>
                {personnel.status === 1 ? (
                  <span className="badge badge-success">Active</span>
                ) : (
                  <span className="badge badge-dark">Inactive</span>
                )}
              </td>
              <td>
                {personnel.personnel_type_id === "5d87abe06de14122f4b12e22"
                  ? "Admin"
                  : "Scout"}
              </td>
              {personnel.phone !== "0700000000" ? (
                <td className="d-flex flex-nowrap">
                  <EditPersonnel
                    personnelType={personnelType}
                    updatePersonnel={this.props.updatePersonnel}
                    key={personnel._id}
                    _id={personnel._id}
                    first_name={personnel.first_name}
                    last_name={personnel.last_name}
                    phone={personnel.phone}
                    status={personnel.status}
                    personnel_type_id={personnel.personnel_type_id}
                    errors={errors}
                    handlePreloaderStyle={this.props.handlePreloaderStyle}
                    successMessage={this.props.successMessage}
                  />
                  <Button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      this.sweetAlert(personnel._id);
                    }}
                    otherProps={
                      <i
                        className="fas fa-trash"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Delete Personnel"
                      />
                    }
                  />
                </td>
              ) : (
                <td />
              )}
            </tr>
          ))
        : null;
    }

    return (
      <div data-test="PersonnelListComponent">
        <Table
          tableHead={
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Personnel Type</th>
              <th colSpan="2">Actions</th>
            </tr>
          }
          tableBody={allPersonnel}
        />
      </div>
    );
  }
}

PersonnelList.propTypes = {
  updatePersonnel: PropTypes.func.isRequired,
  handlePreloaderStyle: PropTypes.func.isRequired,
  deletePersonnel: PropTypes.func.isRequired,
  personnel: PropTypes.object,
  personnelCount: PropTypes.number
};

export default PersonnelList;
