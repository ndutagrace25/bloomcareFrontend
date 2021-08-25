import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const LoginTextFieldGroup = ({
  name,
  id,
  placeholder,
  value,
  error,
  type,
  onChange,
  icon,
  style
}) => {
  return (
    <div className="input-group mb-3" data-test="LoginTextFieldGroupComponent">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} aria-hidden="true" />
        </span>
      </div>
      <input
        type={type}
        onChange={onChange}
        name={name}
        id={id}
        value={value}
        className={classnames("form-control", {
          "is-invalid": error
        })}
        placeholder={placeholder} 
        style={style}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

LoginTextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired
};

export default LoginTextFieldGroup;
