import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import logo from '../../src/assets/logo.png'
export default function AuthLayout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
        <div className="container-fluid ">
          <div className="navbar-brand" to='/'><img className='logo-style' src={logo} alt="" /></div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <NavLink className="nav-link position-relative " to='/signin'> Sign In </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link position-relative " to='/signup'> Sign Up </NavLink>
              </li>
            </ul>

          </div>
        </div>
      </nav>
      <Outlet />
    </>
  )
}
