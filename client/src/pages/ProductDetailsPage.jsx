import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PreviewImage from '../components/PreviewImage';
import ProductInfo from '../components/ProductInfo';
import Navigator from '../components/Navigator';

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

  useEffect(() => {
    getProductById();
  }, []);

  const handlePreview = (id) => {
    const previewImg = productDetail[0].avatars.filter(
      (avatar) => avatar.publicId === id
    );
    setPreview(previewImg);
  };

  console.log({ product: productDetail });

  return (
    <>
      {/* <Navigator /> */}
      <section className='font-poppins w-full flex flex-col items-center gap-5'>
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
        <div className='grid grid-cols-2 gap-10 border w-full h-[500px]'>
          <div className={`border row-span-2`}>pic1</div>
          <div className='border'>pic2</div>
          <div className='border'>pic3</div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
