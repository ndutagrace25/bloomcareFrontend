import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";
// import { withRouter } from "react-router-dom";

import {
    fetchBlock,
    createBlock,
    updateBlock,
    deleteBlock,
    createParentBlock,
    fetchParentBlock
} from "../../actions/blockActions";

import {
    Navbar,
    //   Error,
    Preloader,
    ContentContainer,
    TableWrap,
    ExportButton,
    Pagination
} from "../common";

import { BlockList, SearchBlock, CreateBlock, AddParentBlock } from ".";

class BlocksLayout extends Component {
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
        exportBlock: []
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

        const { page, limit, search_name, search_parent } = this.state;

        this.fetchBlock(page, limit, search_name, search_parent);
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
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
        const { page, limit, name, number, parent } = this.state;
        this.fetchBlock(page, limit, name, number, parent);
        this.props.fetchParentBlock();
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

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });

            if (nextProps.errors.name) {
                JSON.stringify(Swal.fire(nextProps.errors.name, "", "error"));
            }
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
            exportBlock
        } = this.state;

        const exportBlocks = exportBlock.map(block => {
            const data = {
                Block_Name: block.name,
                Parent: block.parent ? block.parent.name : ""
            };
            return data;
        });

        return (
            <div data-test="BlocksLayoutComponent">
                <div className="components-view">
                    <Preloader preloaderStyle={preloaderStyle} data-test="PreloaderComponent" />
                    <Navbar data-test="NavbarComponent" />
                    {/* <Error message={errors} /> */}
                    <ContentContainer
                        data-test="ContainerComponent"
                        content={
                            <React.Fragment>
                                <TableWrap
                                    tableTitle="Block"
                                    createButton={
                                        <React.Fragment>
                                            <AddParentBlock
                                                handlePreloaderStyle={this.handlePreloaderStyle}
                                                handleCreateParentBlock={this.handleCreateParentBlock}
                                                errors={errors}
                                                name={create_name}
                                                number={create_number}
                                            />
                                            <CreateBlock
                                                handlePreloaderStyle={this.handlePreloaderStyle}
                                                handleCreateBlock={this.handleCreateBlock}
                                                errors={errors}
                                                parent={create_parent}
                                                name={create_name}
                                                successMessage={successMessage}
                                                parentBlockList={parentBlockList}
                                            />
                                        </React.Fragment>
                                    }
                                    exportButton={
                                        <ExportButton
                                            data={exportBlocks}
                                            filename={
                                                moment().format("DD/MM/YYYY H:mm:ss") + " Block.csv"
                                            }
                                        />
                                    }
                                    tableContent={
                                        <React.Fragment>
                                            {" "}
                                            <BlockList
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
                                {/* search */}
                                <SearchBlock
                                    onChange={this.onChange}
                                    onChangeNumber={this.onChangeNumber}
                                    handleSearch={this.handleSearch}
                                    handleCloseSearch={this.handleCloseSearch}
                                    search_name={search_name}
                                    search_parent={search_parent}
                                    parentBlockList={parentBlockList}
                                />
                            </React.Fragment>
                        }
                    />
                </div>
            </div>
        );
    }
}

BlocksLayout.propTypes = {
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
    auth: state.auth,
    blockCreated: state.block.blockCreated,
    blockUpdated: state.block.blockUpdated,
    blockDeleted: state.block.blockDeleted,
    parentBlockCreated: state.block.parentBlockCreated,
    parentBlockList: state.block.parentBlockList
});

export default connect(
    mapStateToProps,
    {
        fetchBlock,
        createBlock,
        updateBlock,
        deleteBlock,
        createParentBlock,
        fetchParentBlock
    }
)(BlocksLayout);

// export default connect(
//     mapStateToProps,
//     {
//         fetchBlock,
//         createBlock,
//         updateBlock,
//         deleteBlock,
//         createParentBlock,
//         fetchParentBlock
//     }
// )(withRouter(BlocksLayout));
