import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";
import {
  NewBlockList,
  NewBlockFilter,
  NewCreateBlock,
  CreateSubBlock
} from ".";

import {
  fetchBlock,
  createBlock,
  updateBlock,
  deleteBlock,
  createParentBlock,
  fetchParentBlock,
  fetchAllBlocks
} from "../../actions/blockActions";

import {
  NewTableContainer,
  NewButton,
  Preloader,
  Pagination,
  ExportButton
} from "../common";

class NewBlockLayout extends Component {
  state = {
    page: 0,
    limit: 10,
    count: 0,
    blockCount: 0,
    block: {},
    parentBlockList: [],
    errors: {},
    preloaderStyle: "d-none",
    name: "",
    parent: "",
    number: "",
    sub_block_name: "",
    successMessage: "",
    search_name: "",
    search_parent: "",
    create_name: "",
    create_parent: "",
    create_number: "",
    exportBlock: [],
    allBlocks: []
  };

  handlePreloaderStyle = newStyle => {
    this.setState({ preloaderStyle: newStyle });
  };

  clearModalErrorAfterClose = () => {
    this.setState({
      errors: {},
    })
  }

  onChange = e => {
    const { page, limit, search_name } = this.state;

    this.setState({
      [e.target.name]: e.target.value
    });

    this.fetchBlock(page, limit, e.target.value, search_name);
  };

  onChangeNumber = e => {
    this.setState({
      [e.target.name]: parseInt(e.target.value)
    });
  };

  handleSearch = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });

    const { page, limit } = this.state;

    this.fetchBlock(page, limit,  "Block " + e.target.value);
  };

  handleCloseSearch = () => {
    this.setState({
      search_name: "",
      search_parent: ""
    });

    const { page, limit } = this.state;

    this.fetchBlock(page, limit, "", "");
  };

  handleIncrementPage = e => {
    e.preventDefault();
    const { page, limit, count, name, sub_block_name } = this.state;
    const totalPages = Math.ceil(count / limit);
    let newPage = page + 1;
    if (newPage < totalPages) {
      this.setState({ page: newPage, blockCount: newPage * limit });
      this.fetchBlock(newPage, limit, name, sub_block_name);
    }
  };

  handleDecrementPage = e => {
    e.preventDefault();
    const { page, limit, name, sub_block_name } = this.state;
    const newPage = page - 1;
    if (newPage >= 0) {
      this.setState({ page: newPage, blockCount: newPage * limit });
      this.fetchBlock(newPage, limit, name, sub_block_name);
    }
  };

  handleOnChangePage = e => {
    const { limit, name, sub_block_name } = this.state;
    const newPage = parseInt(e.target.value);
    this.setState({ [e.target.name]: newPage, blockCount: newPage * limit });
    this.fetchBlock(newPage, limit, name, sub_block_name);
  };

  handleCreateBlock = block => {
    this.handlePreloaderStyle("d-block");
    this.setState({
      create_parent: block.parent,
      create_name: block.name
    });
    this.props.createBlock(block);
  };

  handleCreateParentBlock = parentBlock => {
    this.handlePreloaderStyle("d-block");
    this.setState({
      create_name: parentBlock.name,
      create_number: parentBlock.number
    });
    this.props.createParentBlock(parentBlock);
  };

  fetchBlock = (page, limit, name, number, parent) => {
    this.handlePreloaderStyle("d-block");
    this.props.fetchBlock(page, limit, name, number, parent);
  };

  componentDidMount() {
    const { page, limit, name, number, parent } = this.state;
    this.fetchBlock(page, limit, name, number, parent);
    this.props.fetchParentBlock();
    this.props.fetchAllBlocks();
  }

  componentWillReceiveProps(nextProps) {
    this.handlePreloaderStyle("d-none");
    if (nextProps.block.items) {
      const newBlock = nextProps.block;
      this.setState({
        block: newBlock,
        count: nextProps.block.rows,
        exportBlock: nextProps.block.items
      });
    }

    if (nextProps.parentBlockList) {
      const newparentBlockList = nextProps.parentBlockList;
      this.setState({
        parentBlockList: newparentBlockList
      });
    }

    if (nextProps.allBlocks) {
      const newAllBlockList = nextProps.allBlocks;
      this.setState({
        allBlocks: newAllBlockList
      });
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });

      // if (nextProps.errors.name) {
      //   JSON.stringify(Swal.fire(nextProps.errors.name, "", "error"));
      // }
    }

    if (nextProps.blockCreated) {
      const blockCreated = nextProps.blockCreated;
      if (blockCreated.message === "Success") {
        this.setState({
          successMessage: blockCreated.message,
          create_parent: "",
          create_name: "",
          create_number: ""
        });
        JSON.stringify(Swal.fire("Block Created Successful", "", "success"));
        nextProps.blockCreated.message = "";
        const { page, limit, name, number, parent } = this.state;
        this.fetchBlock(page, limit, name, number, parent);
      }
    }

    if (nextProps.parentBlockCreated) {
      const parentBlockCreated = nextProps.parentBlockCreated;
      if (parentBlockCreated.message === "Success") {
        this.setState({
          successMessage: parentBlockCreated.message,
          create_name: "",
          create_number: "",
          create_parent: ""
        });
        JSON.stringify(
          Swal.fire("Parent Block Created Successful", "", "success")
        );
        nextProps.parentBlockCreated.message = "";
        const { page, limit, name, number, parent } = this.state;
        this.fetchBlock(page, limit, name, number, parent);
        window.location.reload();
      }
    }

    if (nextProps.blockUpdated) {
      const blockUpdated = nextProps.blockUpdated;
      if (blockUpdated.message === "Success") {
        this.setState({
          successMessage: blockUpdated.message
        });
        JSON.stringify(Swal.fire("Block Updated Successful", "", "success"));
        nextProps.blockUpdated.message = "";
        const { page, limit, parent, sub_block_name } = this.state;
        this.fetchBlock(page, limit, parent, sub_block_name);
      }
    }

    if (nextProps.blockDeleted) {
      const blockDeleted = nextProps.blockDeleted;
      if (blockDeleted.message === "Success") {
        this.setState({
          successMessage: blockDeleted.message
        });
        nextProps.blockDeleted.message = "";
        const { page, limit, parent, sub_block_name } = this.state;
        this.fetchBlock(page, limit, parent, sub_block_name);
      }
    }
  }

  render() {
    const {
      block,
      parentBlockList,
      preloaderStyle,
      errors,
      page,
      limit,
      count,
      blockCount,
      successMessage,
      create_name,
      create_parent,
      create_number,
      search_name,
      search_parent,
      allBlocks
    } = this.state;

    const exportBlocks = allBlocks.map(block => {
      const data = {
        BlockName: block.name,
        Parent: block.parent ? block.parent: ""
      };
      return data;
    });

    return (
      <React.Fragment>
        <div
          className="tab-pane fade col-md-12 px-n15"
          id="block"
          role="tabpanel"
          aria-labelledby="v-pills-home-tab"
        >
          <Preloader
            preloaderStyle={preloaderStyle}
            data-test="PreloaderComponent"
          />
          <div className="d-flex">
            <NewBlockFilter
              onChange={this.onChange}
              onChangeNumber={this.onChangeNumber}
              handleSearch={this.handleSearch}
              handleCloseSearch={this.handleCloseSearch}
              search_name={search_name}
              search_parent={search_parent}
              parentBlockList={parentBlockList}
            />

            <NewTableContainer
              buttonContainer={
                <React.Fragment>
                  <NewButton
                    className="btn btn-info rounded-0 d-flex flex-nowrap align-items-center"
                    dataToggle="modal"
                    dataTarget="#createblock"
                    label="Add Block"
                    otherProperties={
                      <img
                        src={require("../../assets/img/add-icon.svg")}
                        height="20"
                        alt="add tolerance-type"
                        className="mr-sm-1"
                      ></img>
                    }
                  />

                  <NewCreateBlock
                    handlePreloaderStyle={this.handlePreloaderStyle}
                    handleCreateParentBlock={this.handleCreateParentBlock}
                    errors={errors}
                    name={create_name}
                    number={create_number}
                    clearModalErrorAfterClose={this.clearModalErrorAfterClose}
                  />
                  <NewButton
                    className="btn btn-info rounded-0 d-flex flex-nowrap align-items-center"
                    dataToggle="modal"
                    dataTarget="#createsubblock"
                    label="Add Sub Block"
                    otherProperties={
                      <img
                        src={require("../../assets/img/add-icon.svg")}
                        height="20"
                        alt="add tolerance-type"
                        className="mr-sm-1"
                      ></img>
                    }
                  />
                  <CreateSubBlock
                    handlePreloaderStyle={this.handlePreloaderStyle}
                    handleCreateBlock={this.handleCreateBlock}
                    errors={errors}
                    parent={create_parent}
                    name={create_name}
                    successMessage={successMessage}
                    parentBlockList={parentBlockList}
                    clearModalErrorAfterClose={this.clearModalErrorAfterClose}
                  />
                  <ExportButton
                    data={exportBlocks}
                    filename={
                      moment().format("DD/MM/YYYY H:mm:ss") + " Blocks.csv"
                    }
                  />
                </React.Fragment>
              }
              tableContent={
                <React.Fragment>
                  <NewBlockList
                    block={block}
                    page={page}
                    limit={limit}
                    errors={errors}
                    blockCount={blockCount + 1}
                    updateBlock={this.props.updateBlock}
                    deleteBlock={this.props.deleteBlock}
                    handlePreloaderStyle={this.handlePreloaderStyle}
                    parentBlockList={parentBlockList}
                  />
                  {count > 10 ? (
                    <Pagination
                      page={page}
                      limit={limit}
                      count={count}
                      handleDecrementPage={this.handleDecrementPage}
                      handleIncrementPage={this.handleIncrementPage}
                      handleOnChangePage={this.handleOnChangePage}
                    />
                  ) : (
                    ""
                  )}
                </React.Fragment>
              }
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

NewBlockLayout.propTypes = {
  fetchBlock: PropTypes.func.isRequired,
  fetchParentBlock: PropTypes.func.isRequired,
  block: PropTypes.object.isRequired,
  createBlock: PropTypes.func.isRequired,
  createParentBlock: PropTypes.func.isRequired,
  updateBlock: PropTypes.func.isRequired,
  deleteBlock: PropTypes.func.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  block: state.block.block,
  errors: state.block.blockErrors,
  blockCreated: state.block.blockCreated,
  blockUpdated: state.block.blockUpdated,
  blockDeleted: state.block.blockDeleted,
  parentBlockCreated: state.block.parentBlockCreated,
  parentBlockList: state.block.parentBlockList,
  allBlocks: state.scout.allBlocks
});

export default connect(mapStateToProps, {
  fetchBlock,
  createBlock,
  updateBlock,
  deleteBlock,
  createParentBlock,
  fetchParentBlock,
  fetchAllBlocks
})(NewBlockLayout);
