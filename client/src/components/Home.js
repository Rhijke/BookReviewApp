import React, { Component } from 'react';
import { Search } from './SearchBar';
import Login from './Login';

export class Home extends Component {
  style = {
    justifyContent: 'center',
    alignItems: 'center'
  };
  render() {
    return (
      <div style={this.style}>
        <h3 className="page-header">Welcome. Please search for a book.</h3>
        <Search />
        <Login />
      </div>
    );
  }
}

export default Home;
