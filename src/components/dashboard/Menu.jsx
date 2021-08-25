import React from "react";

const Menu = () => {
  return (
    <div className="d-flex justify-content-center" data-test="MenuComponent">
      <div className="menu">
        <div className="indicators d-flex flex-row justify-content-center">
          <div className="menu-okay text-success">OKAY</div>
          <div className="menu-warning text-warning">WARNING</div>
          <div className="menu-danger text-danger">DANGER</div>
          <div className="menu-muted text-muted">NO DATA</div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
