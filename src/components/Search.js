import React, { useState, useEffect } from 'react';
import { fetchBook } from './api/fetchBook';
const formStyle = {
  padding: 20
};
const inputStyle = {
  margin: 10
};

export const Search = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  // const updateResults = book => {
  //   setResults(prevResults => [...prevResults, {

  //   }])
  // }

  const searchBook = async e => {
    e.preventDefault();
    let searchResults = await fetchBook(search);
    setResults(searchResults);
  };

  return (
    <div>
      {results.length > 0 ? console.log(results) : null}
      <form onSubmit={searchBook} style={formStyle}>
        <input
          onInput={updateSearch}
          className="form-control"
          style={inputStyle}
          placeholder="Search"
        />
        <button style={inputStyle} className="btn btn-dark">
          Search
        </button>
      </form>
    </div>
  );
};
