import React, { Component } from 'react';

class Dogs extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
        <p>Name: {this.props.name}</p>
        <p>Breed: {this.props.breed}</p>
            </React.Fragment>
         );
    }
}
 
export default Dogs;