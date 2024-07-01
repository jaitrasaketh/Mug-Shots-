// src/layout/header.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logo from '../assets/muggulogor.png';
import './header.css';

const Header = () => {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <Link to="/"> {/* Link to the home route */}
            <img src={logo} alt="Company Logo" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
