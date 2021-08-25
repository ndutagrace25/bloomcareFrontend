import React from "react";
import PropTypes from "prop-types";

const TableWrap = ({
  tableTitle,
  createButton,
  exportButton,
  tableContent
}) => {
  return (
    <div className="col-md-8 mt-3" data-test="TableWrapComponent">
      <div className="card p-3">
        <h5>{tableTitle}</h5>
        <div className="d-flex align-items-center justify-content-between mb-1 flex-wrap">
          <div className="d-flex">{createButton}</div>
          {exportButton}
        </div>
        {tableContent}
      </div>
    </div>
  );
};

TableWrap.propTypes = {
  tableTitle: PropTypes.string,
};

export default TableWrap;
