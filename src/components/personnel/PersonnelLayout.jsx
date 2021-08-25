import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";

import {
  fetchPersonnel,
  createPersonnel,
  updatePersonnel,
  fetchPesonnelType,
  deletePersonnel
} from "../../actions/personnelActions";

import {
  Navbar,
  //   Error,
  Preloader,
  Pagination,
  ContentContainer,
  TableWrap,
  ExportButton
} from "../common";

import { PersonnelList, SearchPersonnel, CreatePersonnel } from ".";

class PersonnelLayout extends Component {
  state = {
    page: 0,
    limit: 10,
    count: 0,
    first_name: "",
    last_name: "",
    phone: "",
    status: "",
    personnel_type_id: "",
    personnel: {},
    errors: {},
    preloaderStyle: "d-none",
    personnelCount: 0,
    personnelType: [],
    successMessage: "",
    create_first_name: "",
    create_last_name: "",
    create_phone: "",
    create_status: "",
    create_personnel_type_id: "",
    search_first_name: "",
    search_last_name: "",
    search_phone: "",
    search_status: "",
    search_personnel_type: "",
    exportData: []
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
      search_first_name,
      search_last_name,
      search_phone,
      search_status,
      search_personnel_type
    } = this.state;

    this.fetchPersonnel(
      page,
      limit,
      search_first_name,
      search_last_name,
      search_phone,
      search_status,
      search_personnel_type
    );
  };

  handleCloseSearch = () => {
    this.setState({
      search_first_name: "",
      search_last_name: "",
      search_phone: "",
      search_status: "",
      search_personnel_type: ""
    });

    const { page, limit } = this.state;

    this.fetchPersonnel(page, limit, "", "", "", "", "");
  };

  handleIncrementPage = e => {
    e.preventDefault();
    const {
      page,
      limit,
      count,
      first_name,
      last_name,
      phone,
      status,
      personnel_type_id
    } = this.state;

    const totalPages = Math.ceil(count / limit);

    const newPage = page + 1;

    if (newPage < totalPages) {
      this.setState({ page: newPage, personnelCount: newPage * limit });
      this.fetchPersonnel(
        newPage,
        limit,
        first_name,
        last_name,
        phone,
        status,
        personnel_type_id
      );
    }
  };

  handleDecrementPage = e => {
    e.preventDefault();
    const {
      page,
      limit,
      first_name,
      last_name,
      phone,
      status,
      personnel_type_id
    } = this.state;
    const newPage = page - 1;
    if (newPage >= 0) {
      this.setState({ page: newPage, personnelCount: newPage * limit });
      this.fetchPersonnel(
        newPage,
        limit,
        first_name,
        last_name,
        phone,
        status,
        personnel_type_id
      );
    }
  };

  handleOnChangePage = e => {
    const {
      limit,
      first_name,
      last_name,
      phone,
      status,
      personnel_type_id
    } = this.state;
    const newPage = parseInt(e.target.value);
    this.setState({
      [e.target.name]: newPage,
      personnelCount: newPage * limit
    });
    this.fetchPersonnel(
      newPage,
      limit,
      first_name,
      last_name,
      phone,
      status,
      personnel_type_id
    );
  };

  handleCreatePersonnel = personnel => {
    this.handlePreloaderStyle("d-block");
    this.setState({
      create_first_name: personnel.first_name,
      create_last_name: personnel.last_name,
      create_phone: personnel.phone,
      create_status: personnel.status,
      create_personnel_type_id: personnel.personnel_type_id
    });
    this.props.createPersonnel(personnel);
  };

  fetchPersonnel = (
    page,
    limit,
    first_name,
    last_name,
    phone,
    status,
    personnel_type_id
  ) => {
    this.handlePreloaderStyle("d-block");
    this.props.fetchPersonnel(
      page,
      limit,
      first_name,
      last_name,
      phone,
      status,
      personnel_type_id
    );
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    const {
      page,
      limit,
      first_name,
      last_name,
      phone,
      status,
      personnel_type_id
    } = this.state;
    this.fetchPersonnel(
      page,
      limit,
      first_name,
      last_name,
      phone,
      status,
      personnel_type_id
    );
    this.props.fetchPesonnelType();
  }

  componentWillReceiveProps(nextProps) {
    this.handlePreloaderStyle("d-none");
    if (nextProps.personnel.items) {
      const newPersonnel = nextProps.personnel;
      const newExportData = nextProps.personnel.items;
      this.setState({
        personnel: newPersonnel,
        count: nextProps.personnel.rows,
        exportData: newExportData
      });
    }

    if (nextProps.personnelType) {
      this.setState({
        personnelType: nextProps.personnelType
      });
    }

    if (nextProps.errors) {
    //   const { errors } = this.state;
      this.setState({
        errors: nextProps.errors
      });
      //   console.log(errors);
    //   if (errors === {}) {
    //     // JSON.stringify(Swal.fire({ type: "error", title: "Oops! " + errors }));
    //     return null;
    //   } else {
    //     JSON.stringify(Swal.fire({ type: "error", title: "Oops! " + errors }));
    //   }
    }

    if (nextProps.personnelCreated) {
      const personnelCreated = nextProps.personnelCreated;
      if (personnelCreated.message === "Success") {
        this.setState({
          successMessage: personnelCreated.message,
          create_first_name: "",
          create_last_name: "",
          create_phone: "",
          create_status: "",
          create_personnel_type_id: ""
        });

        const {
          page,
          limit,
          first_name,
          last_name,
          phone,
          status,
          personnel_type_id
        } = this.state;
        JSON.stringify(
          Swal.fire("Personnel Created Successful", "", "success")
        );
        this.fetchPersonnel(
          page,
          limit,
          first_name,
          last_name,
          phone,
          status,
          personnel_type_id
        );
        nextProps.personnelCreated.message = "";
      }
    }

    if (nextProps.personnelDeleted) {
      const personnelDeleted = nextProps.personnelDeleted;
      if (personnelDeleted.message === "Success") {
        this.setState({
          successMessage: personnelDeleted.message
        });
        nextProps.personnelDeleted.message = "";
        const {
          page,
          limit,
          first_name,
          last_name,
          phone,
          status,
          personnel_type_id
        } = this.state;
        this.fetchPersonnel(
          page,
          limit,
          first_name,
          last_name,
          phone,
          status,
          personnel_type_id
        );
      }
    }

    if (nextProps.personnelUpdated) {
      const personnelUpdated = nextProps.personnelUpdated;
      if (personnelUpdated.message === "Success") {
        this.setState({
          successMessage: personnelUpdated.message
        });
        JSON.stringify(
          Swal.fire("Personnel Updated Successful", "", "success")
        );
        nextProps.personnelUpdated.message = "";
        const {
          page,
          limit,
          first_name,
          last_name,
          phone,
          status,
          personnel_type_id
        } = this.state;
        this.fetchPersonnel(
          page,
          limit,
          first_name,
          last_name,
          phone,
          status,
          personnel_type_id
        );
      }
    }
  }

  render() {
    const {
      personnel,
      preloaderStyle,
      errors,
      page,
      limit,
      count,
      personnelCount,
      personnelType,
      successMessage,
      create_first_name,
      create_last_name,
      create_phone,
      create_status,
      create_personnel_type_id,
      search_first_name,
      search_last_name,
      search_phone,
      search_status,
      search_personnel_type,
      exportData
    } = this.state;

    //Data to be exported
    const data = exportData.map(personnel => {
      const allData = {
        Fist_Name: personnel.first_name,
        Last_Name: personnel.last_name,
        Phone: personnel.phone,
        Status: personnel.status
      };
      return allData;
    });

    return (
      <div className="components-view" data-test="PersonnelLayoutComponent">
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
                tableTitle="Personnel"
                createButton={
                  <CreatePersonnel
                    handlePreloaderStyle={this.handlePreloaderStyle}
                    handleCreatePersonnel={this.handleCreatePersonnel}
                    personnelType={personnelType}
                    errors={errors}
                    first_name={create_first_name}
                    last_name={create_last_name}
                    phone={create_phone}
                    status={create_status}
                    personnel_type_id={create_personnel_type_id}
                    successMessage={successMessage}
                  />
                }
                exportButton={
                  <ExportButton
                    data={data}
                    filename={
                      moment().format("DD/MM/YYYY H:mm:ss") + " Personnel.csv"
                    }
                  />
                }
                tableContent={
                  <React.Fragment>
                    <PersonnelList
                      personnel={personnel}
                      errors={errors}
                      personnelCount={personnelCount + 1}
                      updatePersonnel={this.props.updatePersonnel}
                      deletePersonnel={this.props.deletePersonnel}
                      personnelType={personnelType}
                      handlePreloaderStyle={this.handlePreloaderStyle}
                      successMessage={successMessage}
                      handleCreatePersonnel={this.handleCreatePersonnel}
                      first_name={create_first_name}
                      last_name={create_last_name}
                      phone={create_phone}
                      status={create_status}
                      personnel_type_id={create_personnel_type_id}
                      data={data}
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
              <SearchPersonnel
                onChange={this.onChange}
                onChangeNumber={this.onChangeNumber}
                handleSearch={this.handleSearch}
                handleCloseSearch={this.handleCloseSearch}
                search_first_name={search_first_name}
                search_last_name={search_last_name}
                search_phone={search_phone}
                search_status={search_status}
                search_personnel_type={search_personnel_type}
                personnelType={personnelType}
              />
            </React.Fragment>
          }
        />
      </div>
    );
  }
}

PersonnelLayout.propTypes = {
  fetchPersonnel: PropTypes.func.isRequired,
  personnel: PropTypes.object.isRequired,
  createPersonnel: PropTypes.func.isRequired,
  updatePersonnel: PropTypes.func.isRequired,
  fetchPesonnelType: PropTypes.func.isRequired,
  deletePersonnel: PropTypes.func.isRequired,
  errors: PropTypes.object,
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  personnel: state.personnel.personnel,
  errors: state.personnel.personnelErrors,
  auth: state.auth,
  personnelType: state.personnel.personnelType,
  personnelCreated: state.personnel.personnelCreated,
  personnelDeleted: state.personnel.personnelDeleted,
  personnelUpdated: state.personnel.personnelUpdated
});

export default connect(
  mapStateToProps,
  {
    fetchPersonnel,
    createPersonnel,
    updatePersonnel,
    fetchPesonnelType,
    deletePersonnel
  }
)(PersonnelLayout);
