import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";

import './header.css';

const Header = ({handleLogout}) => {
  const user = useSelector((state) => state.user.user);
  const company = useSelector((state) => state.company.company);
  if(user) {
  return (
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
              <li className="nav-item">
                  <NavLink to="/dashboard" className="link">My Dashboard</NavLink>
              </li>
              <li className="nav-item">
                  <NavLink to="/applications" className="link">My Applications</NavLink>
              </li>
              <li className="nav-item">
                  <NavLink to="/" onClick={handleLogout} className="link">Signout</NavLink>
              </li>
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
  } else if(company) {
    return (
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
                  <li className="nav-item">
                    <NavLink to="/company-dashboard" className="link">Dashboard</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/company-dashboard" className="link">Interview Results</NavLink>
                  </li>
                  <li className="nav-item">
                      <NavLink to="/" onClick={handleLogout} className="link">Signout</NavLink>
                  </li>
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
  } else {
    return (
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
                  <li className="nav-item">
                    <NavLink to="/login" className="link">Account</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="http://127.0.0.1:5000/" className="link" rel="noopener noreferrer">Face-Login</NavLink>
                  </li>
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
  }

};

export default Header;
