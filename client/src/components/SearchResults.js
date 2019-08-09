import React, { useState, useEffect } from 'react';
import './css/SearchResults.css';
import axios from 'axios';
import { Book } from './Book';

const SearchResults = ({ match }) => {
  const [search, setSearch] = useState(`${match.params.search}`);
  const [searchResults, setResults] = useState([]);

  const searchBook = async () => {
    let response = await axios.get(
      `http://localhost:3002/search?search=${search}`
    );
    let results = response['data']['results']['work'];
    if (results.length > 0) {
      setResults(
        results.map(book => {
          return {
            id: book['best_book']['id']['_'],
            title: book['best_book']['title'],
            author: book['best_book']['author']['name'],
            smallImage: book['best_book']['small_image_url']
          };
        })
      );
    }
  };

  useEffect(() => {
    (async () => {
      await searchBook();
    })();
  }, []);
  return (
    <div>
      <div className="page-header">
        <h3>Search results for: {match.params.search.replace('+', ' ')}</h3>
      </div>
      <div className="searchresults">
        {searchResults.length > 0
          ? searchResults.map(book => Book(book))
          : null}
      </div>
    </div>
  );
};

export default SearchResults;
