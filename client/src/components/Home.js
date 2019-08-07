import React, { Component } from 'react';
import { Search } from './SearchBar';

export class Home extends Component {
  style = {
    justifyContent: 'center',
    alignItems: 'center'
  };
  render() {
    return (
      <div style={this.style}>
        <h2 className="page-header" style={{ marginBottom: 0 }}>
          Welcome. Please search for a book.
        </h2>
        <Search />
      </div>
    );
  }
}

export default Home;
