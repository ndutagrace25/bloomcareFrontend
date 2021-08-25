import React from "react";

const NewEntities = () => {
  return (
    <div className="d-flex flex-column mt-2 col-xm-2 px-n15 border-right">
      <h5 className="px-4 mb-2">ENTITIES</h5>
      <div
        className="nav flex-column flex-nowrap nav-pills text-grey"
        role="tablist"
        aria-orientation="vertical"
      >
        <a
          className="nav-link px-4 py-3"
          id="v-pills-home-tab"
          data-toggle="pill"
          href="#personnel"
          role="tab"
          aria-controls="v-pills-home"
          aria-selected="true"
        >
          Personnel
        </a>
        <a
          className="nav-link px-4 py-3"
          id="v-pills-profile-tab"
          data-toggle="pill"
          href="#block"
          role="tab"
          aria-controls="v-pills-profile"
          aria-selected="false"
        >
          Block
        </a>
        <a
          className="nav-link px-4 py-3 text-nowrap"
          id="v-pills-messages-tab"
          data-toggle="pill"
          href="#bed"
          role="tab"
          aria-controls="v-pills-messages"
          aria-selected="false"
        >
          Beds
        </a>
        <a
          className="nav-link px-4 py-3"
          id="v-pills-settings-tab"
          data-toggle="pill"
          href="#entry"
          role="tab"
          aria-controls="v-pills-settings"
          aria-selected="false"
        >
          Station
        </a>
        <a
          className="nav-link px-4 py-3"
          id="v-pills-settings-tab"
          data-toggle="pill"
          href="#pointlayout"
          role="tab"
          aria-controls="v-pills-settings"
          aria-selected="false"
        >
          Point
        </a>
        <a
          className="nav-link px-4 py-3"
          id="v-pills-settings-tab"
          data-toggle="pill"
          href="#flowertype"
          role="tab"
          aria-controls="v-pills-settings"
          aria-selected="false"
        >
          Variety
        </a>
        <a
          className="nav-link px-4 py-3"
          id="v-pills-settings-tab"
          data-toggle="pill"
          href="#toleranceType"
          role="tab"
          aria-controls="v-pills-settings"
          aria-selected="false"
        >
          Tolerance Type
        </a>
        <a
          className="nav-link px-4 py-3"
          id="v-pills-settings-tab"
          data-toggle="pill"
          href="#tolerance"
          role="tab"
          aria-controls="v-pills-settings"
          aria-selected="false"
        >
          Tolerance
        </a>
        <a
          className="nav-link px-4 py-3"
          id="v-pills-settings-tab"
          data-toggle="pill"
          href="#issueType"
          role="tab"
          aria-controls="v-pills-settings"
          aria-selected="false"
        >
          Issue Type
        </a>
        <a
          className="nav-link px-4 py-3"
          id="v-pills-settings-tab"
          data-toggle="pill"
          href="#issue"
          role="tab"
          aria-controls="v-pills-settings"
          aria-selected="false"
        >
          Issue
        </a>
        <a
          className="nav-link px-4 py-3"
          id="v-pills-settings-tab"
          data-toggle="pill"
          href="#issueCategory"
          role="tab"
          aria-controls="v-pills-settings"
          aria-selected="false"
        >
          Issue Category
        </a>
      </div>
    </div>
  );
};

export default NewEntities;
