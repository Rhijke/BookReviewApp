import React, { Component } from 'react';
import { Search } from './SearchBar';
import firebase from './api/firebase';

export class Home extends Component {
  style = {
    justifyContent: 'center',
    alignItems: 'center'
  };
  render() {
    return (
      <div style={this.style}>
        {console.log(firebase.auth().currentUser)}
        <h3 className="page-header">Welcome. Please search for a book.</h3>
        <Search />
      </div>
    );
  }
}

export default Home;
