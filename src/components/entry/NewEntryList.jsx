import React, { Component } from "react";
// import PropTypes from "prop-types";
import Swal from "sweetalert2";

import { NewTable } from "../common";
// import { NewEditEntry } from ".";

class NewEntryList extends Component {
  state = {};
  sweetAlert = id => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete entry!"
    }).then(result => {
      if (result.value) {
        this.props.deleteEntry(id);
        Swal.fire("Deleted!", "Entry has been deleted.", "success");
      }
    });
  };
  render() {
    const { entry } = this.props;

    // let {errors} = this.props

    let { entryCount } = this.props;
    let allentry;

    if (entry) {
      allentry =
        entry instanceof Array
          ? entry.map((entry, index) => (
              <tr key={index}>
                <td style={{ width: "10px" }}>{entryCount++}</td>
                <td>{entry.station_name}</td>
                 {/* EDIT AND DELETE ARE REMOVED AT THE MOMENT */}
                {/* <td className="d-flex flex-nowrap">
                  <NewButton
                    className="btn btn-primary rounded-0 d-flex btn-sm mr-2"
                    dataToggle="modal"
                    dataTarget={"#editentryselected" + entry._id}
                    otherProperties={
                      <img
                        src={require("../../assets/img/edit-icon.svg")}
                        height="16"
                        alt="del_station"
                      />
                    }
                  />
                  <NewEditEntry
                    updateEntry={this.props.updateEntry}
                    key={entry._id}
                    _id={entry._id}
                    name={entry.station_name}
                    errors={errors}
                    handlePreloaderStyle={this.props.handlePreloaderStyle}
                    successMessage={this.props.successMessage}
                  />
                  <NewButton
                    className="btn btn-danger btn-sm rounded-0 d-flex"
                    onClick={() => {
                      this.sweetAlert(entry._id);
                    }}
                    otherProperties={
                      <img
                        src={require("../../assets/img/delete-icon.svg")}
                        height="16"
                        alt="del_entry"
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
            <th scope="col">Station Number</th>
            {/* <th scope="col" className="w-100p">
              Actions
            </th> */}
          </tr>
        }
        tableBody={allentry}
      />
    );
  }
}

export default NewEntryList;
