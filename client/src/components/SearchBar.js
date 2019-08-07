import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const formStyle = {
  padding: 20
};
const inputStyle = {
  margin: 10
};

export const Search = () => {
  const [search, setSearch] = useState('');

  // const [isLoading, setIsLoading] = useState(false);

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <form style={formStyle}>
        <input
          onInput={updateSearch}
          className="form-control"
          style={inputStyle}
          placeholder="Search"
        />

        <Link to={`/search/${search.replace(' ', '+')}`}>
          <button
            style={inputStyle}
            className="btn btn-dark"
            disabled={search !== '' ? false : true}
          >
            Search
          </button>
        </Link>
      </form>
    </div>
  );
};
