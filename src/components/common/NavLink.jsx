import React from "react";
import PropTypes from "prop-types";
import HyperLink from "./HyperLink";

const NavLink = ({ name, to }) => {
  return (
    <li className="nav-item" data-test="NavLinkComponent">
      <HyperLink className="nav-link" to={to} name={name} />
    </li>
  );
};

NavLink.propTypes = {
  name: PropTypes.string.isRequired,
  to: PropTypes.string
};

export default NavLink;
