import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import {
  fetchScout,
  fetchAllEntries,
  fetchPoint,
  fetchPlant,
  fetchIssue,
  fetchIssueCategory,
  fetchAllBlocks,
  fetchAllBeds,
  fetchAllVariety,
  fetchAllIssueType,
  fetchAllTolerance,
  fetchAllScore,
  fetchAllScouts
} from "../../actions/scoutActions";

import {
  Navbar,
  Preloader,
  ContentContainer,
  TableWrap,
  ExportButton,
  Pagination,
  ErrorBoundary,
  Error
} from "../common";

import { ScoutList, SearchScout } from ".";

class ScoutLayout extends Component {
  state = {
    page: 0,
    limit: 10,
    count: 0,
    date: "",
    scout: [],
    allScouts: [],
    entry: "",
    point: "",
    issue: "",
    block: "",
    bed: "",
    variety: "",
    issueCategory: "",
    tolerance: "",
    value: "",
    latitude: "",
    longitude: "",
    scout_personnel: "",
    score: "",
    issue_type: "",
    plantList: [],
    allEntries: [],
    allBlocks: [],
    allBeds: [],
    allVariety: [],
    allIssueTypes: [],
    allTolerance: [],
    allScores: [],
    pointList: [],
    issueList: [],
    issueCategoryList: [],
    errors: "",
    preloaderStyle: "d-none",
    scoutCount: 0,
    successMessage: "",
    search_scout_personnel: "",
    search_date: "",
    search_entry: "",
    search_point: "",
    search_issue: "",
    search_issueCategory: "",
    search_value: "",
    search_block: "",
    search_bed: "",
    search_variety: "",
    search_tolerance: "",
    search_latitude: "",
    search_longitude: "",
    search_score: "",
    search_issue_type: "",
    blockNameAlert: "Blocks Report",
    alertMessage: "",
    hasError: false
  };

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
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

    const {
      page,
      limit,
      search_date,
      search_entry,
      search_point,
      search_issue,
      search_block,
      search_bed,
      search_variety,
      search_issueCategory,
      search_tolerance,
      search_value,
      search_latitude,
      search_longitude,
      search_scout_personnel,
      search_score,
      search_issue_type
    } = this.state;

    this.fetchScout(
      page,
      limit,
      search_date,
      search_entry,
      search_point,
      search_issue,
      search_block,
      search_bed,
      search_variety,
      search_issueCategory,
      search_tolerance,
      search_value,
      search_latitude,
      search_longitude,
      search_scout_personnel,
      search_score,
      search_issue_type
    );
  };

  handleCloseSearch = () => {
    this.setState({
      search_date: "",
      search_entry: "",
      search_point: "",
      search_issue: "",
      search_block: "",
      search_bed: "",
      search_variety: "",
      search_issueCategory: "",
      search_tolerance: "",
      search_value: "",
      search_latitude: "",
      search_longitude: "",
      search_scout_personnel: "",
      search_score: "",
      search_issue_type: ""
    });

    const { page, limit } = this.state;

    this.fetchScout(
      page,
      limit,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    );
  };

  handleIncrementPage = e => {
    e.preventDefault();
    const {
      page,
      limit,
      count,
      date,
      entry,
      point,
      issue,
      block,
      bed,
      variety,
      issueCategory,
      tolerance,
      value,
      latitude,
      longitude,
      scout_personnel,
      score,
      issue_type
    } = this.state;

    const totalPages = Math.ceil(count / limit);
    const newPage = page + 1;

    if (newPage < totalPages) {
      this.setState({ page: newPage, scoutCount: newPage * limit });
      this.fetchScout(
        newPage,
        limit,
        date,
        entry,
        point,
        issue,
        block,
        bed,
        variety,
        issueCategory,
        tolerance,
        value,
        latitude,
        longitude,
        scout_personnel,
        score,
        issue_type
      );
    }
  };

  handleDecrementPage = e => {
    e.preventDefault();
    const {
      page,
      limit,
      date,
      entry,
      point,
      issue,
      block,
      bed,
      variety,
      issueCategory,
      tolerance,
      value,
      latitude,
      longitude,
      scout_personnel,
      score,
      issue_type
    } = this.state;
    const newPage = page - 1;
    if (newPage >= 0) {
      this.setState({ page: newPage, scoutCount: newPage * limit });
      this.fetchScout(
        newPage,
        limit,
        date,
        entry,
        point,
        issue,
        block,
        bed,
        variety,
        issueCategory,
        tolerance,
        value,
        latitude,
        longitude,
        scout_personnel,
        score,
        issue_type
      );
    }
  };

  handleOnChangePage = e => {
    const {
      limit,
      date,
      entry,
      point,
      issue,
      block,
      bed,
      variety,
      issueCategory,
      tolerance,
      value,
      latitude,
      longitude,
      scout_personnel,
      score,
      issue_type
    } = this.state;
    const newPage = parseInt(e.target.value);
    this.setState({ [e.target.name]: newPage, scoutCount: newPage * limit });
    this.fetchScout(
      newPage,
      limit,
      date,
      entry,
      point,
      issue,
      block,
      bed,
      variety,
      issueCategory,
      tolerance,
      value,
      latitude,
      longitude,
      scout_personnel,
      score,
      issue_type
    );
  };

  fetchScout = (
    page,
    limit,
    date,
    entry,
    point,
    issue,
    block,
    bed,
    variety,
    issueCategory,
    tolerance,
    value,
    latitude,
    longitude,
    scout_personnel,
    score,
    issue_type
  ) => {
    this.handlePreloaderStyle("d-block");
    this.props.fetchScout(
      page,
      limit,
      date,
      entry,
      point,
      issue,
      block,
      bed,
      variety,
      issueCategory,
      tolerance,
      value,
      latitude,
      longitude,
      scout_personnel,
      score,
      issue_type
    );
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    this.handlePreloaderStyle("d-none");
    const {
      page,
      limit,
      date,
      entry,
      point,
      issue,
      block,
      bed,
      variety,
      issueCategory,
      tolerance,
      value,
      latitude,
      longitude,
      scout_personnel,
      score,
      issue_type
    } = this.state;
    this.fetchScout(
      page,
      limit,
      date,
      entry,
      point,
      issue,
      block,
      bed,
      variety,
      issueCategory,
      tolerance,
      value,
      latitude,
      longitude,
      scout_personnel,
      score,
      issue_type
    );
    this.props.fetchAllEntries();
    this.props.fetchPoint();
    this.props.fetchPlant();
    this.props.fetchIssue();
    this.props.fetchIssueCategory();
    this.props.fetchAllBlocks();
    this.props.fetchAllBeds();
    this.props.fetchAllVariety();
    this.props.fetchAllIssueType();
    this.props.fetchAllTolerance();
    this.props.fetchAllScore();
    this.props.fetchAllScouts();
  }

  componentWillReceiveProps(nextProps) {
    this.handlePreloaderStyle("d-none");
    if (nextProps.scout.items) {
      const newscout = nextProps.scout.items;
      this.setState({
        scout: newscout,
        count: nextProps.scout.rows
      });
    }

    if (nextProps.plantList) {
      this.setState({
        plantList: nextProps.plantList
      });
    }

    if (nextProps.allScouts) {
      this.setState({
        allScouts: nextProps.allScouts
      });
    }

    if (nextProps.allEntries) {
      this.setState({
        allEntries: nextProps.allEntries
      });
    }

    if (nextProps.allBeds) {
      this.setState({
        allBeds: nextProps.allBeds
      });
    }

    if (nextProps.allBlocks) {
      this.setState({
        allBlocks: nextProps.allBlocks
      });
    }

    if (nextProps.allVariety) {
      this.setState({
        allVariety: nextProps.allVariety
      });
    }

    if (nextProps.allIssueTypes) {
      this.setState({
        allIssueTypes: nextProps.allIssueTypes
      });
    }

    if (nextProps.allTolerance) {
      this.setState({
        allTolerance: nextProps.allTolerance
      });
    }

    if (nextProps.allScores) {
      this.setState({
        allScores: nextProps.allScores
      });
    }

    if (nextProps.pointList) {
      this.setState({
        pointList: nextProps.pointList.items
      });
    }

    if (nextProps.issueList) {
      this.setState({
        issueList: nextProps.issueList
      });
    }

    if (nextProps.issueCategoryList) {
      this.setState({
        issueCategoryList: nextProps.issueCategoryList
      });
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  render() {
    const {
      scout,
      allEntries,
      pointList,
      issueList,
      issueCategoryList,
      preloaderStyle,
      page,
      limit,
      count,
      scoutCount,
      successMessage,
      search_date,
      search_entry,
      search_point,
      search_issue,
      search_block,
      search_bed,
      search_variety,
      search_issueCategory,
      search_tolerance,
      search_value,
      search_latitude,
      search_longitude,
      search_scout_personnel,
      search_score,
      search_issue_type,
      allBlocks,
      allBeds,
      allVariety,
      allIssueTypes,
      allTolerance,
      allScores,
      allScouts,
      hasError
    } = this.state;

    if (hasError) return <p>Refresh the page</p>;

    let { errors } = this.state;
    if (errors.id) {
      errors = errors.id;
    }

    const exportData =
      allScouts instanceof Array
        ? allScouts.map(scoutExport => {
            const data = {
              ScoutingDate: moment(scoutExport.date).format("MM/DD/YYYY"),
              Scout_First_Name:
                scoutExport.created_by === null
                  ? ""
                  : scoutExport.created_by.first_name,
              Scout_Last_Name:
                scoutExport.created_by === null
                  ? ""
                  : scoutExport.created_by.last_name,
              Block: scoutExport.plant.bed.block.parent.name,
              Bed: scoutExport.plant.bed.bed_name,
              Variety: scoutExport.plant.variety.name,
              Entry: scoutExport.entry.name,
              Point: scoutExport.point.name,
              Score: scoutExport.issue.score.name,
              // Longitude: scoutExport.longitude,
              // Latitude: scoutExport.latitude,
              // IssueCategory: scoutExport.issueCategory.name,
              Issue: scoutExport.issue.issue_name,
              //   Tolerance: scoutExport.tolerance === null ? "" : scoutExport.tolerance.name,
              Tolerance_Type: scoutExport.issue.tolerance_type.name,
              Value: scoutExport.value
            };
            return data;
          })
        : null;
    return (
      <div className="components-view" data-test="ScoutLayoutComponent">
        <Preloader
          preloaderStyle={preloaderStyle}
          data-test="PreloaderComponent"
        />
        <Navbar data-test="NavbarComponent" />
        <Error message={errors} />
        <ErrorBoundary>
          <ContentContainer
            data-test="ContainerComponent"
            content={
              <React.Fragment>
                <ErrorBoundary>
                  {" "}
                  <TableWrap
                    tableTitle="Scouting"
                    exportButton={
                      <ExportButton
                        data={exportData}
                        filename={
                          moment().format("DD/MM/YYYY H:mm:ss") + " Scout.csv"
                        }
                      />
                    }
                    tableContent={
                      <React.Fragment>
                        <ScoutList
                          scout={scout}
                          errors={errors}
                          scoutCount={scoutCount + 1}
                          issueCategoryList={issueCategoryList}
                          updateScout={this.props.updateScout}
                          deleteScout={this.props.deleteScout}
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
                </ErrorBoundary>

                <SearchScout
                  onChange={this.onChange}
                  onChangeNumber={this.onChangeNumber}
                  handleSearch={this.handleSearch}
                  handleCloseSearch={this.handleCloseSearch}
                  search_date={search_date}
                  search_entry={search_entry}
                  search_point={search_point}
                  search_issue={search_issue}
                  search_block={search_block}
                  search_bed={search_bed}
                  search_variety={search_variety}
                  search_issueCategory={search_issueCategory}
                  search_tolerance={search_tolerance}
                  search_value={search_value}
                  search_latitude={search_latitude}
                  search_longitude={search_longitude}
                  search_scout_personnel={search_scout_personnel}
                  search_score={search_score}
                  search_issue_type={search_issue_type}
                  pointList={pointList}
                  allEntries={allEntries}
                  allBlocks={allBlocks}
                  allVariety={allVariety}
                  allBeds={allBeds}
                  allIssueTypes={allIssueTypes}
                  allTolerance={allTolerance}
                  allScores={allScores}
                  issueList={issueList}
                  issueCategoryList={issueCategoryList}
                />
              </React.Fragment>
            }
          />
        </ErrorBoundary>
      </div>
    );
  }
}

ScoutLayout.propTypes = {
  fetchScout: PropTypes.func.isRequired,
  scout: PropTypes.object.isRequired,
  allEntries: PropTypes.array,
  allBlocks: PropTypes.array,
  allVariety: PropTypes.array,
  allIssueTypes: PropTypes.array,
  allTolerance: PropTypes.array,
  allScores: PropTypes.array,
  issueList: PropTypes.array,
  issueCategoryList: PropTypes.array,
  fetchIssue: PropTypes.func,
  fetchAllEntries: PropTypes.func,
  fetchPoint: PropTypes.func,
  fetchAllBeds: PropTypes.func,
  fetchAllBlocks: PropTypes.func,
  fetchAllVariety: PropTypes.func,
  fetchIssueCategory: PropTypes.func,
  fetchAllTolerance: PropTypes.func,
  fetchAllScore: PropTypes.func
};

const mapStateToProps = state => ({
  scout: state.scout.scout,
  pointList: state.scout.pointList,
  allEntries: state.scout.allEntries,
  issueList: state.scout.issueList,
  issueCategoryList: state.scout.issueCategoryList,
  allBlocks: state.scout.allBlocks,
  allBeds: state.scout.allBeds,
  allVariety: state.scout.allVariety,
  allIssueTypes: state.scout.allIssueTypes,
  allTolerance: state.scout.allTolerance,
  allScores: state.scout.allScores,
  errors: state.errors,
  auth: state.auth,
  allScouts: state.scout.allScouts
});

export default connect(mapStateToProps, {
  fetchScout,
  fetchPlant,
  fetchAllEntries,
  fetchPoint,
  fetchIssue,
  fetchIssueCategory,
  fetchAllBlocks,
  fetchAllBeds,
  fetchAllVariety,
  fetchAllIssueType,
  fetchAllTolerance,
  fetchAllScore,
  fetchAllScouts
})(ScoutLayout);
