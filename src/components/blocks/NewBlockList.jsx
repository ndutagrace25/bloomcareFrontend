import React, { Component } from "react";
import Swal from "sweetalert2";
import { NewTable, NewButton } from "../common";
import { NewEditBlock } from ".";

class NewBlockList extends Component {
  sweetAlert = id => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete block!"
    }).then(result => {
      if (result.value) {
        this.props.deleteBlock(id);
        Swal.fire("Deleted", "deleted", "success");

        console.log(id);
      }
    });
  };
  render() {
    const { block, errors, parentBlockList } = this.props;
    let { blockCount } = this.props;
    const allblock =
      block.items instanceof Array
        ? block.items &&
          block.items.map(block => (
            <tr key={block.id}>
              <td style={{ width: "10px" }}>{blockCount++}</td>
              <td>{block.block_name}</td>
              <td>{block.block_number}</td>
              <td>{block.parent_name}</td>
              <td className="d-flex flex-nowrap">
                <NewButton
                  className="btn btn-primary rounded-0 d-flex btn-sm mr-2"
                  dataToggle="modal"
                  dataTarget={"#editblockselected" + block.id}
                  otherProperties={
                    <img
                      src={require("../../assets/img/edit-icon.svg")}
                      height="16"
                      alt="edit_block"
                    />
                  }
                />
                <NewEditBlock
                  updateBlock={this.props.updateBlock}
                  key={block.id}
                  _id={block.id}
                  parent={block.parent_name ? block.id : block.id}
                  name={!block.parent_name ? "" : block.block_name}
                  errors={errors}
                  handlePreloaderStyle={this.props.handlePreloaderStyle}
                  parentBlockList={parentBlockList}
                />
                <NewButton
                  className="btn btn-danger  rounded-0 d-flex btn-sm"
                  onClick={() => {
                    this.sweetAlert(block.id);
                  }}
                  otherProperties={
                    <img
                      src={require("../../assets/img/delete-icon.svg")}
                      height="16"
                      alt="del_block"
                    />
                  }
                />
              </td>
            </tr>
          ))
        : null;
    return (
      <NewTable
        tableHead={
          <tr>
            <th>#</th>
            <th scope="col">Block Name</th>
            <th scope="col">Block Number</th>
            <th scope="col">Block Parent</th>
            <th scope="col" className="w-100p">
              Actions
            </th>
          </tr>
        }
        tableBody={allblock}
      />
    );
  }
}

export default NewBlockList;
