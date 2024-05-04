import React from 'react'
import Slider from "react-slick";
import slider1 from "../../assets/slider1.avif"
import slider2 from "../../assets/slider2.avif"
import slider3 from "../../assets/slider3.avif"
import slider4 from "../../assets/slider4.avif"


export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };
  return (
    <>


      <div className="container">
        <Slider {...settings}>
          <img src={slider1} alt="" />
          <img src={slider2} alt="" />
          <img src={slider3} alt="" />
          <img src={slider4} alt="" />
        </Slider>
      </div>

    </>
  )
}
