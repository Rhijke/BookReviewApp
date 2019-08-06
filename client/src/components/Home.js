import React, { Component } from 'react';
import { Search } from './SearchBar';
import Login from './Login';
import { Redirect } from 'react-router-dom';

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
      </div>
    );
  }
}

export default Home;
