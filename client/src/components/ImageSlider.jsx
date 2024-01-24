import React from 'react';
import { customers } from '../data/Customers';
import '../App.css';
import '../css/ImageSlider.css';

const ImageSlider = () => {
  return (
    <section className='slide-wrapper'>
      <div className='slider'>
        <div className='slide-track'>
          {customers.map((item, index) => {
            return (
              <div className='slide' key={index}>
                <img
                  src={item.image}
                  key={item.id}
                  alt='customer'
                  className='image-customer'
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;
