import React from "react";
import "./Wishlist.css";
import { Link } from "react-router-dom";
const Wishlist = ({ wishlist, handleAddToCart, handleRemoveFromWishlist }) => {
  return (
    <div className="wishlist-page">
      <h1>Your Wishlist</h1>
      <div className="wishlist-content">
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <div key={product.id} className="wishlist-item">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="wishlist-image"
              />
              <h2>{product.name}</h2>
              <a style={{ color: "black" }}>₹ {product.price}</a>
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <button
                className="remove-from-wishlist-button"
                onClick={() => handleRemoveFromWishlist(product.id)}
              >
                Remove from Wishlist
              </button>
            </div>
          ))
        ) : (
          <p>Your wishlist is empty</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
