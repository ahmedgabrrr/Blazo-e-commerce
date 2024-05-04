import axios from 'axios'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'


export default function Signin() {
    let navigate = useNavigate()
    let [error, setError] = useState('')
    let [loading, setLoading] = useState(true)

    function sendDataToApi(values) {
        setLoading(false)
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
            .then(({ data }) => {

                if (data.message === 'success') {
                    localStorage.setItem('token', data.token)
                    navigate('/home')

                }
            })
            .catch((err) => {
                setError(err.response.data.message)
                setLoading(true)
            })


    }
    function validationSchema() {
        let schema = new Yup.object({

            email: Yup.string().email().required(),
            password: Yup.string().matches(/^[A-Z][A-za-z0-9@$#&!]{6,}$/, 'password must start with CAPITAL letter and minimun length is 7 characters').required('password field can\'t be empty'),

        })
        return schema
    }
    let signin = useFormik({
        initialValues: {

            email: '',
            password: '',

        },
        validationSchema,
        onSubmit: (values) => {
            sendDataToApi(values)

        }
    })

    return (
        <>
            <div className="w-75 m-auto mt-3 mb-3">
                <h2 className='mb-5 mt-3 fs-3 fw-bold text-main'>You Must Signin First !</h2>
                <form onSubmit={signin.handleSubmit}>


                    <label htmlFor="email">Email</label>
                    <input placeholder='Enter your email...' onBlur={signin.handleBlur} onChange={signin.handleChange} type="email" id='email' name='email' className='form-control mb-3' />
                    {signin.errors.email && signin.touched.email ? <div className="alert alert-danger">{signin.errors.email}</div> : ''}


                    <label htmlFor="password">Password</label>
                    <input placeholder='Enter your password...' onBlur={signin.handleBlur} onChange={signin.handleChange} type="password" id='password' name='password' className='form-control mb-3' />
                    {signin.errors.password && signin.touched.password ? <div className="alert alert-danger">{signin.errors.password}</div> : ''}

                    {error !== '' ? <div className="alert alert-danger">
                        <i className="fa-solid fa-triangle-exclamation"></i>
                        {' ' + error}
                    </div> : ''}







                    <button disabled={!(signin.dirty && signin.isValid)} type='submit' className='btn bg-main text-white'>
                        {loading ? 'Sign Up' : <i className='fa fa-spinner fa-spin'></i>}
                    </button>
                </form>
            </div>
        </>
    )
}
