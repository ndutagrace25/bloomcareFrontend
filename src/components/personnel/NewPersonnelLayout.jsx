import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";

import {
  NewTableContainer,
  NewButton,
  Pagination,
  ExportButton,
  Preloader
} from "../common";

import {
  fetchPersonnel,
  createPersonnel,
  updatePersonnel,
  fetchPesonnelType,
  deletePersonnel,
  fetchAllPersonnel
} from "../../actions/personnelActions";

import { NewPersonnelList, NewPersonnelFilter, NewCreatePersonnel } from ".";

class NewPersonnelLayout extends Component {
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
    exportData: [],
    allPersonnel: []
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
    this.setState({
      [e.target.name]: e.target.value
    });
    const { page, limit } = this.state;

    this.fetchPersonnel(page, limit, e.target.value);
  };

  handleSearchInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.handleSearch();
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
  

    const {
      page,
      limit,
      // search_first_name,
      search_last_name,
      search_phone,
      search_status,
      search_personnel_type
    } = this.state;

    this.props.fetchPersonnel(
      page,
      limit,
      e.target.value,
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
    this.props.fetchAllPersonnel();
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

    if (nextProps.allPersonnel) {
      this.setState({
        allPersonnel: nextProps.allPersonnel
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
      allPersonnel
    } = this.state;

    //Data to be exported
    const data = allPersonnel.map(personnel => {
      const allData = {
        FirstName: personnel.first_name,
        LastName: personnel.last_name,
        Phone: personnel.phone,
        Status: personnel.status === 1 ? 'Active' : 'Inactive'
      };
      return allData;
    });
    return (
      <React.Fragment>
        <div
          className="tab-pane fade col-md-12 px-n15 show active"
          id="personnel"
          role="tabpanel"
          aria-labelledby="v-pills-home-tab"
        >
          <Preloader
            preloaderStyle={preloaderStyle}
            data-test="PreloaderComponent"
          />
          <div className="d-flex">
            <NewPersonnelFilter
              onChange={this.handleSearchInput}
              onChangeNumber={this.onChangeNumber}
              hdhfs
              handleSearch={this.handleSearch}
              handleCloseSearch={this.handleCloseSearch}
              search_first_name={search_first_name}
              search_last_name={search_last_name}
              search_phone={search_phone}
              search_status={search_status}
              search_personnel_type={search_personnel_type}
              personnelType={personnelType}
            />

            <NewTableContainer
              buttonContainer={
                <React.Fragment>
                  <NewButton
                    className="btn btn-info rounded-0 d-flex flex-nowrap align-items-center"
                    dataToggle="modal"
                    dataTarget="#createpersonnel"
                    label="Add Personnel"
                    otherProperties={
                      <img
                        src={require("../../assets/img/add-icon.svg")}
                        height="20"
                        alt="add personnel"
                        className="mr-sm-1"
                      ></img>
                    }
                  />
                  <NewCreatePersonnel
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
                    clearModalErrorAfterClose={this.clearModalErrorAfterClose}
                  />
                  <ExportButton
                    data={data}
                    filename={
                      moment().format("DD/MM/YYYY H:mm:ss") + " Personnel.csv"
                    }
                  />
                </React.Fragment>
              }
              tableContent={
                <React.Fragment>
                  <NewPersonnelList
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}

NewPersonnelLayout.propTypes = {
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
  personnelType: state.personnel.personnelType,
  personnelCreated: state.personnel.personnelCreated,
  personnelDeleted: state.personnel.personnelDeleted,
  personnelUpdated: state.personnel.personnelUpdated,
  allPersonnel: state.personnel.allPersonnel
});

export default connect(mapStateToProps, {
  fetchPersonnel,
  createPersonnel,
  updatePersonnel,
  fetchPesonnelType,
  deletePersonnel,
  fetchAllPersonnel
})(NewPersonnelLayout);
