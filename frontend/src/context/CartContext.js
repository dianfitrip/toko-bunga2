import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

const API_URL = `${process.env.REACT_APP_API_URL}/api/cart`;
const BASE_URL = `${process.env.REACT_APP_API_URL}/`;

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  const fetchCartItems = useCallback(async () => {
    if (!currentUser) {
      setCartItems([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const { data } = await axios.get(API_URL, getAuthHeaders());
      if (Array.isArray(data)) {
        const formattedItems = data.map(item => ({
          ...item,
          image: item.gambar ? `${BASE_URL}${item.gambar.replace(/\\/g, '/')}` : 'https://placehold.co/100',
          price: parseFloat(item.harga),
          name: item.nama_produk
        }));
        setCartItems(formattedItems);
      } else {
        console.error("Data keranjang yang diterima bukan array:", data);
        setCartItems([]);
      }
    } catch (error) {
      console.error("Gagal mengambil item keranjang:", error);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchCartItems();
  }, [currentUser, fetchCartItems]);

  const addToCart = async (productId, quantity = 1) => {
    if (!currentUser) {
      alert('Silakan login untuk menambahkan item ke keranjang.');
      return;
    }
    try {
      await axios.post(API_URL, { product_id: productId, quantity }, getAuthHeaders());
      alert('Produk berhasil ditambahkan ke keranjang!');
      fetchCartItems();
    } catch (error) {
      console.error("Gagal menambah ke keranjang:", error);
      alert('Gagal menambahkan produk.');
    }
  };

  const updateQuantity = async (cartId, quantity) => {
    if (quantity < 1) {
      removeFromCart(cartId);
      return;
    }
    try {
      await axios.put(`${API_URL}/${cartId}`, { quantity }, getAuthHeaders());
      fetchCartItems();
    } catch (error) {
      console.error("Gagal mengupdate kuantitas:", error);
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await axios.delete(`${API_URL}/${cartId}`, getAuthHeaders());
      fetchCartItems();
    } catch (error) {
      console.error("Gagal menghapus item dari keranjang:", error);
    }
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    fetchCartItems,
    itemCount: cartItems.reduce((acc, item) => acc + item.quantity, 0)
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};