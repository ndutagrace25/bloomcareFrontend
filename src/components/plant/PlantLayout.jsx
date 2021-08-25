import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";

import {
  fetchPlant,
  createPlant,
  updatePlant,
  deletePlant,
  fetchBlock,
  fetchBed,
  fetchFlower
} from "../../actions/plantActions";

import {
  Navbar,
  //   Error,
  Preloader,
  Card,
  ExportButton,
  Pagination
} from "../common";

import { PlantList, SearchPlant, CreatePlant } from ".";

class PlantLayout extends Component {
  state = {
    page: 0,
    limit: 10,
    count: 0,
    plant_date: "",
    expected_pick_date: "",
    status: 1,
    plant: [],
    bedList: [],
    blockList: [],
    flowerList: [],
    block: "",
    bed: "",
    flower: "",
    errors: {},
    preloaderStyle: "d-none",
    plantCount: 0,
    successMessage: "",
    create_plant_date: "",
    create_expected_pick_date: "",
    create_block: "",
    create_bed: "",
    create_flower: "",
    create_status: "",
    search_plant_date: "",
    search_expected_pick_date: "",
    search_status: "",
    search_block: "",
    search_bed: "",
    search_flower: ""
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
      search_plant_date,
      search_expected_pick_date,
      search_status,
      search_block,
      search_bed,
      search_flower
    } = this.state;

    this.fetchPlant(
      page,
      limit,
      search_plant_date,
      search_expected_pick_date,
      search_status,
      search_block,
      search_bed,
      search_flower
    );
  };

  handleCloseSearch = () => {
    this.setState({
      search_plant_date: "",
      search_expected_pick_date: "",
      search_status: "",
      search_block: "",
      search_bed: "",
      search_flower: ""
    });

    const { page, limit } = this.state;

    this.fetchPlant(page, limit, "", "", "", "", "", "");
  };

  handleIncrementPage = e => {
    e.preventDefault();
    const {
      page,
      limit,
      count,
      plant_date,
      expected_pick_date,
      status,
      block,
      bed,
      flower
    } = this.state;

    const totalPages = Math.ceil(count / limit);
    const newPage = page + 1;

    if (newPage < totalPages) {
      this.setState({ page: newPage, plantCount: newPage * limit });
      this.fetchPlant(
        newPage,
        limit,
        plant_date,
        expected_pick_date,
        status,
        block,
        bed,
        flower
      );
    }
  };

  handleDecrementPage = e => {
    e.preventDefault();
    const {
      page,
      limit,
      plant_date,
      expected_pick_date,
      status,
      block,
      bed,
      flower
    } = this.state;
    const newPage = page - 1;
    if (newPage >= 0) {
      this.setState({ page: newPage, plantCount: newPage * limit });
      this.fetchPlant(
        newPage,
        limit,
        plant_date,
        expected_pick_date,
        status,
        block,
        bed,
        flower
      );
    }
  };

  handleOnChangePage = e => {
    const {
      limit,
      plant_date,
      expected_pick_date,
      status,
      block,
      bed,
      flower
    } = this.state;
    const newPage = parseInt(e.target.value);
    this.setState({ [e.target.name]: newPage, plantCount: newPage * limit });
    this.fetchPlant(
      newPage,
      limit,
      plant_date,
      expected_pick_date,
      status,
      block,
      bed,
      flower
    );
  };

  handleCreatePlant = plant => {
    this.handlePreloaderStyle("d-block");
    this.setState({
      create_plant_date: plant.plant_date,
      create_expected_pick_date: plant.expected_pick_date,
      create_status: plant.status,
      create_block: plant.block,
      create_bed: plant.bed,
      create_flower: plant.flower
    });
    this.props.createPlant(plant);
  };

  fetchPlant = (
    page,
    limit,
    plant_date,
    expected_pick_date,
    status,
    block,
    bed,
    flower
  ) => {
    this.handlePreloaderStyle("d-block");
    this.props.fetchPlant(
      page,
      limit,
      plant_date,
      expected_pick_date,
      status,
      block,
      bed,
      flower
    );
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    const {
      page,
      limit,
      plant_date,
      expected_pick_date,
      status,
      block,
      bed,
      flower
    } = this.state;
    this.fetchPlant(
      page,
      limit,
      plant_date,
      expected_pick_date,
      status,
      block,
      bed,
      flower
    );
    this.props.fetchBlock();
    this.props.fetchBed();
    this.props.fetchFlower();
  }

  componentWillReceiveProps(nextProps) {
    this.handlePreloaderStyle("d-none");
    if (nextProps.plant.items) {
      const newPlant = nextProps.plant.items;
      this.setState({
        plant: newPlant,
        count: nextProps.plant.rows
      });
    }

    if (nextProps.blockList) {
      this.setState({
        blockList: nextProps.blockList
      });
    }

    if (nextProps.bedList) {
      this.setState({
        bedList: nextProps.bedList
      });
    }

    if (nextProps.flowerList) {
      this.setState({
        flowerList: nextProps.flowerList
      });
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (nextProps.plantCreated) {
      const plantCreated = nextProps.plantCreated;
      if (plantCreated.message === "Success") {
        this.setState({
          successMessage: plantCreated.message,
          create_plant_date: "",
          create_expected_pick_date: "",
          create_status: "",
          create_block: "",
          create_bed: "",
          create_flower: ""
        });

        JSON.stringify(Swal.fire("Plant Created Successful", "", "success"));
        const {
          page,
          limit,
          plant_date,
          expected_pick_date,
          status,
          block,
          bed,
          flower
        } = this.state;
        this.fetchPlant(
          page,
          limit,
          plant_date,
          expected_pick_date,
          status,
          block,
          bed,
          flower
        );
        nextProps.plantCreated.message = "";
      }
    }

    if (nextProps.plantDeleted) {
      const plantDeleted = nextProps.plantDeleted;
      if (plantDeleted.message === "Success") {
        this.setState({
          successMessage: plantDeleted.message
        });
        nextProps.plantDeleted.message = "";
        const {
          page,
          limit,
          plant_date,
          expected_pick_date,
          status,
          block,
          bed,
          flower
        } = this.state;
        this.fetchPlant(
          page,
          limit,
          plant_date,
          expected_pick_date,
          status,
          block,
          bed,
          flower
        );
      }
    }

    if (nextProps.plantUpdated) {
      const plantUpdated = nextProps.plantUpdated;
      if (plantUpdated.message === "Success") {
        this.setState({
          successMessage: plantUpdated.message
        });

        JSON.stringify(Swal.fire("Plant Updated Successful", "", "success"));
        nextProps.plantUpdated.message = "";
        const {
          page,
          limit,
          plant_date,
          expected_pick_date,
          status,
          block,
          bed,
          flower
        } = this.state;
        this.fetchPlant(
          page,
          limit,
          plant_date,
          expected_pick_date,
          status,
          block,
          bed,
          flower
        );
      }
    }
  }

  render() {
    const {
      bedList,
      blockList,
      plant,
      flowerList,
      preloaderStyle,
      errors,
      page,
      limit,
      count,
      plantCount,
      successMessage,
      create_plant_date,
      create_expected_pick_date,
      create_status,
      create_block,
      create_bed,
      create_flower,
      search_plant_date,
      search_expected_pick_date,
      search_status,
      search_block,
      search_bed,
      search_flower
    } = this.state;

    const exportPlant = plant.map(plant => {
      const data = {
        Planted_Date: moment(plant.plant_date).format("DD/MM/YYYY"),
        Expected_Pick_Date: moment(plant.expected_pick_date).format(
          "DD/MM/YYYY"
        ),
        Status: plant.status,
        Block_Name: plant.bed.block.block_name,
        Bed_Name: plant.bed.bed_name,
        Flower_Name: plant.flower.name
      };
      return data;
    });

    return (
      <div data-test="PlantLayoutComponent">
        <Preloader
          preloaderStyle={preloaderStyle}
          data-test="PreloaderComponent"
        />
        <Navbar data-test="NavbarComponent" />
        {/* <Error message={errors} /> */}
        <Card
          data-test="ContainerComponent"
          cardTitle="Planting"
          cardBody={
            <React.Fragment>
              <div className="row">
                <div className="col-md-8">
                  <ExportButton data={exportPlant} filename={"planting.csv"} />
                  <CreatePlant
                    handlePreloaderStyle={this.handlePreloaderStyle}
                    handleCreatePlant={this.handleCreatePlant}
                    errors={errors}
                    plant_date={create_plant_date}
                    expected_pick_date={create_expected_pick_date}
                    status={create_status}
                    block={create_block}
                    bed={create_bed}
                    flower={create_flower}
                    successMessage={successMessage}
                    blockList={blockList}
                    bedList={bedList}
                    flowerList={flowerList}
                    onChangeNumber={this.onChangeNumber}
                    plant={plant}
                  />
                  <PlantList
                    plant={plant}
                    errors={errors}
                    plantCount={plantCount + 1}
                    blockList={blockList}
                    bedList={bedList}
                    flowerList={flowerList}
                    updatePlant={this.props.updatePlant}
                    deletePlant={this.props.deletePlant}
                    handlePreloaderStyle={this.handlePreloaderStyle}
                    successMessage={successMessage}
                  />
                  <Pagination
                    page={page}
                    limit={limit}
                    count={count}
                    handleDecrementPage={this.handleDecrementPage}
                    handleIncrementPage={this.handleIncrementPage}
                    handleOnChangePage={this.handleOnChangePage}
                  />
                </div>
                <div className="col-md-4">
                  <SearchPlant
                    onChange={this.onChange}
                    onChangeNumber={this.onChangeNumber}
                    handleSearch={this.handleSearch}
                    handleCloseSearch={this.handleCloseSearch}
                    search_plant_date={search_plant_date}
                    search_expected_pick_date={search_expected_pick_date}
                    search_status={search_status}
                    search_block={search_block}
                    search_bed={search_bed}
                    search_flower={search_flower}
                    blockList={blockList}
                    bedList={bedList}
                    flowerList={flowerList}
                  />
                </div>
              </div>
            </React.Fragment>
          }
        />
      </div>
    );
  }
}

PlantLayout.propTypes = {
  fetchPlant: PropTypes.func.isRequired,
  plant: PropTypes.object.isRequired,
  blockList: PropTypes.array,
  bedList: PropTypes.array,
  flowerList: PropTypes.array,
  createPlant: PropTypes.func.isRequired,
  updatePlant: PropTypes.func.isRequired,
  deletePlant: PropTypes.func.isRequired,
  fetchBlock: PropTypes.func.isRequired,
  fetchBed: PropTypes.func.isRequired,
  fetchFlower: PropTypes.func.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  plant: state.plant.plant,
  blockList: state.plant.blockList,
  bedList: state.plant.bedList,
  flowerList: state.plant.flowerList,
  errors: state.plant.plantErrors,
  auth: state.auth,
  plantCreated: state.plant.plantCreated,
  plantDeleted: state.plant.plantDeleted,
  plantUpdated: state.plant.plantUpdated
});

export default connect(
  mapStateToProps,
  {
    fetchPlant,
    createPlant,
    updatePlant,
    deletePlant,
    fetchBlock,
    fetchBed,
    fetchFlower
  }
)(PlantLayout);
