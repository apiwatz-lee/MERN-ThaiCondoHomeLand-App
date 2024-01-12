import React from 'react'
import Dropzone from './Dropzone'
import Input from './Input'
import Button from './Button'
import { useContext } from 'react'
import { AppContext } from '../App'
import {useNavigate} from 'react-router-dom'
import { useToast } from '@chakra-ui/react';
import Textarea from './Textarea'
import { useEffect } from 'react'
import DropDown from './DropDown'
import { sellOption,assetOption,statusOption } from '../data/Option'
import axios from 'axios'
import { NumericFormat } from 'react-number-format';

const Form = ({params}) => {

    const server = import.meta.env.VITE_API

    const {name,
          setName,
          code,
          setCode,
          price,
          setPrice,
          description,
          setDescription,
          avatars,
          fetchProvince,
          setFetchProvince,
          district,
          setDistrict,
          subDistrict,
          setSubDistrict,
          selectProvince,
          setSelectProvince,
          selectDistrict,
          setSelectDistrict,
          selectSubDistrict,
          setSelectSubDistrict,
          selectSellType,
          setSelectSellType,
          selectAssetType,
          setSelectAssetType,
          selectStatus,
          setSelectStatus,
          link,
          setLink,
          setIsUpdate,
          setIsSubmit,
          setIsDelete} = useContext(AppContext)
          
    const navigate = useNavigate();
    const toast = useToast()

    const handleValidate = () => {
        if(avatars.length === 0){
          toast({
            title: 'Product image.',
            description: "Product image is required",
            status: 'error',
            duration: 2000,
            isClosable: true,
            position:'top'
          })
        }else if(name === ''){
          toast({
            title: 'Product name.',
            description: "Product name is required",
            status: 'error',
            duration: 2000,
            isClosable: true,
            position:'top'
          })
        }else if(code === ''){
          toast({
            title: 'Product code.',
            description: "Product code is required",
            status: 'error',
            duration: 2000,
            isClosable: true,
            position:'top'
          })
        }else if(price === ''){
          toast({
            title: 'Product price.',
            description: "Product price is required",
            status: 'error',
            duration: 2000,
            isClosable: true,
            position:'top'
          })
        }else if(String(price).charAt(0) == 0){
          toast({
            title: 'Product price.',
            description: "Price cannot start with 0",
            status: 'error',
            duration: 2000,
            isClosable: true,
            position:'top'
          })
        }else if(description === ''){
          toast({
            title: 'Product Description.',
            description: "Price description is required",
            status: 'error',
            duration: 2000,
            isClosable: true,
            position:'top'
        })
        }else if(params.id){
          setIsUpdate(true)
        }else{
          setIsSubmit(true)
        }
      }

      const fetchThaiData = async () => {
        try {
          const result = await axios.get(`${server}/province`);
          const provinceOption = result.data.data.map((item) => {
            return { id: item.id, option: item.name_th, amphure: item.amphure };
          });
          setFetchProvince(provinceOption);
        } catch (error) {
          console.log(error);
        }
      };
    
      const handleFindDistrict = () => {
        const cloneProvice = [...fetchProvince];
        const findProvince = cloneProvice.find((item) => item.option === selectProvince);
        const eachDistrict = findProvince.amphure;
        const districtOption = eachDistrict.map((item) => {
          return { id: item.id, option: item.name_th, tambon: item.tambon };
        });
        setDistrict(districtOption);
      };
    
      const handleFindSubDistrict = () => {
        const cloneDistrict = [...district];
        const findDistrict = cloneDistrict.find((item) => item.option === selectDistrict);
        const subDistrictOption = findDistrict?.tambon.map((item) => {
          return { id: item.id, option: item.name_th };
        });
        setSubDistrict(subDistrictOption);
      };
    
      useEffect(() => {
        fetchThaiData();
        if (selectProvince) {
          handleFindDistrict();
        }
      }, [selectProvince]);
    
      useEffect(() => {
       if (selectDistrict) {
          handleFindSubDistrict();
        }
      }, [district,selectDistrict]);


    return (
        <>
          <form className='flex flex-col gap-5 w-full py-5'>
            <h2 className='text-gray-700 text-lg text-center sm:text-left'>Upload Image</h2>
            <Dropzone/>
            <h3 className='text-center sm:text-right text-gray-400 text-sm font-light'>Image Upload ({avatars.length}/6)</h3>
            <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 my-5 gap-2'>
              <DropDown
                title='Sell Type'
                id='sell_type'
                option={sellOption}
                setSelect={setSelectSellType}
                select={selectSellType}
              />
              <DropDown
                title='Asset Type'
                id='asset_type'
                option={assetOption}
                setSelect={setSelectAssetType}
                select={selectAssetType}
              />
              <DropDown
                title='Province'
                id='province'
                option={fetchProvince}
                setSelect={setSelectProvince}
                select={selectProvince}
              />
              <DropDown
                title='District'
                id='district'
                option={district}
                setSelect={setSelectDistrict}
                select={selectDistrict}
              />
              <DropDown
                title='Sub District'
                id='sub_district'
                option={subDistrict}
                setSelect={setSelectSubDistrict}
                select={selectSubDistrict}
              />
              <DropDown
                title='Status'
                id='status'
                option={statusOption}
                setSelect={setSelectStatus}
                select={selectStatus}
              />
            </section>
            <Input 
                id='name' 
                title='Product name' 
                type='text' 
                placeholder='Product name' 
                value={name} 
                onChange={(e)=>{setName(e.target.value)}}/>
            <Input 
                id='code' 
                title='Code' 
                type='text' 
                placeholder='Code' 
                value={code} 
                onChange={(e)=>{setCode(e.target.value)}}/>
            <label name='price' className='font-light text-left'>Price</label>
            <NumericFormat
              value={price}
              thousandSeparator
              className='border rounded-full p-3 pl-7 placeholder:font-light placeholder:text-gray-300 outline-none text-gray-500 font-light'
              onChange={(e)=>{setPrice(e.target.value)}}
              placeholder='1,000,000'
            />
            <Textarea
                id='description'
                title='Description'
                placeholder='Product description'
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
              />
               <Input 
                id='link' 
                title='Link' 
                type='text' 
                placeholder='Tiktok link' 
                value={link} 
                onChange={(e)=>{setLink(e.target.value)}}/>
             
          <div className='flex justify-center gap-5 py-5 sm:p-10'>
            <Button 
                  className='border p-3 rounded-full w-28 sm:w-56 bg-white text-cyan-800 hover:bg-gray-200 hover:text-black duration-300' 
                  type='reset' 
                  title='Cancel' 
                  onClick={()=>navigate('/')}/>
            <Button 
                  className='border p-3 rounded-full w-28 sm:w-56 text-white bg-cyan-800 hover:bg-cyan-700 duration-300' 
                  type='button' 
                  title={params.id ? 'Update':'Post'} 
                  onClick={handleValidate}/>
          </div>

            {params.id &&     
                        <Button 
                          type='button'
                          onClick={()=>setIsDelete(true)}
                          className='border bg-red-700 text-white h-14 text-xl font-semibold rounded-xl mb-10 hover:bg-red-600 duration-300'
                          title = 'Delete' />
            }
         

          </form>
        </>
    )
}

export default Form