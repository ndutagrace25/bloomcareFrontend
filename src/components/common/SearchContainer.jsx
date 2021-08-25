import React from "react";

const SearchContainer = ({ searchForm }) => {
  return (
    <div className="col-md-4 mt-3 mb-3" data-test="SearchContainerComponent">
      <div className="card p-3">
        <h5 className="card-title">Search</h5>
        {searchForm}
      </div>
    </div>
  );
};

export default SearchContainer;
