import React from "react";
import Swal from "sweetalert2";

import { NewTable } from "../common";
// import { EditVariety } from ".";

const VarietyList = ({
  flower,
  errors,
  flowerCount,
  // successMessage,
  // updateFlower,
  // handlePreloaderStyle,
  deleteFlower
}) => {
  // const sweetAlert = id => {
  //   Swal.fire({
  //     title: "Are you sure you want to delete?",
  //     text: "You won't be able to revert this!",
  //     type: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete flower!"
  //   }).then(result => {
  //     if (result.value) {
  //       deleteFlower(id);
  //       Swal.fire("Deleted!", "Flower has been deleted.", "success");
  //     }
  //   });
  // };
  let allflower;

  if (errors.length > 0) {
    JSON.stringify(Swal.fire({ type: "error", title: "Oops! " + errors }));
  }

  if (typeof flower.items !== "undefined") {
    allflower =
      flower.items instanceof Array
        ? flower.items.map((flower, index) => (
            <tr key={index}>
              <td style={{ width: "10px" }}>{flowerCount++}</td>
              <td>{flower.name}</td>
                {/* EDIT AND DELETE ARE INACTIVE AT THE MOMENT */}
              {/* <td className="d-flex flex-nowrap">
              
                <NewButton
                  className="btn btn-primary rounded-0 d-flex btn-sm mr-2"
                  dataToggle="modal"
                  dataTarget={"#editvarietyselected" + flower.id}
                  otherProperties={
                    <img
                      src={require("../../assets/img/edit-icon.svg")}
                      height="16"
                      alt="del_variety"
                    />
                  }
                />
                <EditVariety
                  updateFlower={updateFlower}
                  key={flower.id}
                  _id={flower.id}
                  name={flower.name}
                  errors={errors}
                  handlePreloaderStyle={handlePreloaderStyle}
                  successMessage={successMessage}
                />
                <NewButton
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    sweetAlert(flower.id);
                  }}
                  otherProperties={
                    <img
                      src={require("../../assets/img/delete-icon.svg")}
                      height="16"
                      alt="del_variety"
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
          <th scope="col">Variety Name</th>
          {/* <th scope="col" className="w-100p">
            Actions
          </th> */}
        </tr>
      }
      tableBody={allflower}
    />
  );
};

export default VarietyList;
