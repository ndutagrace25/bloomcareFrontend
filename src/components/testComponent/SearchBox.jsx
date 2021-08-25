import React, { Component } from 'react';

class SearchBox extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <input onChange={this.props.handleInput} type="text"/>
            </React.Fragment>
         );
    }
}
 
export default SearchBox;