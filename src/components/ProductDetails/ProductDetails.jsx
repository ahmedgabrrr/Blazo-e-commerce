import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { cartContext } from '../../context/cartContext'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ProductDetails() {
    let { counter, setCounter, addToCart } = useContext(cartContext)
    let [btnLoading, setBtnLoading] = useState(true)
    let params = useParams()
    let [product, setProduct] = useState([])
    let [loading, setLoading] = useState(true)
    async function addProductToCart(productId) {
        setBtnLoading(false)
        let data = await addToCart(productId)
        console.log(data);
        if (data.status === 'success') {
            toast.success('product added successfully ')
            setCounter(data.numOfCartItems)
            setBtnLoading(true)

        }

    }
    async function getSingleProduct() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${params.id}`)
        setProduct(data.data)
        setLoading(false)
    }
    useEffect(() => {
        getSingleProduct()
    }, [])
    if (loading) {
        return <div className="d-flex justify-content-center mt-3"> <i className="fa-solid fa-spinner fa-spin  fa-5x color-main"></i></div>
    }
    return (
        <>
            <div className="container">
                <div className="row">



                    <div className="col-md-3">
                        <img className='w-100' src={product.imageCover} alt="" />
                        <div className='d-flex'>
                            <img className='w-50' src={product.brand.image} alt="" />
                            {/* <h2 className='fw-bold'>{product.brand.name}</h2> */}
                        </div>
                        <p className='fs-7 fw-bold'>Available : <span className='text-danger'>{product.quantity} unit</span> </p>
                    </div>
                    <div className="col-md-9">
                        <div className='mt-5 '>
                            <h2 className='fw-bold'>{product.title}</h2>
                            <p className='grey-color'>{product.description}</p>
                            <p>{product.category.name}</p>
                        </div>

                        <div className="m-2 price-ratings d-flex justify-content-between">
                            <span className='fw-bold fs-5' >{product.price + ' EGP'}</span>
                            <span>
                                <i className='fa fa-star rating-color'></i>
                                <span >{' ' + product.ratingsAverage}</span>
                            </span>
                        </div>

                        <div className="m-3">
                            <button disabled={!btnLoading} onClick={() => addProductToCart(product._id)} className='btn bg-main text-white w-100'>

                                {btnLoading ? 'Add To Cart' : <i className='fa fa-spinner fa-spin'></i>}

                            </button>
                        </div>
                    </div>



                </div>
            </div>
        </>
    )
}
