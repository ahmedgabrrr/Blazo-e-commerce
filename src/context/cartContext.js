import axios from "axios";
import { createContext, useState } from "react";

export let cartContext = createContext(0);

async function addToCart(productId) {
  return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/cart",
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
async function getCart() {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}
async function removeItem(productId) {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}
async function productQuantity(productId, count) {
  return axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}
async function order(cartId, shippingAddress) {
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
      { shippingAddress },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}
export default function CartContext({ children }) {
  let [counter, setCounter] = useState(0);
  return (
    <>
      <cartContext.Provider
        value={{
          counter,
          setCounter,
          addToCart,
          getCart,
          removeItem,
          productQuantity,
          order,
        }}
      >
        {children}
      </cartContext.Provider>
    </>
  );
}
