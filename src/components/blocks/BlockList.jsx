import React, { Component } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import { Table, Button } from "../common";
import EditBlock from "./EditBlock";

class BlockList extends Component {
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
            <tr key={block._id}>
              <td style={{ width: "10px" }}>{blockCount++}</td>
              <td>{block.name}</td>
              <td>{block.parent ? block.parent.name : ""}</td>
              <td className="d-flex flex-nowrap">
                <EditBlock
                  updateBlock={this.props.updateBlock}
                  key={block._id}
                  _id={block._id}
                  parent={block.parent ? block.parent._id : block._id}
                  name={!block.parent ? "" : block.name}
                  errors={errors}
                  handlePreloaderStyle={this.props.handlePreloaderStyle}
                  parentBlockList={parentBlockList}
                />
                <Button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    this.sweetAlert(block._id);
                  }}
                  otherProps={
                    <i
                      className="fas fa-trash"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete Block"
                    />
                  }
                />
              </td>
            </tr>
          ))
        : null;

    return (
      <div data-test="BlockListComponent">
        <Table
          tableHead={
            <tr>
              <th>#</th>
              <th>Block Name</th>
              <th>Parent</th>
              <th>Actions</th>
            </tr>
          }
          tableBody={allblock}
        />
      </div>
    );
  }
}

BlockList.propTypes = {
  updateBlock: PropTypes.func.isRequired,
  handlePreloaderStyle: PropTypes.func.isRequired,
  deleteBlock: PropTypes.func.isRequired,
  block: PropTypes.object.isRequired,
  errors: PropTypes.object,
  parentBlockList: PropTypes.array.isRequired
};

export default BlockList;
