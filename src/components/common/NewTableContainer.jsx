import React from "react";

const NewTableContainer = (props) => {
  return (
    <div className="main col-md-10">
      <div className="d-flex flex-row justify-content-between my-2">
        {props.buttonContainer}
      </div>
      {props.tableContent}
    </div>
  );
};

export default NewTableContainer;
