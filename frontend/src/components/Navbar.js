import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <i className="fas fa-leaf"></i> FLORIST
        </Link>
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/products" className="nav-link" onClick={closeMenu}>
            Products
          </Link>
          <Link to="/cart" className="nav-link" onClick={closeMenu}>
            Cart
          </Link>
          
          {!user ? (
            <Link to="/login" className="nav-link" onClick={closeMenu}>
              Login
            </Link>
          ) : (
            <div className="profile-menu-container">
              <div className="profile-icon" onClick={toggleProfileMenu}>
                <i className="fas fa-user-circle"></i>
                <span>{user.name || user.email}</span>
                <i className={`fas fa-chevron-${isProfileMenuOpen ? 'up' : 'down'}`}></i>
              </div>
              
              {isProfileMenuOpen && (
                <div className="profile-dropdown">
                  <div className="profile-info">
                    <i className="fas fa-user"></i>
                    <span>{user.name || user.email}</span>
                  </div>
                  
                  <div className="dropdown-divider"></div>
                  
                  <Link to="/profile" className="dropdown-item" onClick={closeMenu}>
                    <i className="fas fa-user"></i> Profil Saya
                  </Link>
                  
                  <Link to="/orders" className="dropdown-item" onClick={closeMenu}>
                    <i className="fas fa-shopping-bag"></i> Pesanan Saya
                  </Link>
                  
                  <div className="dropdown-divider"></div>
                  
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="nav-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;