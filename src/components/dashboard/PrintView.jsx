import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

class PrintView extends Component {
  render() {
    const {
      LeftSide,
      RightSide,
      blockName,
      search_date,
      ScoutName,
      VarietyName
    } = this.props;
    return (
      <div className="col-md-12 print-block" data-test="PrintViewComponent">
        <h5 className="blockTitle">
          {blockName} {moment(search_date).format("ll")}
          {VarietyName && ", " + VarietyName}
          {ScoutName && ", Scouted by " + ScoutName}
        </h5>
        <div className="d-flex flex-wrap">
          <div className="col-md-6">{LeftSide}</div>
          <div className="col-md-6">{RightSide}</div>
        </div>
      </div>
    );
  }
}

PrintView.propTypes = {
  LeftSide: PropTypes.array.isRequired,
  RightSide: PropTypes.array.isRequired
};
export default PrintView;
