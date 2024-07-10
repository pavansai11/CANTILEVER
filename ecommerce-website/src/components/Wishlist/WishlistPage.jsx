import { Navbar } from "../Navbar/Navbar";
import { useProduct } from "../../context/product-context";
import "../Wishlist/Wishlist.css";
import React from "react";
import { useWishlist } from "../../context/wishlist-context";
import { WishlistCard } from "../Wishlist/WishlistCard";
import { Link } from "react-router-dom";

export const WishlistPage = () => {
  
  const { wishlist, setWishlist } = useWishlist();

  return (
    <div>
      <Navbar />
      {wishlist.wishList.length === 0 ? (
        <div class="empty-wishlist">
          <div class="empty-wishlist-heading">your wishlist is empty</div>
          <div class="empty-wishlist-button">
            <Link to="/products">add items</Link>
          </div>
        </div>
      ) : (
        <div className="wishlist-container">
          {wishlist.wishList.map((item) => (
            <WishlistCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
