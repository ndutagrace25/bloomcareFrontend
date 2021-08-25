import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import "moment-duration-format";

import { fetchTimeReport } from "../../actions/scoutActions";
import { fetchParentBlock } from "../../actions/blockActions";
import { TimeReportList, SearchTimeReport } from ".";
import {
  NewNavBar,
  //   Error,
  Preloader,
  ContentContainer,
  TableWrap,
  ExportButton,
  Pagination,
  NewTableContainer
} from "../common";

class TimeReportLayout extends Component {
  state = {
    page: 0,
    limit: 10,
    count: 0,
    preloaderStyle: "d-none",
    timeReport: [],
    date: "",
    block: "",
    parentBlockList: []
  };

  handlePreloaderStyle = newStyle => {
    this.setState({ preloaderStyle: newStyle });
  };

  fetchTimeReport = () => {
    const { date, block } = this.state;
    this.handlePreloaderStyle("d-block");
    this.props.fetchTimeReport(date, block);
  };

  componentDidMount() {
    this.fetchTimeReport();
    this.props.fetchParentBlock();
  }

  componentWillReceiveProps(nextProps) {
    this.handlePreloaderStyle("d-none");
    if (nextProps.timeReport) {
      this.setState({
        timeReport: nextProps.timeReport
      });
    }
    if (nextProps.parentBlockList) {
      this.setState({
        parentBlockList: nextProps.parentBlockList
      });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { block, date } = this.state;

    this.fetchTimeReport(block, date);
  };

  handleCloseSearch = () => {
    this.setState({
      block: "",
      date: ""
    });
    // const { page, limit } = this.state;
    this.fetchTimeReport("", "");
  };
  render() {
    const {
      page,
      limit,
      count,
      preloaderStyle,
      timeReport,
      block,
      date,
      parentBlockList
    } = this.state;

    const exportTimeReport = timeReport.map(time => {
      const data = {
        Scout_Name: time.personnel_name,
        Average_Block_Time: moment
          .duration(time.average_block_time, "minutes")
          .format("H[ hrs ]mm[ min]"),
        Scouted_Blocks: time.scouted_blocks,
        Average_Bed_Time: moment
          .duration(time.average_bed_time, "minutes")
          .format("H[ hrs ]mm[ min]"),
        Scouted_beds: time.scouted_beds,
        Total_Beds: time.total_beds,
        Average_Station_Time: moment
          .duration(time.average_station_time, "minutes")
          .format("H[ hrs ]mm[ min]"),
        Scouted_Stations: time.scouted_stations,
        Total_Stations: time.total_stations
      };
      return data;
    });
    return (
      <div className="components-view" data-test="TimeReportLayoutComponent">
        <Preloader
          preloaderStyle={preloaderStyle}
          data-test="PreloaderComponent"
        />
        <NewNavBar data-test="NavbarComponent" label="SCOUTING TIME REPORT" />
        <div className="d-flex col-md-12 px-0">
          <ContentContainer
            data-test="ContainerComponent"
            content={
              <React.Fragment>
                <div className="d-flex col-md-8 flex-column pl-0">
                  <div className="d-flex justify-content-between p-3 mt-3 bg-white">
                    <h4>Time Report</h4>
                    <ExportButton
                      data-test="ExportButtonComponent"
                      data={exportTimeReport}
                      filename={
                        moment().format("DD/MM/YYYY H:mm:ss") +
                        " TimeReport.csv"
                      }
                    />
                  </div>
                  <TimeReportList
                    data-test="EntryListComponent"
                    timeReport={timeReport}
                    //   errors={entryError}
                    handlePreloaderStyle={this.handlePreloaderStyle}
                  />
                  {count > 10 ? (
                    <Pagination
                      data-test="PaginationComponent"
                      page={page}
                      limit={limit}
                      count={count}
                    />
                  ) : (
                    ""
                  )}
                </div>

                {/* <TableWrap
                  data-test="TableWrapComponent"
                  tableTitle="Scout Time Report"
                  exportButton={
                    <ExportButton
                      data-test="ExportButtonComponent"
                      data={exportTimeReport}
                      filename={
                        moment().format("DD/MM/YYYY H:mm:ss") +
                        " TimeReport.csv"
                      }
                    />
                  }
                  tableContent={
                    <React.Fragment>
                      {" "}
                      <TimeReportList
                        data-test="EntryListComponent"
                        timeReport={timeReport}
                        //   errors={entryError}
                        handlePreloaderStyle={this.handlePreloaderStyle}
                      />
                      {count > 10 ? (
                        <Pagination
                          data-test="PaginationComponent"
                          page={page}
                          limit={limit}
                          count={count}
                        />
                      ) : (
                        ""
                      )}
                    </React.Fragment>
                  }
                /> */}
                <SearchTimeReport
                  data-test="SearchTimeReportComponent"
                  onChange={this.onChange}
                  onChangeNumber={this.onChangeNumber}
                  handleSearch={this.handleSearch}
                  handleCloseSearch={this.handleCloseSearch}
                  block={block}
                  date={date}
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

const mapStateToProps = state => ({
  timeReport: state.scout.timeReport,
  parentBlockList: state.block.parentBlockList
});

export default connect(mapStateToProps, { fetchTimeReport, fetchParentBlock })(
  TimeReportLayout
);
