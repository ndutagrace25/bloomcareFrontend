import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";

import {
    fetchFlower,
    createFlower,
    updateFlower,
    deleteFlower
} from "../../actions/flowerActions.js";

import {
    Navbar,
    //   Error,
    Preloader,
    ContentContainer,
    ExportButton,
    Pagination,
    TableWrap
} from "../common";

import { FlowerList, SearchFlower, CreateFlower } from ".";

class FlowerLayout extends Component {
    state = {
        page: 0,
        limit: 10,
        count: 0,
        name: "",
        flower: {},
        errors: {},
        preloaderStyle: "d-none",
        flowerCount: 0,
        successMessage: "",
        create_name: "",
        search_name: "",
        exportFlower: []
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

        const { page, limit, search_name } = this.state;

        this.fetchFlower(page, limit, search_name);
    };

    handleCloseSearch = () => {
        this.setState({
            search_name: ""
        });

        const { page, limit } = this.state;

        this.fetchFlower(page, limit, "");
    };

    handleIncrementPage = e => {
        e.preventDefault();
        const { page, limit, count, name } = this.state;
        const totalPages = Math.ceil(count / limit);
        const newPage = page + 1;

        if (newPage < totalPages) {
            this.setState({ page: newPage, flowerCount: newPage * limit });
            this.fetchFlower(newPage, limit, name);
        }
    };

    handleDecrementPage = e => {
        e.preventDefault();
        const { page, limit, name } = this.state;
        const newPage = page - 1;
        if (newPage >= 0) {
            this.setState({ page: newPage, flowerCount: newPage * limit });
            this.fetchFlower(newPage, limit, name);
        }
    };

    handleOnChangePage = e => {
        const { limit, name } = this.state;
        const newPage = parseInt(e.target.value);
        this.setState({ [e.target.name]: newPage, flowerCount: newPage * limit });
        this.fetchFlower(newPage, limit, name);
    };

    handleCreateFlower = flower => {
        this.handlePreloaderStyle("d-block");
        this.setState({
            create_name: flower.name
        });
        this.props.createFlower(flower);
    };

    fetchFlower = (page, limit, name) => {
        this.handlePreloaderStyle("d-block");
        this.props.fetchFlower(page, limit, name);
    };

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
        const { page, limit, name } = this.state;
        this.fetchFlower(page, limit, name);
    }

    componentWillReceiveProps(nextProps) {
        this.handlePreloaderStyle("d-none");
        if (nextProps.flower.items) {
            const newFlower = nextProps.flower;
            this.setState({
                flower: newFlower,
                count: nextProps.flower.rows,
                exportFlower: nextProps.flower.items
            });
        }

        if (nextProps.flowerType) {
            this.setState({
                flowerType: nextProps.flowerType
            });
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

        if (nextProps.flowerCreated) {
            const flowerCreated = nextProps.flowerCreated;
            if (flowerCreated.message === "Success") {
                this.setState({
                    successMessage: flowerCreated.message,
                    create_name: ""
                });
                JSON.stringify(Swal.fire("Flower Created Successful", "", "success"));
                const { page, limit, name } = this.state;
                this.fetchFlower(page, limit, name);
                nextProps.flowerCreated.message = "";
            }
        }

        if (nextProps.flowerDeleted) {
            const flowerDeleted = nextProps.flowerDeleted;

            if (flowerDeleted.message === "Success") {
                this.setState({
                    successMessage: flowerDeleted.message
                });

                nextProps.flowerDeleted.message = "";
                const { page, limit, name } = this.state;
                this.fetchFlower(page, limit, name);
            }
        }

        if (nextProps.flowerUpdated) {
            const flowerUpdated = nextProps.flowerUpdated;

            if (flowerUpdated.message === "Success") {
                this.setState({
                    successMessage: flowerUpdated.message
                });

                JSON.stringify(Swal.fire("Flower Updated Successful", "", "success"));
                nextProps.flowerUpdated.message = "";
                const { page, limit, name } = this.state;
                this.fetchFlower(page, limit, name);
            }
        }
    }

    render() {
        const {
            flower,
            preloaderStyle,
            errors,
            page,
            limit,
            count,
            flowerCount,
            successMessage,
            create_name,
            search_name,
            exportFlower
        } = this.state;

        const exportFlowers = exportFlower.map(flower => {
            const data = { Flower_Name: flower.name };
            return data;
        });

        return (
            <div className="components-view" data-test="FlowerLayoutComponent">
                {" "}
                <Preloader
                    preloaderStyle={preloaderStyle}
                    data-test="PreloaderComponent"
                />
                <Navbar data-test="NavbarComponent" />
                {/* <Error message={errors} /> */}
                <ContentContainer
                    data-test="ContainerComponent"
                    content={
                        <React.Fragment>
                            <TableWrap
                                tableTitle="Variaties"
                                createButton={
                                    <CreateFlower
                                        handlePreloaderStyle={this.handlePreloaderStyle}
                                        handleCreateFlower={this.handleCreateFlower}
                                        errors={errors}
                                        name={create_name}
                                        successMessage={successMessage}
                                    />
                                }
                                exportButton={
                                    <ExportButton
                                        data={exportFlowers}
                                        filename={
                                            moment().format("DD/MM/YYYY H:mm:ss") + " Varieties.csv"
                                        }
                                    />
                                }
                                tableContent={
                                    <React.Fragment>
                                        {" "}
                                        <FlowerList
                                            flower={flower}
                                            errors={errors}
                                            flowerCount={flowerCount + 1}
                                            updateFlower={this.props.updateFlower}
                                            deleteFlower={this.props.deleteFlower}
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

                            <SearchFlower
                                onChange={this.onChange}
                                onChangeNumber={this.onChangeNumber}
                                handleSearch={this.handleSearch}
                                handleCloseSearch={this.handleCloseSearch}
                                search_name={search_name}
                            />
                        </React.Fragment>
                    }
                />
            </div>
        );
    }
}

FlowerLayout.propTypes = {
    fetchFlower: PropTypes.func.isRequired,
    flower: PropTypes.object.isRequired,
    createFlower: PropTypes.func.isRequired,
    updateFlower: PropTypes.func.isRequired,
    deleteFlower: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    flower: state.flower.flower,
    errors: state.flower.flowerErrors,
    auth: state.auth,
    flowerCreated: state.flower.flowerCreated,
    flowerDeleted: state.flower.flowerDeleted,
    flowerUpdated: state.flower.flowerUpdated
});

export default connect(
    mapStateToProps,
    {
        fetchFlower,
        createFlower,
        updateFlower,
        deleteFlower
    }
)(FlowerLayout);
