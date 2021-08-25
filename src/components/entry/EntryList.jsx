import React, { Component } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import { Table, Button } from "../common";
import EditEntry from "./EditEntry";

class EntryList extends Component {
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

    let { entryCount, errors } = this.props;
    let allentry;

    if (entry.items) {
      allentry =
        entry.items instanceof Array
          ? entry.items.map(entry => (
              <tr key={entry._id}>
                <td style={{ width: "10px" }}>{entryCount++}</td>
                <td>{entry.name}</td>
                <td className="d-flex flex-nowrap">
                  <EditEntry
                    updateEntry={this.props.updateEntry}
                    key={entry._id}
                    _id={entry._id}
                    name={entry.name}
                    errors={errors}
                    handlePreloaderStyle={this.props.handlePreloaderStyle}
                    successMessage={this.props.successMessage}
                  />
                  <Button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      this.sweetAlert(entry._id);
                    }}
                    otherProps={
                      <i
                        className="fas fa-trash"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Delete Entry"
                      />
                    }
                  />
                </td>
              </tr>
            ))
          : null;
    }

    return (
      <React.Fragment>
        <Table
          data-test="EntryListComponent"
          tableHead={
            <tr>
              <th>#</th>
              <th>Entry Name</th>
              <th>Actions</th>
            </tr>
          }
          tableBody={allentry}
        />
      </React.Fragment>
    );
  }
}

EntryList.propTypes = {
  updateEntry: PropTypes.func.isRequired,
  handlePreloaderStyle: PropTypes.func.isRequired,
  deleteEntry: PropTypes.func.isRequired,
  entry: PropTypes.object.isRequired
};

export default EntryList;
