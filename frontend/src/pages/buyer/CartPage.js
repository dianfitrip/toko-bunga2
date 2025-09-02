import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();

  // Data ini seharusnya datang dari API atau Context, untuk saat ini kita gunakan data dummy
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Buket Mawar Merah', price: 250000, quantity: 1, image: 'https://placehold.co/150x150/d53f8c/white?text=Mawar' },
    { id: 2, name: 'Buket Lily Putih', price: 300000, quantity: 2, image: 'https://placehold.co/150x150/d53f8c/white?text=Lily' }
  ]);
  
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    // Menghitung subtotal setiap kali item di keranjang berubah
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setSubtotal(total);
  }, [cartItems]);
  
  // Fungsi untuk memformat harga ke dalam Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  // Fungsi untuk menangani klik pada tombol checkout
  const handleCheckout = () => {
    // Navigasi ke halaman place-order dan kirim data keranjang melalui state
    navigate('/place-order', { 
      state: { 
        cartItems: cartItems, 
        subtotal: subtotal 
      } 
    });
  };

  // Tampilan jika keranjang kosong
  if (cartItems.length === 0) {
    return (
      <div className="cart-container empty-cart">
        <h2>Keranjang Belanja Anda Kosong</h2>
        <p>Sepertinya Anda belum menambahkan produk apapun ke keranjang.</p>
        <Link to="/products" className="btn-primary">
          Mulai Belanja
        </Link>
      </div>
    );
  }

  // Tampilan utama halaman keranjang
  return (
    <div className="cart-container">
      <h1>Keranjang Belanja</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>{formatPrice(item.price)}</p>
              </div>
              <div className="cart-item-quantity">
                <button>-</button>
                <span>{item.quantity}</span>
                <button>+</button>
              </div>
              <div className="cart-item-total">
                {formatPrice(item.price * item.quantity)}
              </div>
              <button className="cart-item-remove">×</button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Ringkasan Pesanan</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Ongkos Kirim</span>
            <span>{formatPrice(20000)}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>{formatPrice(subtotal + 20000)}</span>
          </div>
          <button className="btn-checkout" onClick={handleCheckout}>
            Lanjutkan ke Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;