import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Brands() {
    let [brands, setBrands] = useState([])
    let [loading, setLoading] = useState(true)

    async function getBrands() {
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
        setBrands(data.data)
        setLoading(false)
    }
    useEffect(() => {
        getBrands()
    }, [])

    if (loading) return <div className="d-flex justify-content-center mb-big mt-3">
        <i className="fa-solid fa-spinner fa-spin  fa-5x color-main"></i>
    </div>

    return (
        <>
            <div className="container">
                <div className="row">
                    {
                        brands.map((item) => {
                            return <div key={item._id} className="col-md-4">
                                <Link to='/products'>
                                    <img className='w-100' src={item.image} alt="" />
                                </Link>
                            </div>
                        })
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}
