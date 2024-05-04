import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { cartContext } from '../../context/cartContext'


export default function Address() {
    let { id } = useParams()
    let navigate = useNavigate()
    let [error, setError] = useState('')
    let [loading, setLoading] = useState(true)
    let { order } = useContext(cartContext)


    async function payOnline(values) {
        setLoading(false)
        let data = await order(id, values)
        console.log(data);
        setLoading(true)
        if (data.status === 'success') {
            window.location.href = data.session.url
        }

    }

    let address = useFormik({
        initialValues: {

            details: '',
            phone: '',
            city: ''

        },
        validationSchema,

        onSubmit: (values) => {
            payOnline(values)

        }
    })
    function validationSchema() {
        let schema = new Yup.object({

            details: Yup.string().required(),
            phone: Yup.string().required(),
            city: Yup.string().required(),

        })
        return schema
    }

    return (
        <>
            <div className="w-75 m-auto mt-3 mb-3">
                <h2 className='mb-5 mt-3 fs-3 fw-bold'>Order Now !</h2>
                <form onSubmit={address.handleSubmit}>

                    <label htmlFor="details">Address Details</label>
                    <textarea placeholder='Enter your address details...' onBlur={address.handleBlur} onChange={address.handleChange} name="details" id="details" className='form-control mb-3' ></textarea>
                    {address.touched.details ? <div className="alert alert-danger">{address.errors.details}</div> : ''}


                    <label htmlFor="phone">phone</label>
                    <input placeholder='Enter your phone...' onBlur={address.handleBlur} onChange={address.handleChange} type="text" id='phone' name='phone' className='form-control mb-3' />
                    {address.touched.phone ? <div className="alert alert-danger">{address.errors.phone}</div> : ''}


                    <label htmlFor="city">city</label>
                    <input placeholder='Enter your city...' onBlur={address.handleBlur} onChange={address.handleChange} type="text" id='city' name='city' className='form-control mb-3' />
                    {address.touched.city ? <div className="alert alert-danger">{address.errors.city}</div> : ''}






                    <button disabled={!(address.dirty && address.isValid)} type='submit' className='btn bg-main text-white'>
                        {loading ? 'Save' : <i className='fa fa-spinner fa-spin'></i>}
                    </button>
                </form>
            </div>
        </>
    )
}
