import React from "react";
import { CSVLink } from "react-csv";
import PropTypes from "prop-types";

const ExportButton = ({ data, filename }) => {
  return (
    <CSVLink
      data={data}
      filename={filename}
      className="btn btn-success rounded-0 d-flex flex-nowrap align-items-center"
      target="_blank"
    >
      <img
        src={require("../../assets/img/print-icon.svg")}
        height="20"
        alt="add_bed"
        className="mr-sm-1"
      />
      Export
    </CSVLink>
  );
};
ExportButton.propTypes = {
  data: PropTypes.array.isRequired,
  filename: PropTypes.string.isRequired
};

export default ExportButton;
