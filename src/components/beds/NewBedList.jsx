import React, { Component } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
// import moment from "moment";
import { NewTable, NewButton } from "../common";
import { NewEditBed } from ".";

class NewBedList extends Component {
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
    let allbed;

    if (typeof bed !== "undefined") {
      allbed =
        bed instanceof Array
          ? bed.map((bed, index) => (
              <tr key={index}>
                <td style={{ width: "10px" }}>{bedCount++}</td>
                {bed.bed !== null ? (
                  <React.Fragment>
                    <td>{bed.bed_name}</td>
                    <td>{bed.bed_number}</td>
                    <td>{bed.parent_block}</td>
                    <td>{bed.block_name}</td>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <td />
                    <td />
                    <td />
                    <td />
                  </React.Fragment>
                )}

                <td>{bed.variety_name}</td>
                {/* <td>{moment(bed.plant_date).format("DD/MM/YYYY")}</td>
                <td>{moment(bed.expected_pick_date).format("DD/MM/YYYY")}</td> */}
                <td>
                  {bed.plant_status === 1 ? (
                    <span className="badge badge-success">Active</span>
                  ) : (
                    <span className="badge badge-dark">Inactive</span>
                  )}
                </td>
                <td className="d-flex flex-nowrap">
                  <NewButton
                    className="btn btn-primary rounded-0 d-flex btn-sm mr-2"
                    dataToggle="modal"
                    dataTarget={"#editbedselected" + bed.id}
                    otherProperties={ 
                      <img
                        src={require("../../assets/img/edit-icon.svg")}
                        height="16"
                        alt="del_bed"
                      />
                    }
                  />
                  <NewEditBed
                    updateBed={this.props.updateBed}
                    key={bed.id}
                    _id={bed.id}
                    blockList={blockList}
                    varietyList={varietyList}
                    bed_name={bed.bed_name}
                    bed_number={bed.bed_number}
                    errors={errors}
                    block={bed.parent_id}
                    sub_block_name={bed.block_id}
                    variety={bed.variety_id}
                    plant_date={bed.plant_date}
                    expected_pick_date={bed.expected_pick_date}
                    status={bed.status}
                    handlePreloaderStyle={this.props.handlePreloaderStyle}
                    successMessage={this.props.successMessage}
                  />
                  <NewButton
                    className="btn btn-danger rounded-0 d-flex btn-sm"
                    onClick={() => {
                      this.sweetAlert(bed.id);
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
            <th scope="col">#</th>
            <th scope="col">Bed Name</th>
            <th scope="col">Bed Number</th>
            <th scope="col">Block Name</th>
            <th scope="col">Sub-Block</th>
            <th scope="col">Variety</th>
            {/* <th scope="col">Plant Date</th>
            <th scope="col">Expected Pick Date</th> */}
            <th scope="col">Status</th>
            <th scope="col" className="w-100p">
              Actions
            </th>
          </tr>
        }
        tableBody={allbed}
      />
    );
  }
}

NewBedList.propTypes = {
  updateBed: PropTypes.func.isRequired,
  handlePreloaderStyle: PropTypes.func.isRequired,
  deleteBed: PropTypes.func.isRequired,
  bed: PropTypes.array.isRequired,
  // errors: PropTypes.object,
  bedCount: PropTypes.number.isRequired,
  blockList: PropTypes.array.isRequired
  // varietyList: PropTypes.array.isRequired
};

export default NewBedList;
