import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";

import {
  fetchSubBlock,
  createSubBlock,
  updateSubBlock,
  deleteSubBlock
} from "../../actions/subBlockActions";
import {fetchBlock} from "../../actions/bedActions";

import {
  Navbar,
  //   Error,
  Preloader,
  Card,
  ExportButton,
  Pagination
} from "../common";

import { SubBlockList, SearchSubBlock, CreateSubBlock } from ".";

class SubBlockLayout extends Component {
  state = {
    page: 0,
    limit: 10,
    count: 0,
    name: "",
    block: "",
    subBlock: [],
    blockList: [],    
    errors: "",
    preloaderStyle: "d-none",
    subBlockCount: 0,
    successMessage: "",
    create_name: "",
    create_block: "",
    search_name: "",    
    search_block: ""
  };

  handlePreloaderStyle = newStyle => {
    this.setState({ preloaderStyle: newStyle });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onChangeNumber = e => {
    this.setState({
      [e.target.name]: parseInt(e.target.value)
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const {
      page,
      limit,
      search_name,
      search_block,
    } = this.state;

    this.fetchSubBlock(
      page,
      limit,
      search_name,
      search_block,
    );
  };

  handleCloseSearch = () => {
    this.setState({
      search_name: "",
      search_block: ""
    });

    const { page, limit } = this.state;

    this.fetchSubBlock(page, limit, "", "");
  };

  handleIncrementPage = e => {
    e.preventDefault();
    const { page, limit, count, name, block } = this.state;
    const totalPages = Math.ceil(count / limit);
    const newPage = page + 1;

    if (newPage < totalPages) {
      this.setState({ page: newPage, subBlockCount: newPage * limit });
      this.fetchSubBlock(newPage, limit, name, block);
    }
  };

  handleDecrementPage = e => {
    e.preventDefault();
    const { page, limit, name, block} = this.state;
    const newPage = page - 1;
    if (newPage >= 0) {
      this.setState({ page: newPage, subBlockCount: newPage * limit });
      this.fetchSubBlock(newPage, limit, name, block);
    }
  };

  handleOnChangePage = e => {
    const { limit, name, block} = this.state;
    const newPage = parseInt(e.target.value);
    this.setState({ [e.target.name]: newPage, subBlockCount: newPage * limit });
    this.fetchSubBlock(newPage, limit, name, block);
  };

  handleCreateSubBlock = subBlock => {
    this.handlePreloaderStyle("d-block");
    this.setState({
      create_name: subBlock.name,
      create_block: subBlock.block,     
    });
    this.props.createSubBlock(subBlock);
  };

  fetchSubBlock = (page, limit, name, block) => {
    this.handlePreloaderStyle("d-block");
    this.props.fetchSubBlock(page, limit, name, block);
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    const { page, limit, name, block} = this.state;
    this.fetchSubBlock(page, limit, name, block);
    this.props.fetchBlock();
  }

  componentWillReceiveProps(nextProps) {
    this.handlePreloaderStyle("d-none");
    if (nextProps.subBlock.items) {
      const newsubBlock = nextProps.subBlock.items;
      this.setState({
        subBlock: newsubBlock,
        count: nextProps.subBlock.rows
      });
    }

    if (nextProps.blockList) {
      this.setState({
        blockList: nextProps.blockList
      });
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    //   JSON.stringify(Swal.fire(nextProps.errors.subBlock, "", "error"));
    }

    if (nextProps.subBlockCreated) {
        // console.log(nextProps.subBlockCreated.message)
      const subBlockCreated = nextProps.subBlockCreated;
      if (subBlockCreated.message === "Success") {
        this.setState({
          successMessage: subBlockCreated.message,
          create_name: "",
          create_block: ""
        });

        JSON.stringify(Swal.fire("Sub-Block Created Successful", "", "success"));
        const { page, limit, name, block} = this.state;
        this.fetchSubBlock(page, limit, name, block);
        nextProps.subBlockCreated.message = "";
      }
    }

    if (nextProps.subBlockDeleted) {
      const subBlockDeleted = nextProps.subBlockDeleted;
      if (subBlockDeleted.message === "Success") {
        this.setState({
          successMessage: subBlockDeleted.message
        });
        nextProps.subBlockDeleted.message = "";
        const { page, limit, name, block} = this.state;
        this.fetchSubBlock(page, limit, name, block);
      }
    }

    if (nextProps.subBlockUpdated) {
      const subBlockUpdated = nextProps.subBlockUpdated;
      if (subBlockUpdated.message === "Success") {
        this.setState({
          successMessage: subBlockUpdated.message
        });

        JSON.stringify(Swal.fire("Sub-Block Updated Successful", "", "success"));
        nextProps.subBlockUpdated.message = "";
        const { page, limit, name, block } = this.state;
        this.fetchSubBlock(page, limit, name, block);
      }
    }
  }

  render() {
    const {
      subBlock,
      blockList,
      preloaderStyle,
      errors,
      page,
      limit,
      count,
      subBlockCount,
      successMessage,
      create_name,
      create_block,
      search_name,
      search_block
    } = this.state;

    const exportData = subBlock.map(subBlock => {
      const data = {
        name: subBlock.name,
        block: subBlock.block.block_name
      };
      return data;
    });

    return (
      <React.Fragment>
        <Preloader preloaderStyle={preloaderStyle} />
        <Navbar />
        {/* <Error message={errors} /> */}
        <Card
          cardTitle="Sub-Blocks"
          cardBody={
            <React.Fragment>
              <div className="row">
                <div className="col-md-8">
                  <ExportButton data={exportData} filename={moment().format('DD/MM/YYYY H:mm:ss')+" SubBlock.csv"} />
                  <CreateSubBlock
                    handlePreloaderStyle={this.handlePreloaderStyle}
                    handleCreateSubBlock={this.handleCreateSubBlock}
                    errors={errors}
                    name={create_name}
                    block={create_block}
                    successMessage={successMessage}
                    blockList={blockList}
                  />
                  <SubBlockList
                    subBlock={subBlock}
                    errors={errors}
                    subBlockCount={subBlockCount + 1}
                    blockList={blockList}
                    updateSubBlock={this.props.updateSubBlock}
                    deleteSubBlock={this.props.deleteSubBlock}
                    handlePreloaderStyle={this.handlePreloaderStyle}
                    successMessage={successMessage}
                  />
                  {count > 10 ?  <Pagination
                    page={page}
                    limit={limit}
                    count={count}
                    handleDecrementPage={this.handleDecrementPage}
                    handleIncrementPage={this.handleIncrementPage}
                    handleOnChangePage={this.handleOnChangePage}
                  />: " "}
                 
                </div>
                <div className="col-md-4">
                  <SearchSubBlock
                    onChange={this.onChange}
                    onChangeNumber={this.onChangeNumber}
                    handleSearch={this.handleSearch}
                    handleCloseSearch={this.handleCloseSearch}
                    search_name={search_name}
                    search_block={search_block}
                    blockList={blockList}
                  />
                </div>
              </div>
            </React.Fragment>
          }
        />
      </React.Fragment>
    );
  }
}

SubBlockLayout.propTypes = {
  fetchSubBlock: PropTypes.func.isRequired,
  subBlock: PropTypes.object.isRequired,
  blockList: PropTypes.array.isRequired,
  createSubBlock: PropTypes.func.isRequired,
  updateSubBlock: PropTypes.func.isRequired,
  deleteSubBlock: PropTypes.func.isRequired,
  fetchBlock: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  subBlock: state.subBlock.subBlock,
  blockList: state.subBlock.blockList,
  errors: state.errors,
  auth: state.auth,
  subBlockCreated: state.subBlock.subBlockCreated,
  subBlockDeleted: state.subBlock.subBlockDeleted,
  subBlockUpdated: state.subBlock.subBlockUpdated
});

export default connect(
  mapStateToProps,
  {
    fetchSubBlock,
    createSubBlock,
    updateSubBlock,
    deleteSubBlock,
    fetchBlock
  }
)(SubBlockLayout);
