import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HyperLink = ({ name, to, className, onClick }) => {
  return (
    <Link
      className={className}
      to={to}
      onClick={onClick}
      data-test="HyperLinkComponent"
    >
      {name}
    </Link>
  );
};

HyperLink.propTypes = {
  name: PropTypes.string,
  to: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default HyperLink;
