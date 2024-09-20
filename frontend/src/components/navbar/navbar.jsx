import React from 'react';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="logo">SmartFlix</div>
      <ul className="nav-items">
        <li className="nav-item">Home</li>
        <li className="nav-item">Movies</li>
        <li className="nav-item">TV Shows</li>
        <li className="nav-item">Genres</li>
        <li className="nav-item">Contact</li>
      </ul>
    </nav>
  );
};

export default Navbar;
