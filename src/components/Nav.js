import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../App.js';

function Nav() {
  const navStyle = {
    alignItems: 'center',
    height: '8vh'
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={navStyle}
    >
      <Link className="navbar-brand" to="/">
        Home
      </Link>
      <div className="navbar-collapse w-100 order-1 order-md-0" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/booklist">
              Book List
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/writereview">
              Write a Review
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-collapse collapse w-100 order-3">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
