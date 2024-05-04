import axios from "axios";
import { createContext, useState } from "react";

export let categoriesContext = createContext(0);

async function getCategories() {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/categories")
    .then(({ data }) => data)
    .catch((err) => err);
}

export default function CategoriesContext({ children }) {
  return (
    <>
      <categoriesContext.Provider
        value={{
          getCategories,
        }}
      >
        {children}
      </categoriesContext.Provider>
    </>
  );
}
