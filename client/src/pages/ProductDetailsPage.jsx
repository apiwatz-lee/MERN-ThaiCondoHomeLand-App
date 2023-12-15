import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import PreviewImage from '../components/PreviewImage'
import ProductInfo from '../components/ProductInfo'

const ProductDetails = () => {

  const [productDetail,setProductDetail] = useState([])
  const [preview,setPreview] = useState([])
  const params = useParams();
  
  const getProductById = async() => {
    try {
      const response = await axios.get(`http://localhost:4000/product/${params.id}`)
      setProductDetail(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getProductById()
  },[])

  const handlePreview = (id) => {
    const previewImg = productDetail[0].avatars.filter((avatar)=> avatar.publicId === id)
    setPreview(previewImg)
  }

  return (
    <main className='font-poppins w-screen flex flex-col items-center gap-5'>
        <h1 className='text-3xl font-medium w-[90vw] pt-5 text-center xl:text-start'>Product Details</h1>

        <section className='flex flex-col xl:flex-row justify-between w-[90vw]'>

          <PreviewImage
            preview={preview}
            productDetail={productDetail}
          />

          <ProductInfo 
            productDetail={productDetail}
            handlePreview={handlePreview}
            preview={preview}
          />
         
        </section>

    </main>
  )
}

export default ProductDetails