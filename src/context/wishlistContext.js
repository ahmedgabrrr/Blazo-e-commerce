import axios from "axios";
import { createContext, useState } from "react";

export let wishlistContext = createContext(0);

async function addToWishlist(productId) {
  return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}
async function getWishlist() {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}
async function removeItem(productId) {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}

export default function WishlistContext({ children }) {
  return (
    <>
      <wishlistContext.Provider
        value={{
          addToWishlist,
          getWishlist,
          removeItem,
        }}
      >
        {children}
      </wishlistContext.Provider>
    </>
  );
}
