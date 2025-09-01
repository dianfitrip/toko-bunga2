import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={product.image || '/placeholder-image.jpg'} 
          alt={product.name} 
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">Rp {product.price.toLocaleString()}</p>
        <p className="product-rating">
          Rating: {product.avg_rating ? product.avg_rating.toFixed(1) : 'Belum ada rating'}
        </p>
        <Link to={`/products/${product.id}`} className="view-details-btn">
          Lihat Detail
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;