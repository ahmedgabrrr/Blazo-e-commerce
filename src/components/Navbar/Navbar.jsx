import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { cartContext } from '../../context/cartContext'
import { wishlistContext } from '../../context/wishlistContext'

export default function Navbar() {
  let { counter, setCounter, getCart } = useContext(cartContext)
  let { getWishlist } = useContext(wishlistContext)
  useEffect(() => {
    (async () => {
      let data = await getCart()
      setCounter(data.numOfCartItems)
    })()
  }, [])
  useEffect(() => {
    (async () => {
      let data = await getWishlist()

    })()
  }, [])
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
        <div className="container-fluid ">
          <div className="navbar-brand " to='/'><img src={logo} alt="" className='logo-style' /></div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link fw-bold" to='/'>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link fw-bold" to='/products'>Products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link fw-bold" to='/categories'>Categories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link fw-bold" to='/brands'>Brands</NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link fw-bold position-relative" to='/cart'>Cart
                  <i className="fa-solid fa-cart-shopping mx-2" />

                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {counter}
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link fw-bold position-relative" to='/wishlist'>wishlist
                  <i className="fa-regular fa-heart mx-2" />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">


                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link fw-bold position-relative " to='/signin' onClick={() => localStorage.clear()}>
                  Log Out

                </NavLink>
              </li>
            </ul>

          </div>
        </div>
      </nav>

    </>
  )
}
