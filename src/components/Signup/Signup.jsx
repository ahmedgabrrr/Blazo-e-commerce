import axios from 'axios'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'


export default function Signup() {
    let navigate = useNavigate()
    let [error, setError] = useState('')
    let [loading, setLoading] = useState(true)

    function sendDataToApi(values) {
        setLoading(false)
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
            .then(({ data }) => {

                if (data.message == 'success') {
                    navigate('/signin')
                }
            })
            .catch((err) => {
                setError(err.response.data.message)
                setLoading(true)
            })


    }

    // Custom Validation:-
    // function validate(values) {
    //     const err = {}
    //     if (!values.name) {
    //         err.name = 'name is required !'

    //     }
    //     if (!values.email) {
    //         err.email = 'email is required !'
    //     }
    //     if (!/^[A-Z][A-Za-z0-9@$#]{6,}$/.test(values.password)) {
    //         err.password = 'password must be 7 characters or more and first letter must be CAPITAL letter !'
    //     }
    //     if (values.password !== values.rePassword) {
    //         err.rePassword = 'rePassword not match !'
    //     }
    //     return err
    function validationSchema() {
        let schema = new Yup.object({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().matches(/^[A-Z][A-za-z0-9@$#&!]{6,}$/, 'password must start with CAPITAL letter and minimun length is 7 characters').required('password field can\'t be empty'),
            rePassword: Yup.string().oneOf([Yup.ref('password')], 'passwords don\'t match ').required(),
        })
        return schema
    }
    let register = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
        },
        validationSchema,
        onSubmit: (values) => {
            sendDataToApi(values)

        }
    })

    return (
        <>
            <div className="w-75 m-auto mt-3 mb-3">
                <h2 className='mb-5 mt-3 fs-3 fw-bold text-main'>Register Now !</h2>
                <form onSubmit={register.handleSubmit}>
                    <label htmlFor="name">name</label>
                    <input placeholder='Enter your name...' onBlur={register.handleBlur} onChange={register.handleChange} type="text" id='name' name='name' className='form-control mb-3' />
                    {register.errors.name && register.touched.name ? <div className="alert alert-danger">{register.errors.phone}</div> : ''}

                    <label htmlFor="email">Email</label>
                    <input placeholder='Enter your email...' onBlur={register.handleBlur} onChange={register.handleChange} type="email" id='email' name='email' className='form-control mb-3' />
                    {register.errors.email && register.touched.email ? <div className="alert alert-danger">{register.errors.email}</div> : ''}


                    <label htmlFor="password">Password</label>
                    <input placeholder='Enter your password...' onBlur={register.handleBlur} onChange={register.handleChange} type="password" id='password' name='password' className='form-control mb-3' />
                    {register.errors.password && register.touched.password ? <div className="alert alert-danger">{register.errors.password}</div> : ''}

                    <label htmlFor="rePassword">Re-Password</label>
                    <input placeholder='Re-Enter your password...' onBlur={register.handleBlur} onChange={register.handleChange} type="password" id='rePassword' name='rePassword' className='form-control mb-3' />
                    {register.errors.rePassword && register.touched.rePassword ? <div className="alert alert-danger">{register.errors.rePassword}</div> : ''}

                    {error != '' ? <div className="alert alert-danger">
                        <i className="fa-solid fa-triangle-exclamation"></i>
                        {' ' + error}
                    </div> : ''}







                    <button disabled={!(register.dirty && register.isValid)} type='submit' className='btn bg-main text-white'>
                        {loading ? 'Sign Up' : <i className='fa fa-spinner fa-spin'></i>}
                    </button>
                </form>
            </div>
        </>
    )
}
