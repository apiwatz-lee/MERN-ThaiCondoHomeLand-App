import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  AiOutlineArrowLeft as ArrowLeft,
  AiOutlineArrowRight as ArrowRight,
} from 'react-icons/ai';
import { FaLine as LineIcon, FaPhoneAlt as PhoneIcon } from 'react-icons/fa';
import { FaVideo as VideoIcon } from 'react-icons/fa';

const ProductDetails = () => {
  const [productDetail, setProductDetail] = useState([]);
  const [tab, setTab] = useState('description');
  const [isLoading, setIsLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const params = useParams();
  const server = import.meta.env.VITE_API;

  const getProductById = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${server}/product/${params?.id}`);
      setProductDetail(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    getProductById();
  }, []);

  return (
    <>
      {!isLoading && productDetail.length > 0 && (
        <div className='font-poppins w-full flex flex-col xl:flex-row xl:items-start justify-center gap-10 lg:gap-32 '>
          {/* Image section */}

          <div className='relative flex max-w-screen-lg justify-center items-center'>
            <ArrowLeft
              className='absolute top-[50%] left-0 text-2xl cursor-pointer z-20 text-white rounded-full bg-opacity-50 bg-slate-300 p-2 w-12 h-12'
              onClick={handlePrevious}
            />
            <ArrowRight
              className='absolute top-[50%] right-0 text-2xl cursor-pointer z-20 text-white rounded-full bg-opacity-50 bg-slate-300 p-2 w-12 h-12'
              onClick={handleNext}
            />

            {productDetail[0]?.avatars?.length > 0 &&
              productDetail[0]?.avatars?.map((item, index) => {
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

            {/* Tiktok link */}
            {productDetail[0]?.link && (
              <div
                className='absolute top-2 right-1 text-sm cursor-pointer border flex items-center bg-gray-300 bg-opacity-60 p-1 rounded-xl gap-1 lg:right-16 lg:top-2 xl:right-0 xl:top-0'
                onClick={() => window.open(`${productDetail[0]?.link}`)}
              >
                <VideoIcon className='p-1 text-red-600 text-3xl rounded-lg' />
                <div className='animate-bounce text-red-600 font-bold'>
                  Live
                </div>
              </div>
            )}
          </div>

          {/* Description Panel */}
          <div className='p-4 rounded-3xl flex flex-col border w-full xl:w-[40%] shadow-md lg:sticky lg:top-10'>
            {/* Tab Description */}
            <div className='flex justify-between items-center h-10'>
              <button
                className={`border-b-2 w-full min-w-[105px] text-center p-2  text-lg ${
                  tab === 'description' &&
                  'border-b-cyan-600 text-cyan-600 font-bold'
                }`}
                onClick={() => setTab('description')}
              >
                รายละเอียด
              </button>
              <button
                className={`border-b-2 w-full text-center p-2 text-lg ${
                  tab === 'location' &&
                  'border-b-cyan-600 text-cyan-600 font-bold'
                }`}
                onClick={() => setTab('location')}
              >
                ทำเลที่ตั้ง
              </button>

              <button
                className={`hidden sm:block border-b-2 w-full text-center p-2  text-lg ${
                  tab === 'contact' &&
                  'border-b-cyan-600 text-cyan-600 font-bold'
                }`}
                onClick={() => setTab('contact')}
              >
                ติดต่อ
              </button>
            </div>

            {tab === 'description' && (
              <div className='p-4 whitespace-pre-wrap text-lg font-normal'>
                {productDetail[0]?.description}
              </div>
            )}

            {tab === 'location' && (
              <div className='p-4'>
                <div className='py-4 px-5 sm:px-10 bg-gray-100 flex justify-between'>
                  <div className='w-60'>จังหวัด</div>
                  <div className='w-full'>{productDetail[0]?.province}</div>
                </div>

                <div className='py-4 px-5 sm:px-10 flex justify-between'>
                  <div className='w-60'>อำเภอ</div>
                  <div className='w-full'>{productDetail[0]?.district}</div>
                </div>

                <div className='py-4 px-5 sm:px-10 bg-gray-100 flex justify-between'>
                  <div className='w-60'>ตำบล</div>
                  <div className='w-full'>{productDetail[0]?.subDistrict}</div>
                </div>
              </div>
            )}

            {/* Contact Panel Desktop */}
            {tab === 'contact' && (
              <div className='p-10 text-lg font-normal flex justify-center items-center flex-wrap gap-3 w-full'>
                <button
                  className='border border-cyan-600 text-cyan-600 p-2 px-4 flex justify-center items-center gap-3 rounded-lg'
                  onClick={() => window.open('https://lin.ee/US48sck')}
                >
                  <LineIcon />
                  <span> ติดต่อผ่านไลน์</span>
                </button>
                <a href='tel:+0635954524'>
                  <button className='border border-cyan-600 text-cyan-600 p-2 px-4 flex justify-center items-center gap-3 rounded-lg'>
                    <PhoneIcon /> โทร 063-595-4524
                  </button>
                </a>
              </div>
            )}
          </div>

          {/* Contact Panel Mobile */}
          <div className='p-4 sm:hidden rounded-3xl flex flex-col border w-full xl:w-[40%] shadow-md lg:sticky lg:top-10 gap-3'>
            <div className='flex justify-between items-center h-10'>
              <button className={` border-b-2 w-full text-center p-2 text-lg`}>
                ติดต่อ
              </button>
            </div>
            <div className='p-2 text-lg font-normal flex flex-wrap justify-center items-center gap-3 w-full'>
              <button
                className='border border-cyan-600 text-cyan-600 p-2 flex justify-start items-center gap-3 text-sm rounded-lg w-full max-w-[176px]'
                onClick={() => window.open('https://lin.ee/US48sck')}
              >
                <LineIcon />
                <span> ติดต่อผ่านไลน์</span>
              </button>
              <a href='tel:+0635954524' className='w-full max-w-[176px]'>
                <button className='border border-cyan-600 text-cyan-600 p-2 flex justify-start items-center gap-3 text-sm rounded-lg w-full '>
                  <PhoneIcon /> <span>โทร 063-595-4524</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
