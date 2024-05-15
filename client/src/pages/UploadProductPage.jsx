import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ProductConfirmation from '../components/ProductConfirmation';
import Loading from '../components/Loading';
import Form from '../components/Form';
import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@chakra-ui/react';
import { FaChevronRight } from 'react-icons/fa';

const UploadProductPage = () => {
  const {
    name,
    setName,
    code,
    setCode,
    fullPrice,
    setFullPrice,
    price,
    setPrice,
    description,
    setDescription,
    avatars,
    setAvatars,
    setFetchProvince,
    selectSellType,
    setSelectSellType,
    selectAssetType,
    setSelectAssetType,
    selectProvince,
    setSelectProvince,
    selectDistrict,
    setSelectDistrict,
    selectSubDistrict,
    setSelectSubDistrict,
    selectStatus,
    setSelectStatus,
    link,
    setLink,
    setIsLoading,
    setIsSubmit,
    setIsUpdate,
    setIsUploadCompleted,
    setIsDelete,
    setIsUpdatedCompleted,
    setIsDeleteCompleted,
  } = useApp();

  const server = import.meta.env.VITE_API;
  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    setIsLoading(true);
    setIsUploadCompleted(false);
    const formData = new FormData();
    formData.append('sell', selectSellType);
    formData.append('asset', selectAssetType);
    formData.append('province', selectProvince);
    formData.append('district', selectDistrict);
    formData.append('subDistrict', selectSubDistrict);
    formData.append('status', selectStatus);
    formData.append('name', name);
    formData.append('code', code);
    formData.append('fullPrice', fullPrice.split(',').join(''));
    formData.append('price', price.split(',').join(''));
    formData.append('description', description);
    formData.append('link', link);
    avatars.forEach((file) => formData.append('avatar', file));
    handleUpload(formData);
  };

  const handleUpload = async (formData) => {
    try {
      await axios.post(`${server}/product/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setIsLoading(false);
      window.location.replace(window.location.origin); //to fix state unclear value
      // navigate('/');
      setIsUploadCompleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setIsUpdate(false);
      setIsLoading(true);
      setIsUpdatedCompleted(false);
      const data = {
        sell: selectSellType,
        asset: selectAssetType,
        province: selectProvince,
        district: selectDistrict,
        subDistrict: selectSubDistrict,
        status: selectStatus,
        name: name,
        code: code,
        fullPrice: fullPrice.split(',').join(''),
        price: price,
        description: description,
        link: link,
        avatars: avatars,
      };
      await axios.put(`${server}/product/upload/${params.id}`, data);
      setIsLoading(false);
      window.location.replace(window.location.origin);
      // navigate('/');
      setIsUpdatedCompleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setIsDelete(false);
      setIsLoading(true);
      await axios.delete(`${server}/product/${params.id}`);
      setIsDeleteCompleted(true);
      setIsLoading(false);
      window.location.replace(window.location.origin); //to fix state unclear value
    } catch (error) {
      console.log(error);
    }
  };

  const fetchThaiData = async () => {
    try {
      const result = await axios.get(`${server}/province`);
      const provinceOption = result?.data?.data?.map((item) => {
        return { id: item?.id, option: item?.name_th, amphure: item?.amphure };
      });
      setFetchProvince(provinceOption);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductById = async () => {
    try {
      const response = await axios.get(`${server}/product/${params?.id}`);
      setSelectSellType(response.data.data[0].sell);
      setSelectAssetType(response.data.data[0].asset);
      setSelectProvince(response.data.data[0].province);
      setSelectDistrict(response.data.data[0].district);
      setSelectSubDistrict(response.data.data[0].subDistrict);
      setSelectStatus(response.data.data[0].status);
      setAvatars([...response.data.data[0].avatars]);
      setName(response.data.data[0].name);
      setPrice(response.data.data[0].price);
      setCode(response.data.data[0].code);
      setDescription(response.data.data[0].description);
      setLink(response.data.data[0].link);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearValue = () => {
    setSelectSellType('');
    setSelectAssetType('');
    setSelectProvince('');
    setSelectDistrict('');
    setSelectSubDistrict('');
    setSelectStatus('');
    setAvatars([]);
    setName('');
    setFullPrice('');
    setPrice('');
    setCode('');
    setDescription('');
    setLink('');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params?.id) {
          await fetchThaiData();
          await getProductById();
        } else {
          handleClearValue();
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    setIsLoading(false);
  }, [params?.id]);

  return (
    <>
      <main className='font-poppins flex flex-col items-center gap-5 container mx-auto'>
        <Breadcrumb
          class='breadcrump-upload'
          spacing='5px'
          separator={<FaChevronRight className='text-cyan-700' />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>หน้าแรก</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage className='text-gray-400 truncate'>
            <BreadcrumbLink href='#'>อัพโหลด</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <section className='flex flex-col justify-center items-center w-[90%]'>
          <Form params={params} />
          <ProductConfirmation
            handleSubmit={handleSubmit}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        </section>
      </main>
    </>
  );
};

export default UploadProductPage;
