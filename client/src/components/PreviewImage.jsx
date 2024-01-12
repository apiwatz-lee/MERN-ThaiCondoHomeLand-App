import React from 'react'

const PreviewImage = ({preview,productDetail}) => {
  return (
    <>
        <h1 className='xl:hidden text-center font-bold text-2xl rounded-xl w-[250px] bg-gray-50 p-2'>({productDetail[0]?.sell}) {productDetail[0]?.name}</h1>
         <div className='flex justify-center xl:w-[50%]'>
            {preview.length === 0 ?

            <img 
            src={productDetail[0]?.avatars[0].url}
            alt="products" 
            className='w-[95%] h-[350px] xl:h-[70vh] sm:w-[450px] xl:w-full object-cover rounded-3xl'
            />                          

            :
            
            <img 
            src={preview[0].url}
            alt="products" 
            className='w-[95%] h-[350px] xl:h-[70vh] sm:w-[450px] xl:w-full object-cover rounded-3xl'
            />  
              
            }
                        
        </div>
    </>
  )
}

export default PreviewImage