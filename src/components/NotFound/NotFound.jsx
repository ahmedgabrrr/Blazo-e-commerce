import React from 'react'
import error from '../../assets/error.svg'
export default function NotFound() {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center mt-5">
                <img src={error} alt="" />
            </div>
        </>
    )
}
