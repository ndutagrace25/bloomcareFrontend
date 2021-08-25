import React, { Component } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import moment from "moment";

import { Table } from "../common";
// import EditPlant from "./EditPlant";

class PlantList extends Component {
  sweetAlert = id => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete plant!"
    }).then(result => {
      if (result.value) {
        this.props.deletePlant(id);
        Swal.fire("Deleted!", "Plant has been deleted.", "success");
      }
    });
  };
  render() {
    const { plant } = this.props;

    // let { plantCount, blockList, bedList, flowerList } = this.props;
    let allplant;
    if (typeof plant !== "undefined") {
      allplant = plant
        ? plant.map(plant => (
            <tr key={plant._id}>
              {/* <td style={{ width: "10px" }}>{plantCount++}</td> */}
              <td>{moment(plant.plant_date).format("DD/MM/YYYY")}</td>
              <td>{moment(plant.expected_pick_date).format("DD/MM/YYYY")}</td>
              {/* {console.log(plant.bed.bed_name)} */}
              <td>
                {plant.status === 1 ? (
                  <span className="badge badge-success">Active</span>
                ) : (
                  <span className="badge badge-secondary">Inactive</span>
                )}
              </td>
              {/* <td>{plant.bed.block.block_name}</td> */}
              {/* <td>{plant.bed.bed_name}</td> */}
              {/* <td>{plant.flower.name}</td> */}
              {/* <td>
                <div className="btn-group">
                  <EditPlant
                    updatePlant={this.props.updatePlant}
                    key={plant._id}
                    _id={plant._id}
                    blockList={blockList}
                    bedList={bedList}
                    flowerList={flowerList}
                    plant_date={plant.plant_date}
                    expected_pick_date={plant.expected_pick_date}
                    status={plant.status}
                    errors={errors}
                    block={plant.bed.block._id}
                    bed={plant.bed._id}
                    flower={plant.flower._id}
                    handlePreloaderStyle={this.props.handlePreloaderStyle}
                    successMessage={this.props.successMessage}
                  />
                  <Button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      this.sweetAlert(plant._id);
                    }}
                    otherProps={
                      <i
                        className="fa fa-trash-alt"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Delete Plant"
                      />
                    }
                  />
                </div>
              </td> */}
            </tr>
          ))
        : null;
    }

    return (
      <div data-test="PlantListComponent">
        <Table
          tableHead={
            <tr>
              <th>#</th>
              <th>Plant Date</th>
              <th>Expected Pick Date</th>
              <th>Status</th>
              <th>Block Name</th>
              <th>Bed Name</th>
              <th>Flower Name</th>
              <th>Actions</th>
            </tr>
          }
          tableBody={allplant}
        />
      </div>
    );
  }
}

PlantList.propTypes = {
  updatePlant: PropTypes.func.isRequired,
  handlePreloaderStyle: PropTypes.func.isRequired,
  deletePlant: PropTypes.func.isRequired,
  plant: PropTypes.array.isRequired,
  plantCount: PropTypes.number,
  blockList: PropTypes.array,
  bedList: PropTypes.array,
  flowerList: PropTypes.array,
  errors: PropTypes.object
};

export default PlantList;
