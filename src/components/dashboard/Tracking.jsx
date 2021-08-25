import React from "react";

import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Polygon,
  Polyline
  // InfoBox
} from "react-google-maps";

// const coords = [
//   {
//     lat: -0.077803,
//     lng: 36.987994
//   },
//   {
//     lat: -0.077475,
//     lng: 36.987744
//   },
//   {
//     lat: -0.077028,
//     lng: 36.988392
//   },
//   {
//     lat: -0.077382,
//     lng: 36.988719
//   }
// ];

const coords = [
  {
    lat: 0.022452,
    lng: 37.066772
  },
  {
    lat: 0.023235,
    lng: 37.066203
  },
  {
    lat: 0.023695,
    lng: 37.066882
  },
  {
    lat: 0.022923,
    lng: 37.067408
  }
];


// const scoutPath = props.trackingReport;
function Map(props) {
  return (
    <GoogleMap
      defaultZoom={19}
      // defaultCenter={{ lat: -0.077382, lng: 36.988719 }}
      defaultCenter={{ lat: 0.022763, lng: 37.067212 }}
    >
      {/* <InfoBox width='20'/> */}
      <Polygon
        path={coords}
        key={1}
        options={{
          fillColor: "#FF0000",
          fillOpacity: 0.4,
          strokeColor: "#FF0000",
          strokeOpacity: 1,
          strokeWeight: 1
        }}
        onClick={() => {
          console.log("ahmeta");
        }}
      />
      <Polyline
        path={props.trackingReport}
        key={1}
        options={{
          fillColor: "#000000",
          fillOpacity: 0.4,
          strokeColor: "#000000",
          strokeOpacity: 1,
          strokeWeight: 2
        }}
        onClick={() => {
          console.log("ahmet");
        }}
      />
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

function Tracking(props) {
  // console.log(props.trackingReport);
  let trackingReport = props.trackingReport;
  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDQeIaeMaPYVZzj_1_gTLLvf_NUWcW-x1U`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
        trackingReport={trackingReport}
      />
    </div>
  );
}

export default Tracking;
