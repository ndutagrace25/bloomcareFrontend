import React, { Component } from "react";

class NewFilter extends Component {
  state = {};
  render() {
    return (
      <div className="tab-content px-n15 w-100" id="v-pills-tabContent">
        <div
          className="tab-pane fade show active col-md-12 px-n15"
          id="v-pills-home"
          role="tabpanel"
          aria-labelledby="v-pills-home-tab"
        >
          <div className="d-flex">
            <div className="d-flex flex-column mt-2 col-sm-2 border-right">
              <h5 className="mb-2">FILTER BY</h5>
              <form action="" className="mb-2">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="enter bed no"
                />
              </form>

              <div className="overflow-auto">
                <form action="" className="mb-2">
                  <h6>Block:</h6>
                  <div>
                    <input type="radio" id="test1" name="radio-group" checked />
                    <label for="test1">Block 1</label>
                  </div>
                  <div>
                    <input type="radio" id="test2" name="radio-group" />
                    <label for="test2">Block 2</label>
                  </div>
                  <div>
                    <input type="radio" id="test3" name="radio-group" />
                    <label for="test3">Block 3</label>
                  </div>
                </form>

                <form action="" className="mb-2">
                  <h6>Variety:</h6>
                  <div>
                    <input
                      className="styled-checkbox"
                      id="styled-checkbox-1"
                      type="checkbox"
                      value="value1"
                    />
                    <label for="styled-checkbox-1">Lemon Pom Pom</label>
                  </div>
                  <div>
                    <input
                      className="styled-checkbox"
                      id="styled-checkbox-2"
                      type="checkbox"
                      value="value2"
                      checked
                    />
                    <label for="styled-checkbox-2">English Rose</label>
                  </div>
                  <div>
                    <input
                      className="styled-checkbox"
                      id="styled-checkbox-4"
                      type="checkbox"
                      value="value4"
                    />
                    <label for="styled-checkbox-4">Fourth option</label>
                  </div>
                </form>
              </div>
            </div>
            <div className="main col-md-10">
              <div className="d-flex flex-row justify-content-between my-2">
                <button
                  type="button"
                  className="btn btn-primary rounded-0 d-flex flex-nowrap align-items-center"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  <img
                    src="assets/img/add-icon.svg"
                    height="20"
                    alt="add_bed"
                    className="mr-sm-1"
                  />
                  Add Bed
                </button>
                <button
                  type="button"
                  className="btn btn-primary rounded-0 d-flex flex-nowrap align-items-center"
                >
                  <img
                    src="assets/img/print-icon.svg"
                    height="20"
                    alt="print"
                    className="mr-sm-1"
                  />
                  Print
                </button>
              </div>
              <div className="table-responsive">
                <table className="table bg-white table-hover table-sm">
                  <thead className="bg-purple text-white">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col" className="w-100p">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td className="d-flex justify-content-between align-items-center">
                        <button
                          type="button"
                          className="btn btn-danger rounded-0 d-flex btn-sm"
                        >
                          <img
                            src="assets/img/delete-icon.svg"
                            height="16"
                            alt="del_bed"
                          />
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary rounded-0 d-flex btn-sm"
                        >
                          <img
                            src="assets/img/edit-icon.svg"
                            height="16"
                            alt="edit_bed"
                          />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td className="d-flex justify-content-between align-items-center">
                        <button
                          type="button"
                          className="btn btn-danger rounded-0 d-flex btn-sm"
                        >
                          <img
                            src="assets/img/delete-icon.svg"
                            height="16"
                            alt="del_bed"
                          />
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary rounded-0 d-flex btn-sm"
                        >
                          <img
                            src="assets/img/edit-icon.svg"
                            height="16"
                            alt="edit_bed"
                          />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td className="d-flex justify-content-between align-items-center">
                        <button
                          type="button"
                          className="btn btn-danger rounded-0 d-flex btn-sm"
                        >
                          <img
                            src="assets/img/delete-icon.svg"
                            height="16"
                            alt="del_bed"
                          />
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary rounded-0 d-flex btn-sm"
                        >
                          <img
                            src="assets/img/edit-icon.svg"
                            height="16"
                            alt="edit_bed"
                          />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade col-md-12 px-n15"
          id="v-pills-profile"
          role="tabpanel"
          aria-labelledby="v-pills-profile-tab"
        >
          <div className="d-flex">
            <div className="d-flex flex-column mt-2 col-sm-2 border-right">
              <h5 className="mb-2">FILTER BY2</h5>

              <form action="" className="mb-2">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="enter bed no"
                />
              </form>

              <div className="overflow-auto">
                <form action="" className="mb-2">
                  <h6>Block:</h6>
                  <div>
                    <input type="radio" id="test1" name="radio-group" checked />
                    <label for="test1">Block 1</label>
                  </div>
                  <div>
                    <input type="radio" id="test2" name="radio-group" />
                    <label for="test2">Block 2</label>
                  </div>
                  <div>
                    <input type="radio" id="test3" name="radio-group" />
                    <label for="test3">Block 3</label>
                  </div>
                </form>

                <form action="" className="mb-2">
                  <h6>Variety:</h6>
                  <div>
                    <input
                      className="styled-checkbox"
                      id="styled-checkbox-1"
                      type="checkbox"
                      value="value1"
                    />
                    <label for="styled-checkbox-1">Lemon Pom Pom</label>
                  </div>
                  <div>
                    <input
                      className="styled-checkbox"
                      id="styled-checkbox-2"
                      type="checkbox"
                      value="value2"
                      checked
                    />
                    <label for="styled-checkbox-2">English Rose</label>
                  </div>
                  <div>
                    <input
                      className="styled-checkbox"
                      id="styled-checkbox-4"
                      type="checkbox"
                      value="value4"
                    />
                    <label for="styled-checkbox-4">Fourth option</label>
                  </div>
                </form>

                <form action="" className="mb-2">
                  <h6>Variety:</h6>
                  <div>
                    <input
                      className="styled-checkbox"
                      id="styled-checkbox-1"
                      type="checkbox"
                      value="value1"
                    />
                    <label for="styled-checkbox-1">Lemon Pom Pom</label>
                  </div>
                  <div>
                    <input
                      className="styled-checkbox"
                      id="styled-checkbox-2"
                      type="checkbox"
                      value="value2"
                      checked
                    />
                    <label for="styled-checkbox-2">English Rose</label>
                  </div>
                  <div>
                    <input
                      className="styled-checkbox"
                      id="styled-checkbox-4"
                      type="checkbox"
                      value="value4"
                    />
                    <label for="styled-checkbox-4">Fourth option</label>
                  </div>
                </form>

                <form action="" className="mb-2">
                  <h6>Variety3:</h6>
                  <div>
                    <input
                      className="styled-checkbox"
                      id="styled-checkbox-1"
                      type="checkbox"
                      value="value1"
                    />
                    <label for="styled-checkbox-1">Lemon Pom Pom</label>
                  </div>
                  <div>
                    <input
                      className="styled-checkbox"
                      id="styled-checkbox-2"
                      type="checkbox"
                      value="value2"
                      checked
                    />
                    <label for="styled-checkbox-2">English Rose</label>
                  </div>
                  <div>
                    <input
                      className="styled-checkbox"
                      id="styled-checkbox-4"
                      type="checkbox"
                      value="value4"
                    />
                    <label for="styled-checkbox-4">Fourth option</label>
                  </div>
                </form>

                <form action="" className="mb-2">
                  <h6>Variety4:</h6>
                  <div>
                    <input
                      className="styled-checkbox"
                      id="styled-checkbox-1"
                      type="checkbox"
                      value="value1"
                    />
                    <label for="styled-checkbox-1">Lemon Pom Pom</label>
                  </div>
                  <div>
                    <input
                      className="styled-checkbox"
                      id="styled-checkbox-2"
                      type="checkbox"
                      value="value2"
                      checked
                    />
                    <label for="styled-checkbox-2">English Rose</label>
                  </div>
                  <div>
                    <input
                      className="styled-checkbox"
                      id="styled-checkbox-4"
                      type="checkbox"
                      value="value4"
                    />
                    <label for="styled-checkbox-4">Fourth option</label>
                  </div>
                </form>

                <form action="" className="mb-2">
                  <h6>Variety:</h6>
                  <div>
                    <input
                      className="styled-checkbox"
                      id="styled-checkbox-1"
                      type="checkbox"
                      value="value1"
                    />
                    <label for="styled-checkbox-1">Lemon Pom Pom</label>
                  </div>
                  <div>
                    <input
                      className="styled-checkbox"
                      id="styled-checkbox-2"
                      type="checkbox"
                      value="value2"
                      checked
                    />
                    <label for="styled-checkbox-2">English Rose</label>
                  </div>
                  <div>
                    <input
                      className="styled-checkbox"
                      id="styled-checkbox-4"
                      type="checkbox"
                      value="value4"
                    />
                    <label for="styled-checkbox-4">Fourth option</label>
                  </div>
                </form>
              </div>
            </div>
            <div className="main col-md-10">
              <div className="d-flex flex-row justify-content-between my-2">
                <button
                  type="button"
                  className="btn btn-primary rounded-0 d-flex flex-nowrap align-items-center"
                >
                  <img
                    src="assets/img/add-icon.svg"
                    height="20"
                    alt="add_bed"
                    className="mr-sm-1"
                  />
                  Add Bed
                </button>
                <button
                  type="button"
                  className="btn btn-primary rounded-0 d-flex flex-nowrap align-items-center"
                >
                  <img
                    src="assets/img/print-icon.svg"
                    height="20"
                    alt="print"
                    className="mr-sm-1"
                  />
                  Print
                </button>
              </div>
              <div className="table-responsive">
                <table className="table bg-white table-hover table-sm">
                  <thead className="bg-purple text-white">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col" className="w-100p">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td className="d-flex justify-content-between align-items-center">
                        <button
                          type="button"
                          className="btn btn-danger rounded-0 d-flex btn-sm"
                        >
                          <img
                            src="assets/img/delete-icon.svg"
                            height="16"
                            alt="del_bed"
                          />
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary rounded-0 d-flex btn-sm"
                        >
                          <img
                            src="assets/img/edit-icon.svg"
                            height="16"
                            alt="edit_bed"
                          />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td className="d-flex justify-content-between align-items-center">
                        <button
                          type="button"
                          className="btn btn-danger rounded-0 d-flex btn-sm"
                        >
                          <img
                            src="assets/img/delete-icon.svg"
                            height="16"
                            alt="del_bed"
                          />
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary rounded-0 d-flex btn-sm"
                        >
                          <img
                            src="assets/img/edit-icon.svg"
                            height="16"
                            alt="edit_bed"
                          />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td className="d-flex justify-content-between align-items-center">
                        <button
                          type="button"
                          className="btn btn-danger rounded-0 d-flex btn-sm"
                        >
                          <img
                            src="assets/img/delete-icon.svg"
                            height="16"
                            alt="del_bed"
                          />
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary rounded-0 d-flex btn-sm"
                        >
                          <img
                            src="assets/img/edit-icon.svg"
                            height="16"
                            alt="edit_bed"
                          />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade col-md-12 px-n15"
          id="v-pills-messages"
          role="tabpanel"
          aria-labelledby="v-pills-messages-tab"
        >
          <div className="d-flex">
            <div className="d-flex flex-column mt-2 col-sm-2 border-right">
              <h5 className="mb-2">FILTER BY3</h5>
              <form action="" className="mb-2">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="enter bed no"
                />
              </form>

              <div className="overflow-auto">
                <form action="" className="mb-2">
                  <h6>Block:</h6>
                  <div>
                    <input type="radio" id="test1" name="radio-group" checked />
                    <label for="test1">Block 1</label>
                  </div>
                  <div>
                    <input type="radio" id="test2" name="radio-group" />
                    <label for="test2">Block 2</label>
                  </div>
                  <div>
                    <input type="radio" id="test3" name="radio-group" />
                    <label for="test3">Block 3</label>
                  </div>
                </form>

                <form action="" className="mb-2">
                  <h6>Variety:</h6>
                  <div>
                    <input
                      className="styled-checkbox"
                      id="styled-checkbox-1"
                      type="checkbox"
                      value="value1"
                    />
                    <label for="styled-checkbox-1">Lemon Pom Pom</label>
                  </div>
                  <div>
                    <input
                      className="styled-checkbox"
                      id="styled-checkbox-2"
                      type="checkbox"
                      value="value2"
                      checked
                    />
                    <label for="styled-checkbox-2">English Rose</label>
                  </div>
                  <div>
                    <input
                      className="styled-checkbox"
                      id="styled-checkbox-4"
                      type="checkbox"
                      value="value4"
                    />
                    <label for="styled-checkbox-4">Fourth option</label>
                  </div>
                </form>
              </div>
            </div>
            <div className="main col-md-10">
              <div className="d-flex flex-row justify-content-between my-2">
                <button
                  type="button"
                  className="btn btn-primary rounded-0 d-flex flex-nowrap align-items-center"
                >
                  <img
                    src="assets/img/add-icon.svg"
                    height="20"
                    alt="add_bed"
                    className="mr-sm-1"
                  />
                  Add Bed
                </button>
                <button
                  type="button"
                  className="btn btn-primary rounded-0 d-flex flex-nowrap align-items-center"
                >
                  <img
                    src="assets/img/print-icon.svg"
                    height="20"
                    alt="print"
                    className="mr-sm-1"
                  />
                  Print
                </button>
              </div>
              <div className="table-responsive">
                <table className="table bg-white table-hover table-sm">
                  <thead className="bg-purple text-white">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col" className="w-100p">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td className="d-flex justify-content-between align-items-center">
                        <button
                          type="button"
                          className="btn btn-danger rounded-0 d-flex btn-sm"
                        >
                          <img
                            src="assets/img/delete-icon.svg"
                            height="16"
                            alt="del_bed"
                          />
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary rounded-0 d-flex btn-sm"
                        >
                          <img
                            src="assets/img/edit-icon.svg"
                            height="16"
                            alt="edit_bed"
                          />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td className="d-flex justify-content-between align-items-center">
                        <button
                          type="button"
                          className="btn btn-danger rounded-0 d-flex btn-sm"
                        >
                          <img
                            src="assets/img/delete-icon.svg"
                            height="16"
                            alt="del_bed"
                          />
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary rounded-0 d-flex btn-sm"
                        >
                          <img
                            src="assets/img/edit-icon.svg"
                            height="16"
                            alt="edit_bed"
                          />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td className="d-flex justify-content-between align-items-center">
                        <button
                          type="button"
                          className="btn btn-danger rounded-0 d-flex btn-sm"
                        >
                          <img
                            src="assets/img/delete-icon.svg"
                            height="16"
                            alt="del_bed"
                          />
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary rounded-0 d-flex btn-sm"
                        >
                          <img
                            src="assets/img/edit-icon.svg"
                            height="16"
                            alt="edit_bed"
                          />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewFilter;
