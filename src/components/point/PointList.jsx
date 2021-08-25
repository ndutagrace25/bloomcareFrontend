import React, { Component } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import { Table, Button } from "../common";
import EditPoint from "./EditPoint";

class PointList extends Component {
  sweetAlert = id => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete point!"
    }).then(result => {
      if (result.value) {
        this.props.deletePoint(id);
        Swal.fire("Deleted!", "Point has been deleted.", "success");
      }
    });
  }; 
  render() {
    const { point, errors } = this.props;

    let { pointCount } = this.props;
    let allpoint;

    if (errors.length > 0) {
      JSON.stringify(Swal.fire({ type: "error", title: "Oops! " + errors }));
    }

    allpoint = (point.items instanceof Array)
      ? point.items.map(point => (
          <tr key={point._id}>
            <td style={{ width: "10px" }}>{pointCount++}</td>
            <td>{point.name}</td>
            <td className="d-flex flex-nowrap">
              <EditPoint
                updatePoint={this.props.updatePoint}
                key={point._id}
                _id={point._id}
                name={point.name}
                errors={errors}
                handlePreloaderStyle={this.props.handlePreloaderStyle}
                successMessage={this.props.successMessage}
              />
              <Button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  this.sweetAlert(point._id);
                }}
                otherProps={
                  <i
                    className="fas fa-trash"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete Point"
                  />
                }
              />
            </td>
          </tr>
        ))
      : null;

    return (
      <div data-test="PointListComponent">
        <Table
          tableHead={
            <tr>
              <th>#</th>
              <th>Point Name</th>
              <th>Actions</th>
            </tr>
          }
          tableBody={allpoint}
        />
      </div>
    );
  }
}

PointList.propTypes = {
  updatePoint: PropTypes.func.isRequired,
  handlePreloaderStyle: PropTypes.func.isRequired,
  deletePoint: PropTypes.func.isRequired,
  point: PropTypes.object.isRequired,
  errors: PropTypes.object,
  pointCount: PropTypes.number
};

export default PointList;
