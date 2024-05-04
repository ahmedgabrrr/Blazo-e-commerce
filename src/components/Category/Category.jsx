import React from 'react'
import { Link } from 'react-router-dom'

export default function Category({ item }) {
    return (
        <>
            <Link to='/products' className="col-md-3 col-sm-6 mb-3 ">
                <img height='300px' className=' w-100' src={item.image} alt="" />
                <p className='m-2 fw-bold fs-6 color-main'>{item.name}</p>
            </Link>
        </>
    )
}
