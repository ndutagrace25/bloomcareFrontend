import React, { Component } from "react";
import DogList from "./DogList";
import SearchBox from "./SearchBox";
// import PropTypes from "prop-types";
import { fetchPersonnel } from "../../actions/personnelActions";
import { connect } from "react-redux";

class MainLayoutTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs: [
        { name: "Max", breed: "lab" },
        { name: "sparky", breed: "german shepherd" },
        { name: "Man", breed: "lab" },
        { name: "personnel", breed: "lab" },
        { name: "taste", breed: "lab" },
        { name: "try", breed: "lab" },
        { name: "jaribu", breed: "boxer" },
        { name: "trial", breed: "lab" },
        { name: "sally", breed: "poodle" },
        { name: "george", breed: "pitbull" }
      ],
      searchDog: "",
      myData: []
    };
  }

  componentDidMount() {
    this.props.fetchPersonnel("0", "10", "", "", "", "", "");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.personnel) {
      this.setState({
        myData: nextProps.personnel
      });
    }
  }

  handleInput = e => {
    console.log(e.target.value);
    this.setState({ searchDog: e.target.value });
  };
  render() {
    const { myData, searchDog } = this.state;

    console.log(myData.items);

    const filteredDogs =
      myData.items instanceof Array
        ? myData.items.filter(personnel => {
            return personnel.first_name
              .toLowerCase()
              .includes(searchDog.toLowerCase());
          })
        : null;

    console.log(filteredDogs);

    // let filteredDogs =
    //   dogs !== "undefined"
    //     ? dogs.filter(dog => {
    //         return dog.name.toLowerCase().includes(searchDog.toLowerCase());
    //       })
    //     : null;

    return (
      <React.Fragment>
        <h1>Dog Images</h1>
        <SearchBox handleInput={this.handleInput} />
        <DogList filteredDogs={filteredDogs} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  personnel: state.personnel.personnel
});

export default connect(mapStateToProps, { fetchPersonnel })(MainLayoutTest);
