import React, { useContext, useEffect, useState } from 'react'


import { categoriesContext } from '../../context/categoriesContext'
import Category from '../Category/Category'
import MainSlider from '../MainSlider/MainSlider'
import Footer from '../Footer/Footer'

export default function Categories() {
  let [categories, setCategories] = useState([])
  let { getCategories } = useContext(categoriesContext)
  let [loading, setLoading] = useState(true)


  useEffect(() => {
    (async () => {
      setLoading(true)
      let data = await getCategories()

      setCategories(data.data)
      setLoading(false)
    })()
  }, [])

  if (loading) return <div className="d-flex justify-content-center mb-big mt-3">
    <i className="fa-solid fa-spinner fa-spin  fa-5x color-main"></i>
  </div>


  return (
    <>
      <MainSlider />
      <div className="container mt-5">
        <div className="row">
          <h1 className='my-5'>Our Shop Categories</h1>
          {categories.map(item => {
            return <Category key={item._id} item={item} />
          })}
        </div>
      </div>
      <Footer />
    </>
  )
}
