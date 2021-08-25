import React from "react";

const Card = ({ cardBody }) => {
  return (
    <div className="container-fluid d-flex flex-row flex-wrap" data-test="CardComponent">{cardBody}</div>
  );
};

export default Card;
