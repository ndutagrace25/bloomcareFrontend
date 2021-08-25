import React, { Component } from "react";
// import PropTypes from "prop-types";
import moment from "moment";
import "moment-duration-format";

import { Table, NewTable } from "../common";

class TimeReportList extends Component {
  render() {
    const { timeReport } = this.props;
    console.log(timeReport);
    let timeReportData;
    let count = 1;

    let time = moment.duration(160, "minutes").format("HH:mm");
    console.log(time);

    timeReportData =
      timeReport instanceof Array
        ? timeReport.map((time, index) => (
            <tr key={index}>
              <td style={{ width: "10px" }}>{count++}</td>
              <td>{time.personnel_name}</td>
              <td>
                {time.average_block_time !== "" &&
                  moment
                    .duration(time.average_block_time, "minutes")
                    .format("H[ hrs ]mm[ min]")}
              </td>
              <td>{time.scouted_blocks}</td>
              <td>
                {time.average_bed_time !== "" &&
                  moment
                    .duration(time.average_bed_time, "minutes")
                    .format("H[ hrs ]mm[ min]")}
              </td>
              <td>{time.scouted_beds}</td>
              <td>{time.total_beds}</td>
              <td>
                {time.average_station_time !== "" &&
                  moment
                    .duration(time.average_station_time, "minutes")
                    .format("H[ hrs ]mm[ min]")}
              </td>
              <td>{time.scouted_stations}</td>
              <td>{time.total_stations}</td>
            </tr>
          ))
        : null;

    return (
      <React.Fragment>
        <NewTable
          tableHead={
            <tr>
              <th>#</th>
              <th>Scout Name</th>
              <th>Average Block Time</th>
              <th>Scouted Blocks</th>
              <th>Average Bed Time</th>
              <th>Scouted Beds</th>
              <th>Total No. Beds</th>
              <th>Average Station Time</th>
              <th>Scouted Stations</th>
              <th>Total No. Stations</th>
            </tr>
          }
          tableBody={timeReportData}
        />
      </React.Fragment>
    );
  }
}

// TimeReportList.propTypes = {
//   updateEntry: PropTypes.func.isRequired,
//   handlePreloaderStyle: PropTypes.func.isRequired,
//   deleteEntry: PropTypes.func.isRequired,
//   entry: PropTypes.object.isRequired
// };

export default TimeReportList;
