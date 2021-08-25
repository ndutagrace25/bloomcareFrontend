import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import moment from "moment";

import { fetchBlock, fetchBed } from "../../actions/plantActions";
import {
  farmReport,
  fetchBlockReport,
  fetchBedReport,
  fetchEntryReport,
  fetchAllEntries,
  fetchBedDate,
  fetchPrintReport,
  fetchPrevalence,
  fetchAllVariety,
  fetchAllBlockDates,
  fetchVarietyReport
} from "../../actions/scoutActions";
import { fetchParentBlock } from "../../actions/blockActions";
import { fetchAllPersonnel } from "../../actions/personnelActions";
import {
  fetchIssue,
  fetchAllIssueCategory
} from "../../actions/issueCategoryActions";

import { DashboardNav, Preloader } from "../common";
import FarmView from "./FarmView";
import SingleBlockView from "./SingleBlockView";
import Entries from "./Entries";

class DashboardLayout extends Component {
  state = {
    preloaderStyle: "d-none",
    parentBlockList: [],
    bedList: [],
    showComponent: false,
    showEntries: false,
    farmReportAlert: [],
    blockReport: [],
    bedReport: [],
    printReport: [],
    entryReport: [],
    bedDates: [],
    _id: "",
    // bed_id: 0,
    display: "none",
    blockName: "",
    bedName: "",
    entryName: "",
    bedNumber: "",
    bed_id: "",
    date: new Date().toISOString().substring(0, 10),
    variety_id: "",
    created_by: "",
    myCustomObject: {},
    prevalence: [],
    diseaseArray: [],
    pestArray: [],
    allVariety: [],
    allScoutPersonnel: [],
    blockDates: [],
    search_variety: "",
    search_issue: "",
    search_scout: "",
    scout_name: "",
    search_date: new Date().toISOString().substring(0, 10),
    sdate: "",
    edate: new Date().toISOString().substring(0, 10),
    issueCategory: "",
    issue: "",
    issueList: [],
    allIssueCategory: [],
    defaultEntryId: "",
    block: "",
    issueType: "",
    blockIssueTypes: [],
    parentBlock: "",
    varietyReport: [],
    filterVarietyBlock: "",
    varietyCreated: "",
    variety: ''
  };

  handlePreloaderStyle = newStyle => {
    this.setState({ preloaderStyle: newStyle });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  fetchReports = () => {
    this.handlePreloaderStyle("d-block");
    this.props.fetchBlock();
    this.props.fetchParentBlock();
    this.props.fetchBed();
    this.props.farmReport();
    this.props.fetchAllEntries();
    this.props.fetchAllVariety();
    this.props.fetchAllPersonnel();
    this.props.fetchIssue();
    this.props.fetchAllIssueCategory();
    // this.props.fetchBedReport();
    // this.props.fetchPrintReport();
    // this.props.fetchPrevalence();
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    const {
      sdate,
      edate,
      block,
      // issueType,
      issue,
      filterVarietyBlock,
      varietyCreated,
      variety
    } = this.state;

    this.fetchReports();
    this.fetchPrevalence(sdate, edate, block, variety, issue);
    this.props.fetchVarietyReport(filterVarietyBlock, varietyCreated);
    // this.handlePreloaderStyle("d-block");
    this.intervalId = setInterval(() => this.props.farmReport(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  //   componentWillUnmount(){
  //     clearInterval(this.interval);
  //   }

  componentWillReceiveProps(nextProps) {
    this.handlePreloaderStyle("d-none");
    if (nextProps.parentBlockList) {
      const newparentBlockList = nextProps.parentBlockList;
      this.setState({
        parentBlockList: newparentBlockList
      });
    }

    if (nextProps.allEntries) {
      const newallEntries = nextProps.allEntries;
      this.setState({
        allEntries: newallEntries,
        bed_id: ""
        // date: new Date().toISOString().substring(0, 10)
      });
      //   const {date} = this.state;
      //   this.props.fetchBedReport()
    }

    // all issues
    if (nextProps.issueList) {
      const newissueList = nextProps.issueList;
      // console.log(newissueList);
      this.setState({
        issueList: newissueList
      });
    }

    // all issueCategory
    if (nextProps.allIssueCategory) {
      const newallIssueCategory = nextProps.allIssueCategory;
      this.setState({
        allIssueCategory: newallIssueCategory
      });
    }

    // all varieties
    if (nextProps.allVariety) {
      const newallVariety = nextProps.allVariety;
      this.setState({
        allVariety: newallVariety
      });
    }

    // all scouPersonnel
    if (nextProps.allScoutPersonnel) {
      //   console.log(nextProps.allScoutPersonnel);
      const newallScoutPersonnel = nextProps.allScoutPersonnel;
      this.setState({
        allScoutPersonnel: newallScoutPersonnel
      });
    }

    // all BlockDates
    if (nextProps.blockDates) {
      const newblockDates = nextProps.blockDates;
      this.setState({
        blockDates: newblockDates
      });
    }

    if (nextProps.bedList) {
      const newbedList = nextProps.bedList;
      this.setState({
        bedList: newbedList
      });
    }

    if (nextProps.farmReportAlert) {
      const newfarmReportAlert = nextProps.farmReportAlert;
      this.setState({
        farmReportAlert: newfarmReportAlert
      });
    }

    if (nextProps.blockReport.beds) {
      this.setState({
        blockReport: nextProps.blockReport.beds,
        blockName: nextProps.blockReport.block_name
      });
    }
    if (nextProps.prevalence) {
      //   console.log(nextProps.prevalence);
      this.setState({
        prevalence: nextProps.prevalence
      });
    }

    if (nextProps.bedReport) {
      if (nextProps.bedReport.length > 0) {
        // console.log(nextProps.bedReport);
        const defaultEntryId = nextProps.bedReport[0].entry_id;

        this.setState({
          bedReport: nextProps.bedReport,
          defaultEntryId: defaultEntryId
        });
      }
    }

    if (nextProps.bedName) {
      this.setState({
        bedName: nextProps.bedName
      });
    }

    if (nextProps.bedNumber) {
      this.setState({
        bedNumber: nextProps.bedNumber
      });
    }

    if (nextProps.bed_id) {
      //   console.log(nextProps.bed_id);
      this.setState({
        bed_id: nextProps.bed_id
      });
    }

    if (nextProps.entryReport) {
      // console.log(nextProps.entryReport);
      this.setState({
        entryReport: nextProps.entryReport.entryArray,
        entryName: nextProps.entryReport.fetchedEntryName
      });
    }

    if (nextProps.printReport) {
      this.setState({
        printReport: nextProps.printReport
      });
    }
    if (nextProps.varietyReport) {
      this.setState({
        varietyReport: nextProps.varietyReport
      });
    }

    if (nextProps.bedDates) {
      this.setState({
        bedDates: nextProps.bedDates
      });
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });

      if (nextProps.errors.block_number) {
        JSON.stringify(Swal.fire(nextProps.errors.block_number, "", "error"));
      }
    }
  }

  fetchPrintReport = (id, variety_id, created_by, created, issue) => {
    this.props.fetchPrintReport(id, variety_id, created_by, created, issue);
  };

  fetchPrevalence = (sdate, edate, block, variety, issue) => {
    this.props.fetchPrevalence(sdate, edate, block, variety, issue);
  };

  handleSearchPrevalence = e => {
    e.preventDefault();

    const { sdate, edate, block, variety, issue } = this.state;
    this.handlePreloaderStyle("d-block");
    this.fetchPrevalence(sdate, edate, block, variety, issue);
    // console.log(_id, search_date);
  };

  handleCloseSearchPrevalence = () => {
    this.setState({
      issueCategory: "",
      issue: "",
      sdate: new Date().toISOString().substring(0, 10),
      edate: new Date().toISOString().substring(0, 10)
    });

    const { bed_id } = this.state;

    this.fetchPrevalence(bed_id, "", "", "", "");
  };

  handleSearch = e => {
    e.preventDefault();

    const {
      _id,
      search_variety,
      search_scout,
      search_date,
      search_issue
    } = this.state;
    this.handlePreloaderStyle("d-block");
    this.fetchPrintReport(
      _id,
      search_variety,
      search_scout,
      search_date,
      search_issue
    );
    // console.log(_id, search_date);
  };

  handleCloseSearch = () => {
    this.setState({
      search_variety: "",
      search_scout: "",
      search_date: new Date().toISOString().substring(0, 10),
      search_issue: ""
    });

    const { _id } = this.state;

    this.fetchPrintReport(_id, "", "", "", "");
    // console.log(_id, this.state.search_date);
  };

  onBlockClick = id => {
    this.handlePreloaderStyle("d-block");
    this.setState({
      _id: id,
      showComponent: true,
      display: "block"
    });
    const { variety_id, created_by, date, issue } = this.state;
    this.props.fetchBlockReport(id);
    this.fetchPrintReport(id, variety_id, created_by, date, issue);
    this.props.fetchAllBlockDates(id);
  };

  onBedClick = (bed_id, created) => {
    this.setState({
      showEntries: true
    });
    this.props.fetchBedReport(bed_id, created);
    // this.props.fetchBedDate(bed_id);
    // this.fetchPrintReport();
  };

  onEntryClick = (entry_id, bed, date) => {
    this.handlePreloaderStyle("d-block");
    this.props.fetchEntryReport(entry_id, bed, date);
  };

  backToFarmView = () => {
    // const { _id } = this.state;
    this.setState({
      showComponent: false
      //   _id: ""
    });
    // window.location.reload();
    this.fetchPrintReport();
    this.fetchReports();
    this.props.farmReport();
    // this.props.fetchBlockReport(_id);
  };

  backToBlockView = () => {
    this.setState({
      showComponent: true,
      showEntries: false
    });
  };

  onBedFilter = e => {
    e.preventDefault();
    const { bed_id, date } = this.state;
    this.handlePreloaderStyle("d-block");
    this.props.fetchBedReport(bed_id, date);
  };

  getStationIcon = alert => {
    const icon =
      alert === "Success" ? (
        <img src={require("../../assets/svg/blank.svg")} alt="nothing" />
      ) : alert === "Danger" ? (
        <img src={require("../../assets/svg/danger.svg")} alt="danger" />
      ) : alert === "Warning" ? (
        <img src={require("../../assets/svg/warning.svg")} alt="warning" />
      ) : (
        ""
      );

    return icon;
  };

  searchVarietyReport = e => {
    e.preventDefault();

    const { filterVarietyBlock, varietyCreated } = this.state;
    this.handlePreloaderStyle("d-block");
    this.props.fetchVarietyReport(filterVarietyBlock, varietyCreated);
  };

  closeSearchVarietyReport = () => {
    this.setState({
      filterVarietyBlock: "",
      varietyCreated: ""
    });
    this.props.fetchVarietyReport("", "");
  };

  render() {
    const {
      preloaderStyle,
      parentBlockList,
      showComponent,
      showEntries,
      farmReportAlert,
      blockReport,
      bedReport,
      display,
      allEntries,
      entryReport,
      blockName,
      entryName,
      bedName,
      bedDates,
      bed_id,
      date,
      printReport,
      prevalence,
      _id,
      allVariety,
      allScoutPersonnel,
      blockDates,
      search_variety,
      search_issue,
      search_scout,
      search_date,
      issueCategory,
      issue,
      sdate,
      edate,
      issueList,
      block,
      allIssueCategory,
      defaultEntryId,
      parentBlock,
      varietyReport,
      filterVarietyBlock,
      varietyCreated,
      variety
    } = this.state;

    // console.log(blockReport);
    // Select Issue
    let IssueList;
    IssueList =
      issueList instanceof Array
        ? issueList.map((issue, index) => (
            <React.Fragment key={index}>
              <option value={issue._id}>{issue.issue_name}</option>
            </React.Fragment>
          ))
        : null;

    // Select IssueCategory
    let IssueCategoryList;
    IssueCategoryList =
      allIssueCategory instanceof Array
        ? allIssueCategory.map((issueCategory, index) => (
            <React.Fragment key={index}>
              <option value={issueCategory._id}>{issueCategory.name}</option>
            </React.Fragment>
          ))
        : null;
    // LEFT PRINT SIDE
    let LeftSide =
      printReport instanceof Array
        ? printReport
            .filter(bed => {
              const BLK = bed.bed_block_name.split(" ");
              return BLK[1].toLowerCase() === "left";
            })
            .map((bed, index) => (
              <div
                className="bed-row d-flex align-items-center ml-n3"
                key={index}
              >
                <div className="bed-no">{bed.bed_number}</div>
                <div className="stations">
                  {bed.stations
                    ? bed.stations.map((station, index) => (
                        <div className="station" key={index}>
                          I{this.getStationIcon(station.alert)}
                        </div>
                      ))
                    : null}
                </div>
                <div className="variety">{bed.variety}</div>
              </div>
            ))
        : null;

    // RIGHTSIDE
    let RightSide =
      printReport instanceof Array
        ? printReport

            .filter(bed => {
              const BLK = bed.bed_block_name.split(" ");
              return BLK[1].toLowerCase() === "right";
            })
            .map((bed, index) => (
              <div
                className="bed-row d-flex align-items-center justify-content-start"
                key={index}
              >
                <div className="bed-no">{bed.bed_number}</div>
                <div className="stations">
                  {bed.stations
                    ? bed.stations.map((station, index) => (
                        <div className="station" key={index}>
                          I{this.getStationIcon(station.alert)}
                        </div>
                      ))
                    : null}
                </div>
                <div className="variety">{bed.variety}</div>
              </div>
            ))
        : null;

    const allBeds =
      blockReport instanceof Array
        ? blockReport.map(bed => (
            <React.Fragment key={bed.bed_id}>
              <div
                onClick={() => {
                  this.onBedClick(bed.bed_id, "", "", "", "", "");
                }}
                className={
                  bed.alert === "Danger"
                    ? "bed d-flex align-items-center justify-content-center bg-danger glow"
                    : bed.alert === "Warning"
                    ? "bed d-flex align-items-center justify-content-center bg-warning"
                    : bed.alert === "Default"
                    ? "bed d-flex align-items-center justify-content-center bg-default"
                    : "bed d-flex align-items-center justify-content-center bg-success"
                }
              >
                {bed.bed_number}
              </div>
            </React.Fragment>
          ))
        : null;

    const selectVaraities =
      allVariety instanceof Array
        ? allVariety.map((variety, index) => (
            <React.Fragment key={index}>
              <option value={variety._id}>{variety.name}</option>
            </React.Fragment>
          ))
        : null;

    const selectPersonnel =
      allScoutPersonnel instanceof Array
        ? allScoutPersonnel.map((personnel, index) => (
            <React.Fragment key={index}>
              <option value={personnel._id}>
                {personnel.first_name} {personnel.last_name}
              </option>
            </React.Fragment>
          ))
        : null;

    let ScoutName = "";
    let VarietyName = "";

    const selectBlockDate =
      blockDates instanceof Array
        ? blockDates.map((date, index) => (
            <React.Fragment key={index}>
              <option>{moment(date).format("DD/MM/YYYY")}</option>
            </React.Fragment>
          ))
        : null;
    return (
      <div data-test="DashboardLayoutComponent">
        <Preloader
          preloaderStyle={preloaderStyle}
          data-test="PreloaderComponent"
        />
        <div className="farm-view" data-test="FarmViewComponent">
          {showEntries ? (
            <React.Fragment>
              <DashboardNav
                data-test="DashboardNavComponent"
                reportTitle={bedName}
                otherProps={
                  <Link to="/dashboard" onClick={this.backToBlockView}>
                    <i className="fas fa-arrow-left" />
                  </Link>
                }
              />
              <Entries
                data-test="DashboardComponent"
                bedReport={bedReport}
                onEntryClick={this.onEntryClick}
                allEntries={allEntries}
                entryReport={entryReport}
                entryName={entryName}
                bedDates={bedDates}
                bed_id={bed_id}
                date={date}
                onBedFilter={this.onBedFilter}
                onChange={this.onChange}
                search_date={search_date}
                defaultEntryId={defaultEntryId}
              />
            </React.Fragment>
          ) : showComponent ? (
            <React.Fragment>
              <DashboardNav
                data-test="DashboardNavComponent"
                reportTitle={blockName}
                otherProps={
                  <Link to="/dashboard" onClick={this.backToFarmView}>
                    <i className="fas fa-arrow-left" />
                  </Link>
                }
              />
              <SingleBlockView
                data-test="DashboardComponent"
                allBeds={allBeds}
                display={display}
                LeftSide={LeftSide}
                RightSide={RightSide}
                _id={_id}
                onBlockClick={this.onBlockClick}
                selectVaraities={selectVaraities}
                selectPersonnel={selectPersonnel}
                selectBlockDate={selectBlockDate}
                onChange={this.onChange}
                handleSearch={this.handleSearch}
                handleCloseSearch={this.handleCloseSearch}
                search_variety={search_variety}
                search_issue={search_issue}
                search_scout={search_scout}
                search_date={search_date}
                blockName={blockName}
                ScoutName={ScoutName}
                VarietyName={VarietyName}
                defaultEntryId={defaultEntryId}
                IssueList={IssueList}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <DashboardNav
                reportTitle="Farm View"
                data-test="DashboardNavComponent"
              />
              <FarmView
                data-test="DashboardComponent"
                handlePreloaderStyle={this.handlePreloaderStyle}
                parentBlockList={parentBlockList}
                farmReportAlert={farmReportAlert}
                onBlockClick={this.onBlockClick}
                issueCategory={issueCategory}
                issue={issue}
                sdate={sdate}
                edate={edate}
                block={block}
                variety={variety}
                IssueList={IssueList}
                prevalence={prevalence}
                IssueCategoryList={IssueCategoryList}
                handleSearchPrevalence={this.handleSearchPrevalence}
                handleCloseSearchPrevalence={this.handleCloseSearchPrevalence}
                parentBlock={parentBlock}
                onChange={this.onChange}
                varietyReport={varietyReport}
                filterVarietyBlock={filterVarietyBlock}
                varietyCreated={varietyCreated}
                searchVarietyReport={this.searchVarietyReport}
                closeSearchVarietyReport={this.closeSearchVarietyReport}
                selectVaraities={selectVaraities}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

DashboardLayout.propTypes = {
  bedList: PropTypes.array.isRequired,
  farmReportAlert: PropTypes.array.isRequired,
  blockReport: PropTypes.object.isRequired,
  fetchBlockReport: PropTypes.func.isRequired,
  bedDates: PropTypes.array.isRequired,
  fetchPrevalence: PropTypes.func.isRequired,
  bedReport: PropTypes.array,
  bedName: PropTypes.string,
  bedNumber: PropTypes.number,
  bed_id: PropTypes.string,
  varietyReport: PropTypes.array
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  bedList: state.plant.bedList,
  farmReportAlert: state.scout.farmReportAlert,
  blockReport: state.scout.blockReport,
  //   bedReport: state.scout.bedReport,
  parentBlockList: state.block.parentBlockList,
  entryReport: state.scout.entryReport,
  allEntries: state.scout.allEntries,
  bedDates: state.scout.bedDates,
  printReport: state.scout.printReport,
  prevalence: state.scout.prevalence,
  allVariety: state.scout.allVariety,
  allScoutPersonnel: state.personnel.allScoutPersonnel,
  blockDates: state.scout.blockDates.dates,
  issueList: state.issueCategory.issueList,
  allIssueCategory: state.issueCategory.allIssueCategory,
  bedReport: state.scout.bedReport.bedArray,
  bedName: state.scout.bedReport.bed_name,
  bedNumber: state.scout.bedReport.bed_number,
  bed_id: state.scout.bedReport.fetchedBedId,
  varietyReport: state.scout.varietyReport
});

export default connect(mapStateToProps, {
  fetchBlock,
  fetchParentBlock,
  fetchBed,
  farmReport,
  fetchBlockReport,
  fetchBedReport,
  fetchEntryReport,
  fetchAllEntries,
  fetchBedDate,
  fetchPrintReport,
  fetchPrevalence,
  fetchAllVariety,
  fetchAllPersonnel,
  fetchAllBlockDates,
  fetchIssue,
  fetchAllIssueCategory,
  fetchVarietyReport
})(DashboardLayout);
