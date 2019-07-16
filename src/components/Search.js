import React, { useState, useEffect } from 'react';
const formStyle = {
  padding: 20
};
const inputStyle = {
  margin: 10
};

export const Search = () => {
  return (
    <form style={formStyle}>
      <input className="form-control" style={inputStyle} placeholder="Search" />
      <button style={inputStyle} className="btn btn-dark">
        Search
      </button>
    </form>
  );
};
