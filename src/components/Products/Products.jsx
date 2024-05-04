import React from 'react'
import axios from 'axios'
import Product from '../Product/Product'
import { useQuery } from 'react-query'
import Footer from '../Footer/Footer'

export default function Products() {
  function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  let { data, isLoading } = useQuery('getProducts', getProducts)
  let products = (data?.data.data)
  // let [products, setProducts] = useState([])
  // let [loading, setLoading] = useState(true)
  // async function getProducts() {
  //   let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  //   setProducts(data.data)
  //   setLoading(false)
  // }
  // useEffect(() => {
  //   getProducts()
  // }, [])
  if (isLoading) return <div className="d-flex justify-content-center mb-big mt-3">
    <i className="fa-solid fa-spinner fa-spin  fa-5x color-main"></i>
  </div>


  return (
    <>
      <div className="container">
        <div className="row">
          {products.map(item => {
            return <Product key={item._id} item={item} />
          })}
        </div>
      </div>
      <Footer />
    </>
  )
}
