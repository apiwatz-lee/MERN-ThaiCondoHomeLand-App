import React from 'react'

const PreviewImage = ({preview,productDetail}) => {
  return (
    <>
         <section className='flex justify-center xl:w-[50%]'>
            
            {preview.length === 0 ?

            <img 
            src={productDetail[0]?.avatars[0].url}
            alt="products" 
            className='w-[95%] h-[300px] xl:h-[80vh] xl:w-full object-cover rounded-sm'
            />                          

            :
            
            <img 
            src={preview[0].url}
            alt="products" 
            className='w-[95%] h-[350px] xl:h-[80vh] xl:w-full object-cover rounded-sm'
            />  
              
            }
                        
        </section>
    </>
  )
}

export default PreviewImage