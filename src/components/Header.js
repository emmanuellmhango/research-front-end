import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';

const Header = ({isLoggedIn, handleLogout}) => (
  <>
    <nav className="nav">
      <div className="nav-wrapper">
        <div
          className="nav-pop"
          id="nav-pop"
        >
          <span className="humburger">&#9868;</span>
        </div>
        <div className="links">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/" className="link">Browse Jobs</NavLink>
            </li>
            {!isLoggedIn ? (
              <li className="nav-item">
                <NavLink to="/login" className="link">My Account</NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                    <NavLink to="/dashboard" className="link">My Dashboard</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/" onClick={handleLogout} className="link">Signout</NavLink>
                </li>
              </>  
            )}
          </ul>
        </div>
        <div className="nav-search">
          <span className="nav-search-icon">
            &#128270;
          </span>
        </div>
      </div>
    </nav>
  </>
);

export default Header;