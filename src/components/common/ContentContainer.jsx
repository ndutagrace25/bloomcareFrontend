import React from "react";
const ContentContainer = ({ content }) => {
  return <div className="container-fluid d-flex flex-row flex-wrap" data-test="ContentContainerComponent">{content}</div>;
};

export default ContentContainer;
