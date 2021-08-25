import React from "react";

const Table = ({ tableHead, tableBody }) => {
  return (
    <div className="table-responsive" data-test="TableComponent">
      <table className="table table-sm table-hover">
        <thead className="bg-primary text-white">{tableHead}</thead>
        <tbody>{tableBody}</tbody>
      </table>
    </div>
  );
};

export default Table;
