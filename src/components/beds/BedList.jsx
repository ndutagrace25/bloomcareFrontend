import React, { Component } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import moment from "moment";

import { Table, Button } from "../common";
import EditBed from "./EditBed";

class BedList extends Component {
  sweetAlert = id => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete bed!"
    }).then(result => {
      if (result.value) {
        this.props.deleteBed(id);
        Swal.fire("Deleted!", "Bed has been deleted.", "success");
      }
    });
  };
  
  render() {
    const { bed, errors } = this.props;

    let { bedCount, blockList, varietyList } = this.props;
    // console.log(varietyList);
    let allbed;

    if (typeof bed !== "undefined") {
      allbed = (bed instanceof Array)
        ? bed.map(bed => (
            <tr key={bed._id}>
              <td style={{ width: "10px" }}>{bedCount++}</td>
              {bed.bed !== null ? (
                <React.Fragment>
                  <td>{bed.bed.bed_name}</td>
                  <td>{bed.bed.bed_number}</td>
                  <td>{bed.bed.block.parent.name}</td>
                  <td>{bed.bed.block.name}</td>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <td />
                  <td />
                  <td />
                  <td />
                </React.Fragment>
              )}

              <td>{bed.variety.name}</td>
              <td>{moment(bed.plant_date).format("DD/MM/YYYY")}</td>
              <td>{moment(bed.expected_pick_date).format("DD/MM/YYYY")}</td>
              <td>
                {bed.status === 1 ? (
                  <span className="badge badge-success">Active</span>
                ) : (
                  <span className="badge badge-dark">Inactive</span>
                )}
              </td>
              <td className="d-flex flex-nowrap">
                <EditBed
                  updateBed={this.props.updateBed}
                  key={bed.bed._id}
                  _id={bed.bed._id}
                  blockList={blockList}
                  varietyList={varietyList}
                  bed_name={bed.bed.bed_name}
                  bed_number={bed.bed.bed_number}
                  errors={errors}
                  block={bed.bed.block.parent._id}
                  sub_block_name={bed.bed.block._id}
                  variety={bed.variety._id}
                  plant_date={bed.plant_date}
                  expected_pick_date={bed.expected_pick_date}
                  status={bed.status}
                  handlePreloaderStyle={this.props.handlePreloaderStyle}
                  successMessage={this.props.successMessage}
                />
                <Button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    this.sweetAlert(bed._id);
                  }}
                  otherProps={
                    <i
                      className="fas fa-trash"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete Bed"
                    />
                  }
                />
              </td>
            </tr>
          ))
        : null;
    }

    return (
      <div data-test="BedListComponent">
        <Table
          tableHead={
            <tr>
              <th>#</th>
              <th>Bed Name</th>
              <th>Bed Number</th>
              <th>Block Name</th>
              <th>Sub-Block</th>
              <th>Variety</th>
              <th>Plant Date</th>
              <th>Expected Pick Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          }
          tableBody={allbed}
        />
      </div>
    );
  }
}

BedList.propTypes = {
  updateBed: PropTypes.func.isRequired,
  handlePreloaderStyle: PropTypes.func.isRequired,
  deleteBed: PropTypes.func.isRequired,
  bed: PropTypes.array.isRequired,
  errors: PropTypes.object,
  bedCount: PropTypes.number.isRequired,
  blockList: PropTypes.array.isRequired,
  varietyList: PropTypes.array.isRequired
};

export default BedList;
