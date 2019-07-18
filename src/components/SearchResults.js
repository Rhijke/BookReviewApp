import React, { useState, useEffect } from 'react';
import { fetchBook } from './api/fetchBook';
import './SearchResults.css';
import { Book } from './Book';
const SearchResults = ({ match }) => {
  const [search, setSearch] = useState(`${match.params.search}`);
  const [results, setResults] = useState([]);

  const searchBook = async () => {
    let searchResults = await fetchBook(search);
    setResults(searchResults);
  };

  useEffect(() => {
    searchBook();
  }, []);
  return (
    <div>
      <div className="page-header">
        <h3>Search results for: {match.params.search.replace('+', ' ')}</h3>
      </div>
      <div className="searchresults">
        {results.length > 0 ? results.map(book => Book(book)) : null}
      </div>
    </div>
  );
};

export default SearchResults;
