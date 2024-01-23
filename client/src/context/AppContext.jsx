import React from 'react';
import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [fullPrice, setFullPrice] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [avatars, setAvatars] = useState([]);
  const [fetchProvince, setFetchProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [subDistrict, setSubDistrict] = useState([]);
  const [selectProvince, setSelectProvince] = useState('');
  const [selectDistrict, setSelectDistrict] = useState('');
  const [selectSubDistrict, setSelectSubDistrict] = useState('');
  const [selectSellType, setSelectSellType] = useState('');
  const [selectAssetType, setSelectAssetType] = useState('');
  const [selectStatus, setSelectStatus] = useState('');
  const [link, setLink] = useState('');

  const [isCancel, setIsCancel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isUploadCompleted, setIsUploadCompleted] = useState(false);
  const [isUpdatedCompleted, setIsUpdatedCompleted] = useState(false);
  const [isDeleteCompleted, setIsDeleteCompleted] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const [keyword, setKeyword] = useState('');
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  return (
    <AppContext.Provider
      value={{
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
        isCancel,
        setIsCancel,
        isLoading,
        setIsLoading,
        isSubmit,
        setIsSubmit,
        isUpdate,
        setIsUpdate,
        isUploadCompleted,
        setIsUploadCompleted,
        isUpdatedCompleted,
        setIsUpdatedCompleted,
        isDelete,
        setIsDelete,
        isDeleteCompleted,
        setIsDeleteCompleted,
        keyword,
        setKeyword,
        cart,
        setCart,
        totalAmount,
        setTotalAmount,
        totalQuantity,
        setTotalQuantity,
        page,
        setPage,
        totalPage,
        setTotalPage,
        isPaymentSuccess,
        setIsPaymentSuccess,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => useContext(AppContext);

export { AppProvider, useApp };
