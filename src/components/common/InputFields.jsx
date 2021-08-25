import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const InputFields = ({
  value,
  name,
  type,
  onChange,
  error,
  label,
  otherProps
}) => {
  return (
    <div className="form-group" data-test="InputFieldsComponent">
      {otherProps}
      <label htmlFor="input1">{label}</label>
      <input
        type={type}
        className={classnames("form-control", {
          "is-invalid": error
        })}
        placeholder={label}
        onChange={onChange}
        name={name}
        value={value}
        // style={{ fontSize: "14px" }}
        autoComplete="off"
      />
      {error && <small className="form-text text-danger">{error}</small>}
    </div>
  );
};

InputFields.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string
};

export default InputFields;
