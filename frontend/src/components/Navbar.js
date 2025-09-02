import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Helper function to close menu on link click
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          FLORIST
        </Link>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          
          {/* --- LOGIKA BARU UNTUK TAMPILAN MENU --- */}
          
          {/* 1. Tampilkan menu berdasarkan peran (role) pengguna */}
          {currentUser && currentUser.role === 'admin' ? (
            // Jika pengguna adalah ADMIN, tampilkan hanya Admin Panel
            <Link to="/admin" className="nav-link" onClick={closeMenu}>
              Admin Panel
            </Link>
          ) : (
            // Jika BUKAN admin (buyer atau pengunjung), tampilkan Home dan Products
            <>
              <Link to="/" className="nav-link" onClick={closeMenu}>
                Home
              </Link>
              <Link to="/products" className="nav-link" onClick={closeMenu}>
                Products
              </Link>
            </>
          )}
          
          {/* 2. Tampilkan info login/logout */}
          {currentUser ? (
            // Jika ada pengguna yang login (admin atau buyer)
            <div className="nav-user">
              <span>Hello, {currentUser.name || 'User'}</span>
              <button onClick={handleLogout} className="nav-logout">
                Logout
              </button>
            </div>
          ) : (
            // Jika tidak ada yang login
            <Link to="/login" className="nav-link" onClick={closeMenu}>
              Login
            </Link>
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