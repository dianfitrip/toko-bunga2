import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          FLORIST
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">Produk</Link>
          </li>
          <li className="nav-item">
            <Link to="/info" className="nav-link">Info Toko</Link>
          </li>
          
          {currentUser ? (
            <>
              {currentUser.role === 'admin' ? (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link">Admin</Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link to="/cart" className="nav-link">Keranjang</Link>
                </li>
              )}
              <li className="nav-item">
                <span className="nav-link">Halo, {currentUser.name}</span>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;