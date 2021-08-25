import React, { Component } from "react";
import {
  NewTableContainer,
  // NewButton,
  Pagination,
  ExportButton,
  Preloader
} from "../common";
import { NewEntryList, NewEntryFilter } from ".";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";
import {
  fetchEntry,
  createEntry,
  updateEntry,
  deleteEntry,
  fetchAllEntries
} from "../../actions/entryActions";

class NewEntryLayout extends Component {
  state = {
    page: 0,
    limit: 10,
    count: 0,
    name: "",
    entry: {},
    entryError: {},
    entryCount: 0,
    successMessage: "",
    create_name: "",
    search_name: "",
    exportEntry: [],
    dataTest: "",
    allstations: []
  };
  handlePreloaderStyle = newStyle => {
    this.setState({ preloaderStyle: newStyle });
  };

  clearModalErrorAfterClose = () => {
    this.setState({
      entryError: {}
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    const { page, limit } = this.state;

    this.fetchEntry(page, limit, e.target.value);
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

    this.fetchEntry(page, limit, "Station " + e.target.value);
  };

  handleCloseSearch = () => {
    this.setState({
      search_name: ""
    });

    const { page, limit } = this.state;

    this.fetchEntry(page, limit, "");
  };

  handleIncrementPage = e => {
    e.preventDefault();
    const { page, limit, count, name } = this.state;
    const totalPages = Math.ceil(count / limit);
    const newPage = page + 1;

    if (newPage < totalPages) {
      this.setState({ page: newPage, entryCount: newPage * limit });
      this.fetchEntry(newPage, limit, name);
    }
  };

  handleDecrementPage = e => {
    e.preventDefault();
    const { page, limit, name } = this.state;
    const newPage = page - 1;
    if (newPage >= 0) {
      this.setState({ page: newPage, entryCount: newPage * limit });
      this.fetchEntry(newPage, limit, name);
    }
  };

  handleOnChangePage = e => {
    const { limit, name } = this.state;
    const newPage = parseInt(e.target.value);
    this.setState({ [e.target.name]: newPage, entryCount: newPage * limit });
    this.fetchEntry(newPage, limit, name);
  };

  handleCreateEntry = entry => {
    this.handlePreloaderStyle("d-block");
    this.setState({
      create_name: entry.name
    });
    this.props.createEntry(entry);
  };

  fetchEntry = (page, limit, name) => {
    this.handlePreloaderStyle("d-block");
    this.props.fetchEntry(page, limit, name);
  };

  componentDidMount() {
    const { page, limit, name } = this.state;
    this.fetchEntry(page, limit, name);
    this.props.fetchAllEntries();
  }

  componentWillReceiveProps(nextProps) {
    this.handlePreloaderStyle("d-none");
    if (nextProps.entry) {
      const newEntry = nextProps.entry.items;
      this.setState({
        entry: newEntry,
        count: nextProps.entry.rows,
        exportEntry: nextProps.entry.items
      });
    }

    // if (nextProps.entryType) {
    //   this.setState({
    //     entryType: nextProps.entryType
    //   });
    // }

    if (nextProps.allstations) {
      this.setState({
        allstations: nextProps.allstations
      });
    }

    if (nextProps.entryError) {
      this.setState({
        entryError: nextProps.entryError
      });
    }

    if (nextProps.entryCreated) {
      const entryCreated = nextProps.entryCreated;
      if (entryCreated.message === "Success") {
        this.setState({
          successMessage: entryCreated.message,
          create_name: ""
        });
        JSON.stringify(Swal.fire("Entry Created Successful", "", "success"));
        const { page, limit, name } = this.state;
        this.fetchEntry(page, limit, name);
        nextProps.entryCreated.message = "";
      }
    }

    if (nextProps.entryDeleted) {
      const entryDeleted = nextProps.entryDeleted;

      if (entryDeleted.message === "Success") {
        this.setState({
          successMessage: entryDeleted.message
        });

        nextProps.entryDeleted.message = "";
        const { page, limit, name } = this.state;
        this.fetchEntry(page, limit, name);
      }
    }

    if (nextProps.entryUpdated) {
      const entryUpdated = nextProps.entryUpdated;

      if (entryUpdated.message === "Success") {
        this.setState({
          successMessage: entryUpdated.message
        });

        JSON.stringify(Swal.fire("Entry Updated Successful", "", "success"));
        nextProps.entryUpdated.message = "";
        const { page, limit, name } = this.state;
        this.fetchEntry(page, limit, name);
      }
    }
  }

  render() {
    const {
      entry,
      preloaderStyle,
      entryError,
      page,
      limit,
      count,
      entryCount,
      successMessage,
      // create_name,
      search_name,
      allstations
    } = this.state;

    const exportEntrys = allstations.map(Station => {
      const data = { StationName: Station.station_name };
      return data;
    });
    return (
      <React.Fragment>
        <div
          className="tab-pane fade col-md-12 px-n15"
          id="entry"
          role="tabpanel"
          aria-labelledby="v-pills-home-tab"
        >
          <Preloader
            preloaderStyle={preloaderStyle}
            data-test="PreloaderComponent"
          />
          <div className="d-flex">
            <NewEntryFilter
              data-test="SearchEntryComponent"
              onChange={this.onChange}
              onChangeNumber={this.onChangeNumber}
              handleSearch={this.handleSearch}
              handleCloseSearch={this.handleCloseSearch}
              search_name={search_name}
            />
            <NewTableContainer
              buttonContainer={
                <React.Fragment>
                  {/* CREATE STATION IS DISABLED AT THE MOMENT */}
                  {/* <NewButton
                    className="btn btn-info rounded-0 d-flex flex-nowrap align-items-center"
                    dataToggle="modal"
                    dataTarget="#createentry"
                    label="Add Station"
                    otherProperties={
                      <img
                        src={require("../../assets/img/add-icon.svg")}
                        height="20"
                        alt="add_station"
                        className="mr-sm-1"
                      ></img>
                    }
                  />
                  <NewCreateEntry
                    handlePreloaderStyle={this.handlePreloaderStyle}
                    handleCreateEntry={this.handleCreateEntry}
                    errors={entryError}
                    name={create_name}
                    successMessage={successMessage}
                    clearModalErrorAfterClose={this.clearModalErrorAfterClose}
                  /> */}
                  <ExportButton
                    data={exportEntrys}
                    filename={
                      moment().format("DD/MM/YYYY H:mm:ss") + " Stations.csv"
                    }
                  />
                </React.Fragment>
              }
              tableContent={
                <React.Fragment>
                  <NewEntryList
                    data-test="EntryListComponent"
                    entry={entry}
                    errors={entryError}
                    entryCount={entryCount + 1}
                    updateEntry={this.props.updateEntry}
                    deleteEntry={this.props.deleteEntry}
                    handlePreloaderStyle={this.handlePreloaderStyle}
                    successMessage={successMessage}
                  />
                  {count > 10 ? (
                    <Pagination
                      data-test="PaginationComponent"
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
const mapStateToProps = state => ({
  entryError: state.entry.entryError,
  entry: state.entry.entry,
  auth: state.auth,
  entryCreated: state.entry.entryCreated,
  entryDeleted: state.entry.entryDeleted,
  entryUpdated: state.entry.entryUpdated,
  allstations: state.scout.allEntries
});

export default connect(mapStateToProps, {
  fetchEntry,
  createEntry,
  updateEntry,
  deleteEntry,
  fetchAllEntries
})(NewEntryLayout);
