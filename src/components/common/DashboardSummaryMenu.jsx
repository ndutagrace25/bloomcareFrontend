import React from "react";

const DashboardSummaryMenu = (props) => {
  return (
    <section className="col-md-12 my-2">
      <nav aria-label="breadcrumb" className="position-absolute t-7">
        <ol className="breadcrumb rounded-0">
            {props.breadCrumb}
        </ol>
      </nav>

      <div className="d-flex mx-auto flex-row flex-nowrap justify-content-around indicators">
        <div className="text-success">OKAY</div>
        <div className="text-warning">WARNING</div>
        <div className="text-danger">DANGER</div>
        <div className="text-muted">NO DATA</div>
      </div>
    </section>
  );
};

export default DashboardSummaryMenu;
