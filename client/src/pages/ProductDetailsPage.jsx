import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PreviewImage from '../components/PreviewImage';
import ProductInfo from '../components/ProductInfo';

const ProductDetails = () => {
  const [productDetail, setProductDetail] = useState([]);
  const [preview, setPreview] = useState([]);
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

  return (
    <>
      <div className='font-poppins w-full flex flex-col items-center gap-5'>
        {/* <h1 className='text-3xl font-medium pt-5 text-center xl:text-start'>
          Asset Details
        </h1>

        <section className='flex flex-col gap-5 xl:flex-row justify-between items-center w-[90vw]'>
          <PreviewImage preview={preview} productDetail={productDetail} />

          <ProductInfo
            productDetail={productDetail}
            handlePreview={handlePreview}
            preview={preview}
          />
        </section> */}
        <div className='grid grid-cols-2 gap-5 w-full h-auto'>
          <img
            src={productDetail[0]?.avatars[0]?.url}
            className='row-span-2 h-full w-full object-cover rounded-xl'
          />
          <img
            src={productDetail[0]?.avatars[1]?.url}
            className='h-full w-full object-cover rounded-xl'
          />
          <img
            src={productDetail[0]?.avatars[2]?.url}
            className='h-full w-full object-cover rounded-xl'
          />
          {/* <div className={`border row-span-2`}>pic1</div>
          <div className='border'>pic2</div>
          <div className='border'>pic3</div> */}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
