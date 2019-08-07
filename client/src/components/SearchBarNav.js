import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchBarNav = () => {
  const [search, setSearch] = useState('');

  // const [isLoading, setIsLoading] = useState(false);

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <form className="form-inline">
        <input
          onInput={updateSearch}
          className="form-control mr-sm-2"
          type="text"
          placeholder="Search"
        />
        <Link to={`/search/${search.replace(' ', '+')}`}>
          <button
            className="btn btn-secondary my-2 my-sm-0"
            style={{ marginRight: 5 }}
            disabled={search !== '' ? false : true}
          >
            Search
          </button>
        </Link>
      </form>
    </div>
  );
};
export default SearchBarNav;
