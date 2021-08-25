
import React, { Component } from "react";
import Dogs from "./Dogs";

class DogList extends Component {
  state = {};

  render() {
    const { filteredDogs } = this.props;
    console.log(filteredDogs);

    const personnels =
      filteredDogs instanceof Array
        ? filteredDogs.map((person, i) => (
            <Dogs key={i} name={person.first_name} breed={person.last_name} />
          ))
        : null;
    return (<React.Fragment>
        <div>{personnels}</div>
        </React.Fragment>);
  }
}

export default DogList;
