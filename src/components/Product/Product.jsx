import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { cartContext } from '../../context/cartContext'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { wishlistContext } from '../../context/wishlistContext';

export default function Product({ item }) {

    let { setCounter, addToCart } = useContext(cartContext)
    let { addToWishlist } = useContext(wishlistContext)
    let token = localStorage.getItem('token')


    let [btnLoading, setBtnLoading] = useState(true)
    let [wishbtnLoading, setWishBtnLoading] = useState(true)

    async function addProductToCart(productId) {
        setBtnLoading(false)
        let data = await addToCart(productId)

        if (data.status === 'success') {
            toast.success('product added successfully ')
            setCounter(data.numOfCartItems)
            setBtnLoading(true)

        }

    }
    async function addProductToWishlist(productId) {
        setWishBtnLoading(false)
        let data = await addToWishlist(productId)

        if (data.status === 'success') {
            toast.success('product added successfully ')

            setWishBtnLoading(true)

        }

    }
    return (
        <>
            <div className="mb-3 col-md-3 col-sm-6">
                <div className=" product fw-semibold cursor-pointer">
                    <Link to={'/product/' + item._id}>
                        <img height='300px' className=' w-100' src={item.imageCover} alt="" />
                        <p className='m-2 fs-7 color-main'>{item.category.name}</p>
                        <h6 className='m-2 fs-5 fw-bold'>{item.title.split(" ").slice(0, 2).join(" ")}</h6>
                        <div className="m-2 price-ratings d-flex justify-content-between">
                            <span className='grey-color'>{item.price + ' EGP'}</span>
                            <span>
                                <i className='fa fa-star rating-color'></i>
                                <span >{' ' + item.ratingsAverage}</span>
                            </span>
                        </div>
                    </Link>
                    <div className="m-3">
                        <button disabled={!btnLoading || !token} onClick={() => addProductToCart(item._id)} className='btn bg-main text-white w-100'>

                            {btnLoading ? 'Add To Cart' : <i className='fa fa-spinner fa-spin'></i>}
                        </button>
                    </div>
                    <div className="m-3">
                        <button disabled={!wishbtnLoading} onClick={() => addProductToWishlist(item._id)} className='btn bg-main text-white w-100'>

                            {wishbtnLoading || !token ? 'Add To Wishlist' : <i className='fa fa-spinner fa-spin'></i>}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
