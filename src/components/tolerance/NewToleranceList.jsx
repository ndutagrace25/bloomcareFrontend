import React, { Component } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { NewTable, NewButton } from "../common";
import { NewEditTolerance } from ".";

class NewToleranceList extends Component {
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
          ? tolerance.map((tolerance, index) => (
              <tr key={index}>
                <td style={{ width: "10px" }}>{toleranceCount++}</td>
                <td>{tolerance.name}</td>
                <td>{tolerance.from}</td>
                <td>{tolerance.to}</td>
                <td>{tolerance.tolerance_type_name}</td>
                <td className="d-flex flex-nowrap">
                  <NewButton
                    className="btn btn-primary rounded-0 d-flex btn-sm mr-2"
                    dataToggle="modal"
                    dataTarget={"#edittoleranceselected" + tolerance.id}
                    otherProperties={
                      <img
                        src={require("../../assets/img/edit-icon.svg")}
                        height="16"
                        alt="del_bed"
                      />
                    }
                  />
                  <NewEditTolerance
                    updateTolerance={this.props.updateTolerance}
                    key={tolerance.id}
                    _id={tolerance.id}
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
                  <NewButton
                    className="btn btn-danger rounded-0 d-flex btn-sm"
                    onClick={() => {
                      this.sweetAlert(tolerance.id);
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
              </tr>
            ))
          : null;
    }
    return (
      <NewTable
        tableHead={
          <tr>
            <th>#</th>
            <th scope="col">Tolerance Name</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Tolerance Type</th>
            <th scope="col" className="w-100p">
              Actions
            </th>
          </tr>
        }
        tableBody={alltolerance}
      />
    );
  }
}
NewToleranceList.propTypes = {
  updateTolerance: PropTypes.func,
  handlePreloaderStyle: PropTypes.func.isRequired,
  deleteTolerance: PropTypes.func,
  tolerance: PropTypes.array.isRequired,
  errors: PropTypes.object
};

export default NewToleranceList;
