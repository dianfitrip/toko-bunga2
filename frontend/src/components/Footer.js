import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>FLORIST</h3>
          <p>Toko buket bunga terpercaya dengan kualitas terbaik dan pelayanan profesional.</p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-whatsapp"></i></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Link Cepat</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Produk</a></li>
            <li><a href="/cart">Keranjang</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Kategori</h4>
          <ul>
            <li><a href="#">Buket Mawar</a></li>
            <li><a href="#">Buket Tulip</a></li>
            <li><a href="#">Buket Lavender</a></li>
            <li><a href="#">Buket Campuran</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Kontak Kami</h4>
          <ul className="contact-info">
            <li><i className="fas fa-map-marker-alt"></i> Jl. Bunga Indah No. 123, Jakarta</li>
            <li><i className="fas fa-phone"></i> +62 812 3456 7890</li>
            <li><i className="fas fa-envelope"></i> info@florist.com</li>
            <li><i className="fas fa-clock"></i> Buka setiap hari: 08.00 - 20.00</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2023 FLORIST - Toko Buket Bunga. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;