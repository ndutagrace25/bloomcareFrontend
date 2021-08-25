import React, { Component } from "react";
import { NewNavBar, DashboardSummaryMenu } from "../common";

class VarietyReport extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NewNavBar label="VARIETY REPORT" />
        <DashboardSummaryMenu
          breadCrumb={
            <React.Fragment>
              <li className="breadcrumb-item">
                <button className=" text-decoration-none">
                  Home
                </button>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Variety
              </li>
            </React.Fragment>
          }
        />
        <form className="col-md-8 mb-2 bg-white d-flex mx-auto flex-nowrap align-items-center justify-content-between p-2 form-inline">
          <div className="form-group">
            <label for="input1">Filter by Variety</label>
            <input
              type="text"
              className="form-control form-control-sm ml-2"
              id="input1"
              placeholder="Search for variety..."
            />
          </div>

          <div className="form-group">
            <label for="input3">Filter by Date</label>
            <input
              type="date"
              className="form-control form-control-sm ml-2"
              id="input3"
            />
          </div>

          <div className="form-group">
            <label for="selectInput3">Filter by Block</label>
            <select
              className="form-control form-control-sm ml-2"
              id="selectInput3"
            >
              <option>All Blocks</option>
              <option>Block1</option>
              <option>Block2</option>
              <option>Block3</option>
              <option>Block4</option>
            </select>
          </div>
        </form>
        <section className="col-md-12 mb-2 d-flex flex-wrap">
          <div className="mr-4 mb-4 p-1 d-flex flex-column block-danger">
            <p className="text-white text-center text-nowrap p-3 mb-2">variety 1</p>
            <span className="text-nowrap mb-2 ml-2 b-success">Pests</span>
            <span className="text-nowrap mb-2 ml-2 b-warning">Diseases</span>
            <span className="text-nowrap mb-2 ml-2 b-danger">Beneficials</span>
            <span className="text-nowrap mb-2 ml-2 b-noData">Others</span>
          </div>
          <div className="mr-4 mb-4 p-1 d-flex flex-column block-warning">
            <p className="text-white text-center text-nowrap p-3 mb-2">variety 2</p>
            <span className="text-nowrap mb-2 ml-2 b-success">Pests</span>
            <span className="text-nowrap mb-2 ml-2 b-warning">Diseases</span>
            <span className="text-nowrap mb-2 ml-2 b-danger">Beneficials</span>
            <span className="text-nowrap mb-2 ml-2 b-noData">Others</span>
          </div>
          <div className="mr-4 mb-4 p-1 d-flex flex-column block-success">
            <p className="text-white text-center text-nowrap p-3 mb-2">variety 3</p>
            <span className="text-nowrap mb-2 ml-2 b-success">Pests</span>
            <span className="text-nowrap mb-2 ml-2 b-warning">Diseases</span>
            <span className="text-nowrap mb-2 ml-2 b-danger">Beneficials</span>
            <span className="text-nowrap mb-2 ml-2 b-noData">Others</span>
          </div>
          <div className="mr-4 mb-4 p-1 d-flex flex-column block-danger">
            <p className="text-white text-center text-nowrap p-3 mb-2">block 2</p>
            <span className="text-nowrap mb-2 ml-2 b-success">Pests</span>
            <span className="text-nowrap mb-2 ml-2 b-warning">Diseases</span>
            <span className="text-nowrap mb-2 ml-2 b-danger">Beneficials</span>
            <span className="text-nowrap mb-2 ml-2 b-noData">Others</span>
          </div>
          <div className="mr-4 mb-4 p-1 d-flex flex-column block-warning">
            <p className="text-white text-center text-nowrap p-3 mb-2">block 3</p>
            <span className="text-nowrap mb-2 ml-2 b-success">Pests</span>
            <span className="text-nowrap mb-2 ml-2 b-warning">Diseases</span>
            <span className="text-nowrap mb-2 ml-2 b-danger">Beneficials</span>
            <span className="text-nowrap mb-2 ml-2 b-noData">Others</span>
          </div>
          <div className="mr-4 mb-4 p-1 d-flex flex-column block-noData">
            <p className="text-white text-center text-nowrap p-3 mb-2">block 4</p>
            <span className="text-nowrap mb-2 ml-2 b-success">Pests</span>
            <span className="text-nowrap mb-2 ml-2 b-warning">Diseases</span>
            <span className="text-nowrap mb-2 ml-2 b-danger">Beneficials</span>
            <span className="text-nowrap mb-2 ml-2 b-noData">Others</span>
          </div>
          <div className="mr-4 mb-4 p-1 d-flex flex-column block-success">
            <p className="text-white text-center text-nowrap p-3 mb-2">block 5</p>
            <span className="text-nowrap mb-2 ml-2 b-success">Pests</span>
            <span className="text-nowrap mb-2 ml-2 b-warning">Diseases</span>
            <span className="text-nowrap mb-2 ml-2 b-danger">Beneficials</span>
            <span className="text-nowrap mb-2 ml-2 b-noData">Others</span>
          </div>
          <div className="mr-4 mb-4 p-1 d-flex flex-column block-danger">
            <p className="text-white text-center text-nowrap p-3 mb-2">block 6</p>
            <span className="text-nowrap mb-2 ml-2 b-success">Pests</span>
            <span className="text-nowrap mb-2 ml-2 b-warning">Diseases</span>
            <span className="text-nowrap mb-2 ml-2 b-danger">Beneficials</span>
            <span className="text-nowrap mb-2 ml-2 b-noData">Others</span>
          </div>
          <div className="mr-4 mb-4 p-1 d-flex flex-column block-warning">
            <p className="text-white text-center text-nowrap p-3 mb-2">block 7</p>
            <span className="text-nowrap mb-2 ml-2 b-success">Pests</span>
            <span className="text-nowrap mb-2 ml-2 b-warning">Diseases</span>
            <span className="text-nowrap mb-2 ml-2 b-danger">Beneficials</span>
            <span className="text-nowrap mb-2 ml-2 b-noData">Others</span>
          </div>
          <div className="mr-4 mb-4 p-1 d-flex flex-column block-noData">
            <p className="text-white text-center text-nowrap p-3 mb-2">block 8</p>
            <span className="text-nowrap mb-2 ml-2 b-success">Pests</span>
            <span className="text-nowrap mb-2 ml-2 b-warning">Diseases</span>
            <span className="text-nowrap mb-2 ml-2 b-danger">Beneficials</span>
            <span className="text-nowrap mb-2 ml-2 b-noData">Others</span>
          </div>
          <div className="mr-4 mb-4 p-1 d-flex flex-column block-success">
            <p className="text-white text-center text-nowrap p-3 mb-2">block 5</p>
            <span className="text-nowrap mb-2 ml-2 b-success">Pests</span>
            <span className="text-nowrap mb-2 ml-2 b-warning">Diseases</span>
            <span className="text-nowrap mb-2 ml-2 b-danger">Beneficials</span>
            <span className="text-nowrap mb-2 ml-2 b-noData">Others</span>
          </div>
          <div className="mr-4 mb-4 p-1 d-flex flex-column block-danger">
            <p className="text-white text-center text-nowrap p-3 mb-2">block 6</p>
            <span className="text-nowrap mb-2 ml-2 b-success">Pests</span>
            <span className="text-nowrap mb-2 ml-2 b-warning">Diseases</span>
            <span className="text-nowrap mb-2 ml-2 b-danger">Beneficials</span>
            <span className="text-nowrap mb-2 ml-2 b-noData">Others</span>
          </div>
          <div className="mr-4 mb-4 p-1 d-flex flex-column block-warning">
            <p className="text-white text-center text-nowrap p-3 mb-2">block 7</p>
            <span className="text-nowrap mb-2 ml-2 b-success">Pests</span>
            <span className="text-nowrap mb-2 ml-2 b-warning">Diseases</span>
            <span className="text-nowrap mb-2 ml-2 b-danger">Beneficials</span>
            <span className="text-nowrap mb-2 ml-2 b-noData">Others</span>
          </div>
          <div className="mr-4 mb-4 p-1 d-flex flex-column block-noData">
            <p className="text-white text-center text-nowrap p-3 mb-2">block 8</p>
            <span className="text-nowrap mb-2 ml-2 b-success">Pests</span>
            <span className="text-nowrap mb-2 ml-2 b-warning">Diseases</span>
            <span className="text-nowrap mb-2 ml-2 b-danger">Beneficials</span>
            <span className="text-nowrap mb-2 ml-2 b-noData">Others</span>
          </div>
          <div className="mr-4 mb-4 p-1 d-flex flex-column block-success">
            <p className="text-white text-center text-nowrap p-3 mb-2">block 5</p>
            <span className="text-nowrap mb-2 ml-2 b-success">Pests</span>
            <span className="text-nowrap mb-2 ml-2 b-warning">Diseases</span>
            <span className="text-nowrap mb-2 ml-2 b-danger">Beneficials</span>
            <span className="text-nowrap mb-2 ml-2 b-noData">Others</span>
          </div>
          <div className="mr-4 mb-4 p-1 d-flex flex-column block-noData">
            <p className="text-white text-center text-nowrap p-3 mb-2">block 8</p>
            <span className="text-nowrap mb-2 ml-2 b-success">Pests</span>
            <span className="text-nowrap mb-2 ml-2 b-warning">Diseases</span>
            <span className="text-nowrap mb-2 ml-2 b-danger">Beneficials</span>
            <span className="text-nowrap mb-2 ml-2 b-noData">Others</span>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default VarietyReport;
