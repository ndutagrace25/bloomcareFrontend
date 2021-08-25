import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { NewTable } from "../common";

class NewScoutList extends Component {
  state = {};
  render() {
    const { scout } = this.props;
    let { scoutCount } = this.props;
    let allScoutsTableData;

    console.log(scout);

    if (typeof scout !== "undefined") {
      //   console.log(scout);
      allScoutsTableData =
        scout instanceof Array
          ? scout.map((scout, index) => (
              <tr key={index}>
                <td style={{ width: "10px" }}>{scoutCount++}</td>
                <td>
                  {scout.personnel_first_name === null
                    ? ""
                    : scout.personnel_first_name +
                      "" +
                      scout.personnel_last_name}
                  {/* {scout.created_by.first_name} {scout.created_by.last_name} */}
                </td>
                <td>{moment(scout.date).format("DD/MM/YYYY")}</td>
                <td>{scout.plant.bed.block.parent.name}</td>
                <td>{scout.plant.bed.bed_name}</td>
                <td>{scout.plant.variety.name}</td>
                <td>{scout.entry.name}</td>
                <td>{scout.point.name}</td>
                {/* <td>{scout.issue.score.name}</td> */}
                {/* <td>{scout.tolerance === null ? "" : scout.tolerance.name}</td> */}
                {/* <td>
                      {typeof scout.issueCategory.name === "undefined"
                        ? ""
                        : 'getting there'}
                    </td> */}
                {/* <td>{scout.issue.issue_name}</td> */}
                {/* <td>{scout.issue.tolerance_type.name}</td> */}
                {/* <td>{scout.value}</td> */}
              </tr>
            ))
          : null;
    }

    return (
      <React.Fragment>
        <NewTable
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

NewScoutList.propTypes = {
  handlePreloaderStyle: PropTypes.func.isRequired,
  scout: PropTypes.array.isRequired
};

export default NewScoutList;
