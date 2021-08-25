import React, { Component } from "react";
import Swal from "sweetalert2";

import { NewTable } from "../common";
// import { NewEditPoint } from ".";

class NewPointList extends Component {
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

    allpoint =
      point.items instanceof Array
        ? point.items.map((point, index) => (
            <tr key={index}>
              <td style={{ width: "10px" }}>{pointCount++}</td>
              <td>{point.point_name}</td>
              {/* UPDATE AND DELETE POINT IS DISABLED AT THE MOMENT */}
              {/* <td className="d-flex flex-nowrap">
                <NewButton
                  className="btn btn-primary rounded-0 d-flex btn-sm mr-2"
                  dataToggle="modal"
                  dataTarget={"#editpointselected" + point._id}
                  otherProperties={
                    <img
                      src={require("../../assets/img/edit-icon.svg")}
                      height="16"
                      alt="del_point"
                    />
                  }
                />
                <NewEditPoint
                  updatePoint={this.props.updatePoint}
                  key={point._id}
                  _id={point._id}
                  name={point.name}
                  errors={errors}
                  handlePreloaderStyle={this.props.handlePreloaderStyle}
                  successMessage={this.props.successMessage}
                />
                <NewButton
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    this.sweetAlert(point._id);
                  }}
                  otherProperties={
                    <img
                      src={require("../../assets/img/delete-icon.svg")}
                      height="16"
                      alt="del_point"
                    />
                  }
                />
              </td> */}
            </tr>
          ))
        : null;
    return (
      <NewTable
        tableHead={
          <tr>
            <th scope="col">#</th>
            <th scope="col">Point Name</th>
            {/* <th scope="col" className="w-100p">
              Actions
            </th> */}
          </tr>
        }
        tableBody={allpoint}
      />
    );
  }
}

export default NewPointList;
