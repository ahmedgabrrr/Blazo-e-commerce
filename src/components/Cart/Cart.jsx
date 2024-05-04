
import React, { useContext, useEffect, useState } from 'react'

import { cartContext } from '../../context/cartContext'
import { toast } from 'react-toastify'

import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Cart() {
    let [loading, setLoading] = useState(true)
    let [items, setItems] = useState([])



    let { getCart, removeItem, setCounter, productQuantity } = useContext(cartContext)
    useEffect(() => {
        (async () => {
            let data = await getCart()
            if (data?.statusMsg === 'fail') {
                setItems(null)
                console.log(data.statusMsg);

            } else {

                setItems(data.data)
                setLoading(false)
            }
        })()
    }, [])

    async function deleteProduct(id) {

        let data = await removeItem(id)
        console.log(data);
        if (data.status === 'success') {

            toast.error('Product Deleted Successfully')
            setCounter(data.numOfCartItems)
            setItems(data.data)


        }

    }



    async function updateProductQuantity(id, count) {

        let data = await productQuantity(id, count)
        console.log(data);
        if (data.status === 'success') {
            toast.success('Product Updated Successfully')
            setCounter(data.numOfCartItems)
            setItems(data.data)
        }


    }


    if (loading) return <div className="d-flex justify-content-center  mb-big mt-3">
        <i className="fa-solid fa-spinner fa-spin  fa-5x color-main"></i>
    </div>


    return (
        <>
            <div className="container my-2 bg-main-light">
                <h2 className='p-3'>Shop Cart:</h2>
                <p className='p-3'>
                    Total Cart Price :
                    <span className='text-main fw-bold'>{' ' + items.totalCartPrice + ' '}</span>
                    EGP
                </p>
                {
                    items.products.map(item => {
                        return <div key={item._id} className="row">
                            <div className="col-md-2 mb-3">
                                <img className='w-100' src={item.product.imageCover} alt="" />
                                <Link to={`/address/${items._id}`} className='btn bg-main text-white w-100 fs-7'> Complete Order</Link>
                            </div>
                            <div className="col-md-10 d-flex justify-content-between">
                                <div>
                                    <h3>{item.product.title.split(" ").slice(0, 3).join(" ")}</h3>
                                    <span className='text-main fw-bold'>Price:{' ' + item.price * item.count + ' '}</span> <span>EGP</span>


                                    <button onClick={() => { deleteProduct(item.product._id) }} className='btn text-danger fw-bold d-block my-5 p-0' >
                                        <i className='fa fa-trash '></i>
                                        Remove


                                    </button>

                                </div>
                                <div>
                                    <button onClick={() => { updateProductQuantity(item.product._id, item.count + 1) }} className='b-1px-main mx-2'>+</button>
                                    <span> {item.count} </span>
                                    <button disabled={item.count <= 1} onClick={() => { updateProductQuantity(item.product._id, item.count - 1) }} className='b-1px-main mx-2'>-</button>
                                </div>
                            </div>

                        </div>
                    })
                }

            </div>

            <Footer />
        </>
    )
}
