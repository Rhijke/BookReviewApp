import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../App.js';

function Nav() {
  const navStyle = {
    alignItems: 'center'
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={navStyle}
    >
      <Link className="navbar-brand" to="./">
        Home
      </Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="./booklist">
              Book List
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="./writereview">
              Write a Review
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
