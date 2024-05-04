import React from 'react'
import Categories from './components/Categories/Categories'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
import Wishlist from './components/Wishlist/Wishlist'
import Signin from './components/Signin/Signin'
import Signup from './components/Signup/Signup'
import AuthLayout from './Layout/AuthLayout'
import NotFound from './components/NotFound/NotFound'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import ProductDetails from './components/ProductDetails/ProductDetails'
import CartContext from './context/cartContext'
import { ToastContainer } from 'react-toastify';
import Address from './components/Address/Address'
import CategoriesContext from './context/categoriesContext'
import WishlistContext from './context/wishlistContext'
export default function App() {
  let routes = createBrowserRouter([
    {
      path: '/', element: <MainLayout />, children: [

        { index: true, element: <Home /> },
        { path: 'home', element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: 'products', element: <ProtectedRoutes><Products /></ProtectedRoutes> },
        { path: 'categories', element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
        { path: 'brands', element: <ProtectedRoutes> <Brands /></ProtectedRoutes> },
        { path: 'cart', element: <ProtectedRoutes><Cart /></ProtectedRoutes > },
        { path: 'wishlist', element: <ProtectedRoutes> <Wishlist /></ProtectedRoutes > },
        { path: 'product/:id', element: <ProtectedRoutes> <ProductDetails /></ProtectedRoutes > },
        { path: 'address/:id', element: <ProtectedRoutes> <Address /></ProtectedRoutes > },

        { path: '*', element: <NotFound /> },

      ]
    },
    {
      path: '/', element: <AuthLayout />, children: [

        { path: 'signin', element: <Signin /> },
        { path: 'signup', element: <Signup /> },


      ]
    },
  ])

  return (
    <>
      <CartContext>
        <WishlistContext>
          <CategoriesContext>
            <RouterProvider router={routes} />
            <ToastContainer position="bottom-center"
              autoClose={1000}

            />
          </CategoriesContext>
        </WishlistContext>
      </CartContext>

    </>
  )
}
