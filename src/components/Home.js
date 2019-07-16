import React, { Component } from 'react';
import { Search } from './Search';

export class Home extends Component {
  style = {
    justifyContent: 'center',
    alignItems: 'center'
  };
  render() {
    return (
      <div style={this.style}>
        <h3>Welcome. Please search for a book.</h3>
        <Search />
      </div>
    );
  }
}

export default Home;
