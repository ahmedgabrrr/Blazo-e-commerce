import React from 'react'

export default function Footer() {
    return (
        <>
            <div className="bg-sky py-2">
                <div className="container ">
                    <h3>Get The Fresh Cart App</h3>
                    <p className='grey-color'>We Well Send You A Link To Install The App </p>

                    <input placeholder='email' type="text" className='form-control mb-3 w-75' />
                    <button className='btn bg-main fw-bold text-white mb-2 footer-btn fs-7'>Share Link</button>

                    <p className='text-center'>
                        Designed with
                        <i className='fa fa-heart text-danger px-1'></i>
                        by <a href="https://wa.me/+201064907076" target='blank' className='text-danger fw-bold'> Ahmed Gabr</a>
                    </p>
                </div>
            </div>
        </>
    )
}
