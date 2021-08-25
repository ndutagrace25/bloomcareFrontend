import React from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import { Table, Button } from "../common";
import EditFlower from "./EditFlower";

const FlowerList = ({
  flower,
  errors,
  flowerCount,
  successMessage,
  updateFlower,
  handlePreloaderStyle,
  deleteFlower
}) => {
  const sweetAlert = id => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete flower!"
    }).then(result => {
      if (result.value) {
        deleteFlower(id);
        Swal.fire("Deleted!", "Flower has been deleted.", "success");
      }
    });
  };
  let allflower;

  if (errors.length > 0) {
    JSON.stringify(Swal.fire({ type: "error", title: "Oops! " + errors }));
  }

  if (typeof flower.items !== "undefined") {
    allflower = (flower.items instanceof Array)
      ? flower.items.map(flower => (
          <tr key={flower._id}>
            <td style={{ width: "10px" }}>{flowerCount++}</td>
            <td>{flower.name}</td>
            <td className="d-flex flex-nowrap">
              <EditFlower
                updateFlower={updateFlower}
                key={flower._id}
                _id={flower._id}
                name={flower.name}
                errors={errors}
                handlePreloaderStyle={handlePreloaderStyle}
                successMessage={successMessage}
              />
              <Button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  sweetAlert(flower._id);
                }}
                otherProps={
                  <i
                    className="fas fa-trash"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete Variety"
                  />
                }
              />
            </td>
          </tr>
        ))
      : null;
  }

  return (
    <Table
      data-test="FlowerListComponent"
      tableHead={
        <tr>
          <th>#</th>
          <th>Variety Name</th>
          <th>Actions</th>
        </tr>
      }
      tableBody={allflower}
    />
  );
};

FlowerList.propTypes = {
  updateFlower: PropTypes.func.isRequired,
  handlePreloaderStyle: PropTypes.func.isRequired,
  deleteFlower: PropTypes.func.isRequired,
  flower: PropTypes.object,
  flowerCount: PropTypes.number.isRequired,
  successMessage: PropTypes.string.isRequired,
  errors: PropTypes.object
};

export default FlowerList;
