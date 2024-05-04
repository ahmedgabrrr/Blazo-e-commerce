import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Slider from 'react-slick';
import Categories from './Categories'

import { categoriesContext } from '../../context/categoriesContext'
import { Link } from 'react-router-dom';

export default function CategoriesSlider() {
    let [categories, setCategories] = useState([])
    let { getCategories } = useContext(categoriesContext)

    useEffect(() => {
        (async () => {
            let data = await getCategories()

            setCategories(data.data)
        })()
    }, [])

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1200,
    };
    // let [categories, setCategories] = useState([])
    // async function getCategories() {
    //     let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    //     setCategories(data.data)
    // }
    // useEffect(() => {
    //     getCategories()
    // }, [])

    return (
        <>
            <div className="container">
                <h3 className='my-5'>Shop Categories</h3>
                <Slider {...settings} className='my-5 '>

                    {categories.map(item => <div key={item._id} className='px-1'>
                        <Link to='/categories'>
                            <img src={item.image} height={150} className='w-100 ' alt="" /><p className='p-1'>{item.name}</p>
                        </Link>
                    </div>
                    )}


                </Slider>
            </div>
        </>
    )
}
