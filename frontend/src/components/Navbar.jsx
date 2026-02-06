import { Container, Navbar as BSNavbar } from 'react-bootstrap';

import React, { useState } from 'react';

const Navbar = ({ isLoggedIn = false, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top custom-navbar">
      <div className="container-xl">
        
        {/* Brand */}
        <a className="navbar-brand fw-bold" href="/">
          <span className="brand-shop">Bei</span>
          <span className="brand-nest">Bora</span>
        </a>

        {/* Mobile Toggle Button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarMain"
          aria-controls="navbarMain" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarMain">
          
          {/* Nav Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/new-arrivals">New Arrivals</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/deals">Deals</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Contact</a>
            </li>
          </ul>

          {/* Search Form */}
          <form className="d-flex me-3 search-form" role="search">
            <input 
              className="form-control search-input" 
              type="search" 
              placeholder="Search products..." 
              aria-label="Search"
            />
            <button className="btn btn-search" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>

          {/* Auth Buttons / User Menu */}
          <div className="d-flex align-items-center gap-2">
            {!isLoggedIn ? (
              // Logged Out - Show Login/Register
              <>
                <a href="/login" className="btn btn-outline-custom">
                  Login
                </a>
                <a href="/register" className="btn btn-custom">
                  Register
                </a>
              </>
            ) : (
              // Logged In - Show Cart and User Dropdown
              <>
                {/* Cart Link */}
                <a href="/cart" className="nav-link text-light position-relative me-2">
                  <i className="fas fa-shopping-cart fs-5"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                    3
                  </span>
                </a>

                {/* User Dropdown */}
                <div className="dropdown">
                  <button 
                    className="btn btn-outline-custom dropdown-toggle" 
                    type="button" 
                    id="userDropdown" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    <i className="fas fa-user-circle me-1"></i>
                    My Account
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-custom" aria-labelledby="userDropdown">
                    <li><a className="dropdown-item" href="/profile">
                      <i className="fas fa-user me-2"></i>Profile
                    </a></li>
                    <li><a className="dropdown-item" href="/orders">
                      <i className="fas fa-box me-2"></i>My Orders
                    </a></li>
                    <li><a className="dropdown-item" href="/settings">
                      <i className="fas fa-cog me-2"></i>Settings
                    </a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button 
                        className="dropdown-item text-danger" 
                        onClick={onLogout}
                      >
                        <i className="fas fa-sign-out-alt me-2"></i>Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;