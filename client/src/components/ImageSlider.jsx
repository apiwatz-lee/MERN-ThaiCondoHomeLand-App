import React, { Component } from 'react';
import Slider from 'react-slick';
import { customers } from '../data/Customers';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/ReactSlick.css';

const ImageSlider = () => {
  let settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 3000,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1535,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings} className='rounded-xl'>
        {customers.map((item, index) => (
          <div key={index}>
            <img
              src={item?.image}
              className='object-cover rounded-lg aspect-square w-full h-[400px] lg:max-w-[600px] 2xl:max-w-[480px] my-0 mx-auto'
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
