import React, { Component } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import { Table, Button } from "../common";
import EditTolerance from "./EditTolerance";

class ToleranceList extends Component {
  sweetAlert = id => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete tolerance!"
    }).then(result => {
      if (result.value) {
        this.props.deleteTolerance(id);
        Swal.fire("Deleted!", "Tolerance has been deleted.", "success");
      }
    });
  };
  render() {
    const { tolerance, errors } = this.props;

    let { toleranceCount, toleranceType } = this.props;
    let alltolerance;

    if (errors.length > 0) {
      JSON.stringify(Swal.fire({ type: "error", title: "Oops! " + errors }));
    }

    if (typeof tolerance !== "undefined") {
      alltolerance =
        tolerance instanceof Array
          ? tolerance.map(tolerance => (
              <tr key={tolerance._id}>
                <td style={{ width: "10px" }}>{toleranceCount++}</td>
                <td>{tolerance.name}</td>
                <td>{tolerance.from}</td>
                <td>{tolerance.to}</td>
                <td>{tolerance.tolerance_type.name}</td>
                <td className="d-flex flex-nowrap">
                  <EditTolerance
                    updateTolerance={this.props.updateTolerance}
                    key={tolerance._id}
                    _id={tolerance._id}
                    toleranceType={toleranceType}
                    name={tolerance.name}
                    to={tolerance.to}
                    from={tolerance.from}
                    type={tolerance.type}
                    errors={errors}
                    tolerance_type={tolerance.tolerance_type._id}
                    handlePreloaderStyle={this.props.handlePreloaderStyle}
                    successMessage={this.props.successMessage}
                  />
                  <Button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      this.sweetAlert(tolerance._id);
                    }}
                    otherProps={
                      <i
                        className="fas fa-trash"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Delete Tolerance"
                      />
                    }
                  />
                </td>
              </tr>
            ))
          : null;
    }

    return (
      <div data-test="ToleranceListComponent">
        <Table
          tableHead={
            <tr>
              <th>#</th>
              <th>Tolerance Name</th>
              <th>From</th>
              <th>To</th>
              <th>Tolerance Type </th>
              <th>Actions</th>
            </tr>
          }
          tableBody={alltolerance}
        />
      </div>
    );
  }
}

ToleranceList.propTypes = {
  updateTolerance: PropTypes.func,
  handlePreloaderStyle: PropTypes.func.isRequired,
  deleteTolerance: PropTypes.func,
  tolerance: PropTypes.array.isRequired,
  errors: PropTypes.object
};

export default ToleranceList;
