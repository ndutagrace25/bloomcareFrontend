import React from "react";
import PropTypes from "prop-types";

const Button = ({
    type,
    value,
    className,
    onClick,
    dataToggle,
    dataTarget,
    dataDismiss,
    otherProps
}) => {
    return (
        <button
            data-test="ButtonComponent"
            type={type}
            className={className}
            onClick={onClick}
            data-toggle={dataToggle}
            data-target={dataTarget}
            data-dismiss={dataDismiss}
        >
            {otherProps}
            {value}
        </button>
    );
};

Button.propTypes = {
    value: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

export default Button;
