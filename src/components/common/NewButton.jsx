import React from "react";

const NewButton = props => {
  return (
    <button
      type="button"
      className={props.className}
      data-toggle={props.dataToggle}
      data-target={props.dataTarget}
      onClick={props.onClick}
    >
      {props.otherProperties}
      {props.label}
    </button>
  );
};

export default NewButton;
