import React from "react";
import PropTypes from "prop-types";

const Error = ({ message }) => {
  if (message !== "") {
    return (
      <div
        className="alert alert-danger alert-dismissible fade show"
        role="alert"
        data-test="ErrorComponent"
      >
        {message}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  } else {
    return null;
  }
};

Error.propTypes = {
  message: PropTypes.string.isRequired
};

export default Error;
