import React, { Component } from 'react';
import { Search } from './SearchBar';
import firebase from './api/firebase';
import Login from './Login';

export class Home extends Component {
  style = {
    justifyContent: 'center',
    alignItems: 'center'
  };
  render() {
    if (firebase.auth().currentUser) {
      return (
        <div style={this.style}>
          {console.log(firebase.auth().currentUser.uid)}
          <h3 className="page-header">Welcome. Please search for a book.</h3>
          <Search />
        </div>
      );
    }

    return <Login />;
  }
}

export default Home;
