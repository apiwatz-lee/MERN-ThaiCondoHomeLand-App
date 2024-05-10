import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PreviewImage from '../components/PreviewImage';
import ProductInfo from '../components/ProductInfo';
import {
  AiOutlineArrowLeft as ArrowLeft,
  AiOutlineArrowRight as ArrowRight,
} from 'react-icons/ai';

const ProductDetails = () => {
  const [productDetail, setProductDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [preview, setPreview] = useState([]);
  const [current, setCurrent] = useState(0);
  const params = useParams();
  const server = import.meta.env.VITE_API;

  const getProductById = async () => {
    try {
      const response = await axios.get(`${server}/product/${params.id}`);
      setProductDetail(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreview = (id) => {
    const previewImg = productDetail[0].avatars.filter(
      (avatar) => avatar.publicId === id
    );
    setPreview(previewImg);
  };

  useEffect(() => {
    getProductById();
  }, []);

  const handlePrevious = () => {
    setCurrent((prev) =>
      prev === 0 ? productDetail[0]?.avatars.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrent((prev) =>
      prev === productDetail[0]?.avatars.length - 1 ? 0 : prev + 1
    );
  };

  console.log(productDetail);

  return (
    <>
      <div className='font-poppins w-full flex flex-col items-center gap-5 '>
        {/* Image */}
        <div className='relative flex max-w-screen-lg justify-center items-center'>
          <ArrowLeft
            className='absolute top-[50%] left-0 text-4xl cursor-pointer z-20 text-white rounded-full bg-opacity-50 bg-slate-900'
            onClick={handlePrevious}
          />
          <ArrowRight
            className='absolute top-[50%] right-0 text-4xl cursor-pointer z-20 text-white rounded-full bg-opacity-50 bg-slate-900'
            onClick={handleNext}
          />

          {productDetail[0]?.avatars.length > 0 &&
            productDetail[0]?.avatars.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    current === index
                      ? 'opacity-100 scale-105 duration-1000'
                      : 'opacity-0'
                  }`}
                >
                  {current === index && (
                    <img
                      key={index}
                      src={item?.url}
                      className='max-h-[700px] rounded-lg aspect-square object-cover'
                    />
                  )}
                </div>
              );
            })}
        </div>

        {/* Detail */}
        <div className='w-full'>test</div>
      </div>
    </>
  );
};

export default ProductDetails;
