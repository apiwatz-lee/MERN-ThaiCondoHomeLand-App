import React from 'react'
import { FaLocationDot,FaHouse,FaTiktok } from "react-icons/fa6";
import { BiSolidVideos } from "react-icons/bi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaLine } from "react-icons/fa";



const ProductInfo = ({productDetail,handlePreview,preview,role}) => {

  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <>
        <div className='xl:w-[50%] flex flex-col-reverse xl:flex-col justify-evenly gap-5 bg-gray-100 rounded-3xl shadow-2xl py-10 xl:py-0 xl:h-[70vh]'>
          <h1 className='hidden xl:block w-full pt-5 xl:pt-0 font-bold text-xl xl:text-2xl text-center text-gray-800'>({productDetail[0]?.sell}) {productDetail[0]?.name}</h1>

          <section className='w-full px-5 text-center xl:text-start flex flex-col justify-evenly items-center min-h-[350px]'>
 
            <div className='flex flex-col xl:flex-row gap-3 xl:gap-10'>

            <h2 className='font-bold underline xl:hidden text-xl'>Location</h2>
            <div className='flex flex-col justify-center items-start xl:hidden'>
              <p className='text-gray-800 font-poppins'><span className='text-gray-500'>จังหวัด:</span> {productDetail[0]?.province}</p>
              <p className='text-gray-800 font-poppins'><span className='text-gray-500'>อำเภอ:</span> {productDetail[0]?.district}</p>
              <p className='text-gray-800 font-poppins'><span className='text-gray-500'>ตำบล:</span> {productDetail[0]?.subDistrict}</p>
            </div>

              <div className='flex flex-col justify-center items-center xl:justify-start gap-1 w-full'>
                <h2 className='font-bold underline text-xl w-full'>Description</h2>
                <pre className='font-poppins text-start mt-2'>{productDetail[0]?.description}</pre>
              </div>

              <div className='w-full flex flex-col gap-1'>
                <h2 className='font-bold underline hidden xl:block text-xl'>Location</h2>
                <div className='flex flex-col justify-center items-center hidden xl:block'>
                  <p className='text-gray-800 font-poppins'><span className='text-gray-500'>จังหวัด:</span> {productDetail[0]?.province}</p>
                  <p className='text-gray-800 font-poppins'><span className='text-gray-500'>อำเภอ:</span> {productDetail[0]?.district}</p>
                  <p className='text-gray-800 font-poppins'><span className='text-gray-500'>ตำบล:</span> {productDetail[0]?.subDistrict}</p>
                </div>

                <h2 className='font-bold underline text-xl'>Live</h2>
                <div className='w-full'>
                  <a href={productDetail[0]?.link} className='text-blue-700'>Click to see assets in video</a>
                </div>

                <h2 className='font-bold underline text-xl'>Contact</h2>
                <div className='flex gap-2 items-center justify-center xl:justify-start'>
                  <BsFillTelephoneFill className='text-gray-600'/>:
                  <p>0635954523</p>
                </div>
                <div className='flex gap-2 items-center justify-center xl:justify-start'>
                  <FaLine className='text-green-700'/>:
                  <p>@thaicondohomeland</p>
                </div>      
                        
                  
              </div>

              
            </div>

            <p className={`text-center text-green-700 font-bold text-xl my-2 xl:text-3xl mt-5 ${productDetail[0]?.status === 'ปิดการขาย'? 'hidden':null}`}>ราคา {productDetail[0]?.price && formatNumber(productDetail[0]?.price)} ฿</p>
           
          </section>
      
          <section className='flex flex-wrap justify-center gap-3 px-2'>
         
            { preview.length !== 0 ?                  
              productDetail[0]?.avatars?.map((item)=> 
                <img 
                  key={item.publicId}
                  src={item.url} 
                  alt="products" 
                  className={`${item.publicId === preview[0].publicId ? 'opacity-100' : 'opacity-20'} object-cover w-10 sm:w-20 h-18 sm:h-20  rounded-xl`}
                  onMouseOver={()=>handlePreview(item.publicId)}
              />)
              :
              productDetail[0]?.avatars.map((item)=> 
                <img 
                  key={item.publicId}
                  src={item.url} 
                  alt="products" 
                  className={`${item.publicId === productDetail[0].avatars[0].publicId ? 'opacity-100' : 'opacity-20'} object-cover w-10 sm:w-20 h-18 sm:h-20  rounded-xl`}
                  onMouseOver={()=>handlePreview(item.publicId)}
              />)                               
            }              
          </section>

        </div>
    </>
  )
}

export default ProductInfo