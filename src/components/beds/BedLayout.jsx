import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";

import {
    fetchBed,
    createBed,
    updateBed,
    deleteBed,
    fetchVariety
} from "../../actions/bedActions";

import { fetchAllBlocks } from "../../actions/scoutActions";

import {
    Navbar,
    //   Error,
    Preloader,
    ContentContainer,
    TableWrap,
    ExportButton,
    Pagination
} from "../common";

import { BedList, SearchBed, CreateBed } from ".";

class BedLayout extends Component {
    state = {
        page: 0,
        limit: 10,
        count: 0,
        bed_name: "",
        bed_number: "",
        bed: [],
        varietyList: [],
        allBlocks: [],
        block: "",
        sub_block_name: "",
        variety: "",
        plant_date: "",
        expected_pick_date: "",
        status: "",
        errors: {},
        preloaderStyle: "d-none",
        bedCount: 0,
        successMessage: "",
        create_from: "",
        create_to: "",
        create_bed_name: "",
        create_bed_number: "",
        create_block: "",
        create_sub_block: "",
        create_variety: "",
        create_plant_date: "",
        create_expected_pick_date: "",
        create_status: "",
        search_bed_name: "",
        search_bed_number: "",
        search_block: "",
        search_sub_block: "",
        search_variety: "",
        search_plant_date: "",
        search_expected_pick_date: "",
        search_status: ""
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
            search_bed_name,
            search_bed_number,
            search_block,
            search_sub_block,
            search_variety,
            search_plant_date,
            search_expected_pick_date,
            search_status
        } = this.state;

        this.fetchBed(
            page,
            limit,
            search_bed_name,
            search_bed_number,
            search_block,
            search_sub_block,
            search_variety,
            search_plant_date,
            search_expected_pick_date,
            search_status
        );
    };

    handleCloseSearch = () => {
        this.setState({
            search_bed_name: "",
            search_bed_number: "",
            search_block: "",
            search_sub_block: "",
            search_variety: "",
            search_plant_date: "",
            search_expected_pick_date: "",
            search_status: ""
        });

        const { page, limit } = this.state;

        this.fetchBed(page, limit, "", "", "", "", "", "", "", "");
    };

    handleIncrementPage = e => {
        e.preventDefault();
        const {
            page,
            limit,
            count,
            bed_name,
            bed_number,
            block,
            sub_block_name,
            variety,
            plant_date,
            expected_pick_date,
            status
        } = this.state;
        const totalPages = Math.ceil(count / limit);
        const newPage = page + 1;

        if (newPage < totalPages) {
            this.setState({ page: newPage, bedCount: newPage * limit });
            this.fetchBed(
                newPage,
                limit,
                bed_name,
                bed_number,
                block,
                sub_block_name,
                variety,
                plant_date,
                expected_pick_date,
                status
            );
        }
    };

    handleDecrementPage = e => {
        e.preventDefault();
        const {
            page,
            limit,
            bed_name,
            bed_number,
            block,
            sub_block_name,
            variety,
            plant_date,
            expected_pick_date,
            status
        } = this.state;
        const newPage = page - 1;
        if (newPage >= 0) {
            this.setState({ page: newPage, bedCount: newPage * limit });
            this.fetchBed(
                newPage,
                limit,
                bed_name,
                bed_number,
                block,
                sub_block_name,
                variety,
                plant_date,
                expected_pick_date,
                status
            );
        }
    };

    handleOnChangePage = e => {
        const {
            limit,
            bed_name,
            bed_number,
            block,
            sub_block_name,
            variety,
            plant_date,
            expected_pick_date,
            status
        } = this.state;
        const newPage = parseInt(e.target.value);
        this.setState({ [e.target.name]: newPage, bedCount: newPage * limit });
        this.fetchBed(
            newPage,
            limit,
            bed_name,
            bed_number,
            block,
            sub_block_name,
            variety,
            plant_date,
            expected_pick_date,
            status
        );
    };

    handleCreateBed = bed => {
        this.handlePreloaderStyle("d-block");

        this.setState({
            create_bed_name: bed.bed_name,
            create_bed_number: bed.bed_number,
            create_block: bed.block,
            create_sub_block: bed.sub_block_name,
            create_variety: bed.variety,
            create_plant_date: bed.plant_date,
            create_expected_pick_date: bed.expected_pick_date,
            create_status: bed.status
        });
        this.props.createBed(bed);
    };

    fetchBed = (
        page,
        limit,
        bed_name,
        bed_number,
        block,
        sub_block_name,
        variety,
        plant_date,
        expected_pick_date,
        status
    ) => {
        this.handlePreloaderStyle("d-block");
        this.props.fetchBed(
            page,
            limit,
            bed_name,
            bed_number,
            block,
            sub_block_name,
            variety,
            plant_date,
            expected_pick_date,
            status
        );
    };

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
        const {
            page,
            limit,
            bed_name,
            bed_number,
            block,
            sub_block_name,
            variety,
            plant_date,
            expected_pick_date,
            status
        } = this.state;
        this.fetchBed(
            page,
            limit,
            bed_name,
            bed_number,
            block,
            sub_block_name,
            variety,
            plant_date,
            expected_pick_date,
            status
        );
        this.props.fetchVariety();
        this.props.fetchAllBlocks();
    }

    componentWillReceiveProps(nextProps) {
        this.handlePreloaderStyle("d-none");
        if (nextProps.bed.items) {
            const newBed = nextProps.bed.items;
            this.setState({
                bed: newBed,
                count: nextProps.bed.rows
            });
        }

        if (nextProps.varietyList) {
            this.setState({
                varietyList: nextProps.varietyList
            });
        }

        if (nextProps.allBlocks) {
            this.setState({
                allBlocks: nextProps.allBlocks
            });
        }

        if (nextProps.errors) {
            // console.log(nextProps.errors)
            // const {errors} = this.state;
            this.setState({
                errors: nextProps.errors
            });
            // JSON.stringify(Swal.fire(errors, "", "error"));
        }

        if (nextProps.bedCreated) {
            const bedCreated = nextProps.bedCreated;
            if (bedCreated.message === "Success") {
                this.setState({
                    successMessage: bedCreated.message,
                    create_from: "",
                    create_to: '',
                    create_bed_name: "",
                    create_bed_number: "",
                    create_block: "",
                    create_sub_block: "",
                    create_variety: "",
                    create_plant_date: "",
                    create_expected_pick_date: "",
                    create_status: ""
                });

                JSON.stringify(Swal.fire("Bed Created Successful", "", "success"));
                const {
                    page,
                    limit,
                    bed_name,
                    bed_number,
                    block,
                    sub_block_name,
                    variety,
                    plant_date,
                    expected_pick_date,
                    status
                } = this.state;
                this.fetchBed(
                    page,
                    limit,
                    bed_name,
                    bed_number,
                    block,
                    sub_block_name,
                    variety,
                    plant_date,
                    expected_pick_date,
                    status
                );
                nextProps.bedCreated.message = "";
            }
        }

        if (nextProps.bedDeleted) {
            const bedDeleted = nextProps.bedDeleted;
            if (bedDeleted.message === "Success") {
                this.setState({
                    successMessage: bedDeleted.message
                });
                nextProps.bedDeleted.message = "";
                const {
                    page,
                    limit,
                    bed_name,
                    bed_number,
                    block,
                    sub_block_name,
                    variety,
                    plant_date,
                    expected_pick_date,
                    status
                } = this.state;
                this.fetchBed(
                    page,
                    limit,
                    bed_name,
                    bed_number,
                    block,
                    sub_block_name,
                    variety,
                    plant_date,
                    expected_pick_date,
                    status
                );
            }
        }

        if (nextProps.bedUpdated) {
            const bedUpdated = nextProps.bedUpdated;
            if (bedUpdated.message === "Success") {
                this.setState({
                    successMessage: bedUpdated.message
                });

                JSON.stringify(Swal.fire("Bed Updated Successful", "", "success"));
                nextProps.bedUpdated.message = "";
                const {
                    page,
                    limit,
                    bed_name,
                    bed_number,
                    block,
                    sub_block_name,
                    variety,
                    plant_date,
                    expected_pick_date,
                    status
                } = this.state;
                this.fetchBed(
                    page,
                    limit,
                    bed_name,
                    bed_number,
                    block,
                    sub_block_name,
                    variety,
                    plant_date,
                    expected_pick_date,
                    status
                );
            }
        }
    }

    render() {
        const {
            bed,
            varietyList,
            preloaderStyle,
            errors,
            page,
            limit,
            count,
            bedCount,
            successMessage,
            create_from,
            create_to,
            create_bed_name,
            create_bed_number,
            create_block,
            create_sub_block,
            create_variety,
            create_plant_date,
            create_expected_pick_date,
            create_status,
            search_bed_name,
            search_bed_number,
            search_block,
            search_sub_block,
            search_variety,
            search_plant_date,
            search_expected_pick_date,
            search_status,
            allBlocks
        } = this.state;

        const exportData = bed.map(bed => {
            const data = {
                Bed_Name: bed.bed_name,
                Bed_Number: bed.bed_number,
                Block_Name: bed.block_name
            };
            return data;
        });

        return (
            <React.Fragment>
                <div className="components-view" data-test="BedLayoutComponent">
                    <Preloader preloaderStyle={preloaderStyle} data-test="PreloaderComponent" />
                    <Navbar data-test="NavbarComponent" />
                    {/* <Error message={errors} /> */}
                    <ContentContainer
                        data-test="ContainerComponent"
                        content={
                            <React.Fragment>
                                <TableWrap
                                    tableTitle="Beds"
                                    createButton={
                                        <CreateBed
                                            handlePreloaderStyle={this.handlePreloaderStyle}
                                            handleCreateBed={this.handleCreateBed}
                                            errors={errors}
                                            from={create_from}
                                            to={create_to}
                                            bed_name={create_bed_name}
                                            bed_number={create_bed_number}
                                            block={create_block}
                                            sub_block_name={create_sub_block}
                                            variety={create_variety}
                                            plant_date={create_plant_date}
                                            expected_pick_date={create_expected_pick_date}
                                            status={create_status}
                                            successMessage={successMessage}
                                            allBlocks={allBlocks}
                                            varietyList={varietyList}
                                        />
                                    }
                                    exportButton={
                                        <ExportButton
                                            data={exportData}
                                            filename={
                                                moment().format("DD/MM/YYYY H:mm:ss") + " Bed.csv"
                                            }
                                        />
                                    }
                                    tableContent={
                                        <React.Fragment>
                                            <BedList
                                                bed={bed}
                                                errors={errors}
                                                bedCount={bedCount + 1}
                                                blockList={allBlocks}
                                                varietyList={varietyList}
                                                updateBed={this.props.updateBed}
                                                deleteBed={this.props.deleteBed}
                                                handlePreloaderStyle={this.handlePreloaderStyle}
                                                successMessage={successMessage}
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
                                <SearchBed
                                    onChange={this.onChange}
                                    onChangeNumber={this.onChangeNumber}
                                    handleSearch={this.handleSearch}
                                    handleCloseSearch={this.handleCloseSearch}
                                    search_bed_name={search_bed_name}
                                    search_bed_number={search_bed_number}
                                    search_block={search_block}
                                    search_sub_block={search_sub_block}
                                    search_variety={search_variety}
                                    search_plant_date={search_plant_date}
                                    search_expected_pick_date={search_expected_pick_date}
                                    search_status={search_status}
                                    blockList={allBlocks}
                                    varietyList={varietyList}
                                />
                            </React.Fragment>
                        }
                    />
                </div>
            </React.Fragment>
        );
    }
}

BedLayout.propTypes = {
    fetchBed: PropTypes.func.isRequired,
    bed: PropTypes.object.isRequired,
    allBlocks: PropTypes.array.isRequired,
    varietyList: PropTypes.array.isRequired,
    createBed: PropTypes.func.isRequired,
    updateBed: PropTypes.func.isRequired,
    deleteBed: PropTypes.func.isRequired,
    fetchAllBlocks: PropTypes.func.isRequired,
    errors: PropTypes.object
};

const mapStateToProps = state => ({
    bed: state.bed.bed,
    varietyList: state.bed.varietyList,
    errors: state.bed.bedErrors,
    auth: state.auth,
    bedCreated: state.bed.bedCreated,
    bedDeleted: state.bed.bedDeleted,
    bedUpdated: state.bed.bedUpdated,
    allBlocks: state.scout.allBlocks
});

export default connect(
    mapStateToProps,
    {
        fetchBed,
        createBed,
        updateBed,
        deleteBed,
        fetchVariety,
        fetchAllBlocks
    }
)(BedLayout);
