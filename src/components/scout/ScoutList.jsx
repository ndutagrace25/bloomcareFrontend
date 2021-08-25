import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import { Table } from "../common";

class ScoutList extends Component {
  render() {
    const { scout } = this.props;
    let { scoutCount } = this.props;
    let allScoutsTableData;

    // if (errors.length > 0) {
    //   JSON.stringify(Swal.fire({ type: "error", title: "Oops! " + errors }));
    // }

    if (typeof scout !== "undefined") {
      //   console.log(scout);
      allScoutsTableData =
        scout instanceof Array
          ? scout.map(scout => (
              <tr key={scout._id}>
                <td style={{ width: "10px" }}>{scoutCount++}</td>
                <td>
                  {scout.created_by === null ? '' : scout.created_by.first_name+''+scout.created_by.last_name}
                  {/* {scout.created_by.first_name} {scout.created_by.last_name} */}
                </td>
                <td>{moment(scout.date).format("DD/MM/YYYY")}</td>
                <td>{scout.plant.bed.block.parent.name}</td>
                <td>{scout.plant.bed.bed_name}</td>
                <td>{scout.plant.variety.name}</td>
                <td>{scout.entry.name}</td>
                <td>{scout.point.name}</td>
                <td>{scout.issue.score.name}</td>
                {/* <td>{scout.tolerance === null ? "" : scout.tolerance.name}</td> */}
                {/* <td>
                {typeof scout.issueCategory.name === "undefined"
                  ? ""
                  : 'getting there'}
              </td> */}
                <td>{scout.issue.issue_name}</td>
                <td>{scout.issue.tolerance_type.name}</td>
                <td>{scout.value}</td>
              </tr>
            ))
          : null;
    }

    return (
      <React.Fragment>
        <Table
          tableHead={
            <tr>
              <th>#</th>
              <th>Personnel Name</th>
              <th>Scouting Date</th>
              <th>Block</th>
              <th>Bed</th>
              <th>Variety</th>
              <th>Entry</th>
              <th>Point</th>
              <th>Score</th>
              {/* <th>Tolerance</th> */}
              {/* <th>Longitude</th>
              <th>Latitude</th> */}
              {/* <th>Issue Category</th> */}
              <th>Issue Name</th>
              <th>Tolerance Type</th>
              <th>Value</th>
            </tr>
          }
          tableBody={allScoutsTableData}
        />
      </React.Fragment>
    );
  }
}

ScoutList.propTypes = {
  handlePreloaderStyle: PropTypes.func.isRequired,
  scout: PropTypes.array.isRequired
};

export default ScoutList;
