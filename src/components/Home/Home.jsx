import React from 'react'
import Navbar from '../Navbar/Navbar'
import MainSlider from '../MainSlider/MainSlider'
import CategoriesSlider from '../Categories/CategoriesSlider'
import Products from '../Products/Products'
import Footer from '../Footer/Footer'
export default function Home() {
  return (
    <>
      <MainSlider />
      <CategoriesSlider />

      <div className="container">
        <h2 className='my-5'>Most Popular Products</h2>
      </div>

      <Products />
      <Footer />
    </>
  )
}
