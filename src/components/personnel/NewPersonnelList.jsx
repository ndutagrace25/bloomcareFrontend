import React, { Component } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import { NewTable, NewButton } from "../common";
import { NewEditPersonnel } from ".";

class NewPersonnelList extends Component {
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
    console.log(personnel.items);
    let allPersonnel;

    if (typeof personnel.items !== "undefined") {
      allPersonnel =
        personnel.items instanceof Array
          ? personnel.items.map((personnel, index) => (
              <React.Fragment key={index}>
                <tr>
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
                    {personnel.personnel_type_id === 1 ? "Admin" : "Scout"}
                  </td>

                  {personnel.phone !== "0700000000" ? (
                    <td className="d-flex flex-nowrap">
                      <NewButton
                        className="btn btn-primary rounded-0 d-flex btn-sm mr-2"
                        dataToggle="modal"
                        dataTarget={"#editpersonnelselected" + personnel.id}
                        otherProperties={
                          <img
                            src={require("../../assets/img/edit-icon.svg")}
                            height="16"
                            alt="del_bed"
                          />
                        }
                      />
                      <NewEditPersonnel
                        personnelType={personnelType}
                        updatePersonnel={this.props.updatePersonnel}
                        key={personnel.id}
                        _id={personnel.id}
                        first_name={personnel.first_name}
                        last_name={personnel.last_name}
                        phone={personnel.phone}
                        status={personnel.status}
                        personnel_type_id={personnel.personnel_type_id}
                        errors={errors}
                        handlePreloaderStyle={this.props.handlePreloaderStyle}
                        successMessage={this.props.successMessage}
                      />
                      <NewButton
                        className="btn btn-danger rounded-0 d-flex btn-sm"
                        onClick={() => {
                          this.sweetAlert(personnel.id);
                        }}
                        otherProperties={
                          <img
                            src={require("../../assets/img/delete-icon.svg")}
                            height="16"
                            alt="del_bed"
                          />
                        }
                      />
                    </td>
                  ) : null}
                </tr>
              </React.Fragment>
            ))
          : null;
    }
    return (
      <div data-test="PersonnelListComponent">
        <NewTable
          tableHead={
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Personnel Type</th>
              <th className="w-100p">Actions</th>
            </tr>
          }
          tableBody={allPersonnel}
        />
      </div>
    );
  }
}

NewPersonnelList.propTypes = {
  updatePersonnel: PropTypes.func.isRequired,
  handlePreloaderStyle: PropTypes.func.isRequired,
  deletePersonnel: PropTypes.func.isRequired,
  personnel: PropTypes.object,
  personnelCount: PropTypes.number
};

export default NewPersonnelList;
