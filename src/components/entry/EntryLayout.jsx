import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";

import {
  fetchEntry,
  createEntry,
  updateEntry,
  deleteEntry
} from "../../actions/entryActions";

import {
  Navbar,
  //   Error,
  Preloader,
  ContentContainer,
  TableWrap,
  ExportButton,
  Pagination
} from "../common";

import { EntryList, SearchEntry, CreateEntry } from ".";

class EntryLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      dataTest: ""
    };
  }

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

    this.fetchEntry(page, limit, search_name);
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
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    const { page, limit, name } = this.state;
    this.fetchEntry(page, limit, name);
  }

  componentWillReceiveProps(nextProps) {
    this.handlePreloaderStyle("d-none");
    if (nextProps.entry.items) {
      const newEntry = nextProps.entry;
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
        JSON.stringify(Swal.fire("Station Created Successful", "", "success"));
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

        JSON.stringify(Swal.fire("Station Updated Successful", "", "success"));
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
      create_name,
      search_name,
      exportEntry
    } = this.state;

    const exportEntrys = exportEntry.map(entry => {
      const data = { Entry_Name: entry.name };
      return data;
    });

    return (
      <div className="components-view" data-test="EntryLayoutComponent">
        <Preloader
          preloaderStyle={preloaderStyle}
          data-test="PreloaderComponent"
        />
        <Navbar data-test="NavbarComponent" />
        {/* <Error message={entryError} /> */}
        <ContentContainer
          data-test="ContainerComponent"
          content={
            <React.Fragment>
              <TableWrap
                data-test="TableWrapComponent"
                tableTitle="Entries"
                createButton={
                  <CreateEntry
                    handlePreloaderStyle={this.handlePreloaderStyle}
                    handleCreateEntry={this.handleCreateEntry}
                    errors={entryError}
                    name={create_name}
                    successMessage={successMessage}
                  />
                }
                exportButton={
                  <ExportButton
                    data-test="ExportButtonComponent"
                    data={exportEntrys}
                    filename={
                      moment().format("DD/MM/YYYY H:mm:ss") + " Entry.csv"
                    }
                  />
                }
                tableContent={
                  <React.Fragment>
                    {" "}
                    <EntryList
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
              <SearchEntry
                 data-test="SearchEntryComponent"
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

EntryLayout.propTypes = {
  fetchEntry: PropTypes.func.isRequired,
  entry: PropTypes.object.isRequired,
  entryError: PropTypes.object,
  auth: PropTypes.object.isRequired,
  createEntry: PropTypes.func.isRequired,
  updateEntry: PropTypes.func.isRequired,
  deleteEntry: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  entry: state.entry.entry,
  entryError: state.entry.entryError,
  auth: state.auth,
  entryCreated: state.entry.entryCreated,
  entryDeleted: state.entry.entryDeleted,
  entryUpdated: state.entry.entryUpdated
});

export default connect(
  mapStateToProps,
  {
    fetchEntry,
    createEntry,
    updateEntry,
    deleteEntry
  }
)(EntryLayout);
