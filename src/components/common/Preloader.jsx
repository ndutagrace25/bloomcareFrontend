import React from "react";
import PropTypes from 'prop-types';

const Preloader = style => {
  return (
    <div className={style.preloaderStyle} data-test="PreloaderComponent">
      <div className="preloader">
        <div className="item-1" />
        <div className="item-2" />
        <div className="item-3" />
        <div className="item-4" />
        <div className="item-5" />
      </div>
    </div>
  );
}; 

Preloader.propTypes = {
    style: PropTypes.string
}

export default Preloader;
