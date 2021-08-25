import React, { Component } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
// import { MDBDataTable } from "mdbreact";

import { Table, Button } from "../common";
import EditSubBlock from "./EditSubBlock";
// import TestTable from "../common/TestTable";

class SubBlockList extends Component {
  sweetAlert = id => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete Sub-Block!"
    }).then(result => {
      if (result.value) {
        this.props.deleteSubBlock(id);
        Swal.fire("Deleted!", "Sub-Block has been deleted.", "success");
      }
    });
  };
  render() {
    const { subBlock, errors } = this.props;
    // const { data } = this.state;

    let { subBlockCount, blockList } = this.props;
    let allSubBlock;

    if (errors.length > 0) {
      JSON.stringify(Swal.fire({ type: "error", title: "Oops! " + errors }));
    }

    // for (let r = 0; r < subBlock.length; r++) {
    //   let blockName = "";
    //   for (let s = 0; s < blockList.length; s++) {
    //     if (subBlock[r].block === blockList[s]._id) {
    //       blockName = blockList[s].block_name;
    //       break;
    //     }
    //   }

    //   subBlock[r].block_name = blockName;
    // }
    if (subBlock) {
      allSubBlock = subBlock.map(subBlock => (
        <tr key={subBlock._id}>
          <td style={{ width: "10px" }}>{subBlockCount++}</td>
          <td>{subBlock.name}</td>
          <td>{subBlock.block.block_name}</td>
          <td>
            <div className="btn-group">
              <EditSubBlock
                updateSubBlock={this.props.updateSubBlock}
                key={subBlock._id}
                _id={subBlock._id}
                blockList={blockList}
                name={subBlock.name}
                errors={errors}
                block={subBlock.block._id}
                handlePreloaderStyle={this.props.handlePreloaderStyle}
                successMessage={this.props.successMessage}
              />
              <Button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  this.sweetAlert(subBlock._id);
                }}
                otherProps={
                  <i
                    className="fa fa-trash-alt"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete Sub-Block"
                  />
                }
              />
            </div>
          </td>
        </tr>
      ));
    }

    return (
      <React.Fragment>
        <Table
          tableHead={
            <tr>
              <th>#</th>
              <th>Sub-Block Name</th>
              <th>Block Name</th>
              <th>Actions</th>
            </tr>
          }
          tableBody={allSubBlock}
        />
        {/* <MDBDataTable striped bordered small data={data} /> */}
      </React.Fragment>
    );
  }
}

SubBlockList.propTypes = {
  updateSubBlock: PropTypes.func.isRequired,
  handlePreloaderStyle: PropTypes.func.isRequired,
  deleteSubBlock: PropTypes.func.isRequired,
  subBlock: PropTypes.array.isRequired
};

export default SubBlockList;
