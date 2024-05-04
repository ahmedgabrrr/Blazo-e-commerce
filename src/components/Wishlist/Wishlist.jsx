
import React, { useContext, useEffect, useState } from 'react'

import { wishlistContext } from '../../context/wishlistContext'
import { toast } from 'react-toastify'



export default function Cart() {
    let [loading, setLoading] = useState(true)
    let [items, setItems] = useState([])



    let { getWishlist, removeItem } = useContext(wishlistContext)
    useEffect(() => {
        (async () => {
            let data = await getWishlist()
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
            setItems(data.data)


        }

    }




    if (loading) return <div className="d-flex justify-content-center  mb-big mt-3">
        <i className="fa-solid fa-spinner fa-spin  fa-5x color-main"></i>
    </div>


    return (
        <>
            <div className="container my-2 bg-main-light">
                <h2 className='p-3'>Your Wishlist:</h2>

                {
                    items?.map(item => {
                        return <div key={item.id} className="row">
                            <div className="col-md-2 mb-3">
                                <img className='w-100' src={item.imageCover} alt="" />

                            </div>
                            <div className="col-md-10 d-flex justify-content-between">
                                <div>
                                    <h3>{item.title}</h3>
                                    <span className='text-main fw-bold'>Price:{' ' + item.price}</span> <span>EGP</span>


                                    <button onClick={() => { deleteProduct(item.id) }} className='btn text-danger fw-bold d-block my-5 p-0' >
                                        <i className='fa fa-trash '></i>
                                        Remove


                                    </button>

                                </div>
                            </div>

                        </div>
                    })
                }

            </div>
        </>
    )
}
