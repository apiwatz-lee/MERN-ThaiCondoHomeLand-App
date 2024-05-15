import React from 'react';
import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  // Get Products API
  const [products, setProducts] = useState([]);

  // Get Thailand location module
  const [fetchProvince, setFetchProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [subDistrict, setSubDistrict] = useState([]);

  // Upload module
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [fullPrice, setFullPrice] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [avatars, setAvatars] = useState([]);
  const [selectProvince, setSelectProvince] = useState('');
  const [selectDistrict, setSelectDistrict] = useState('');
  const [selectSubDistrict, setSelectSubDistrict] = useState('');
  const [selectSellType, setSelectSellType] = useState('');
  const [selectAssetType, setSelectAssetType] = useState('');
  const [selectStatus, setSelectStatus] = useState('');
  const [link, setLink] = useState('');

  // Alert upload toast chakra ui module
  const [isCancel, setIsCancel] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isUploadCompleted, setIsUploadCompleted] = useState(false);
  const [isUpdatedCompleted, setIsUpdatedCompleted] = useState(false);
  const [isDeleteCompleted, setIsDeleteCompleted] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  // Payment module
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  // Cart module
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [cart, setCart] = useState([]);

  // Filter module
  const [keyword, setKeyword] = useState('');
  const [isResetFilter, setIsResetFilter] = useState(false);
  const [filterSell, setFilterSell] = useState('');
  const [filterAsset, setFilterAsset] = useState('');
  const [filterProvince, setFilterProvince] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterSubDistrict, setFilterSubDistrict] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Pagination module
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null); //initial state to null for validate button "กลับสู่หน้าแรก" as for pagination

  const checkIsNoFilter = () => {
    return (
      !filterSell &&
      !filterAsset &&
      !filterProvince &&
      !filterDistrict &&
      !filterSubDistrict &&
      !filterStatus &&
      !keyword
    );
  };

  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
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
        setIsFilterOpen,
        isFilterOpen,
        isResetFilter,
        setIsResetFilter,
        filterSell,
        setFilterSell,
        filterAsset,
        setFilterAsset,
        filterProvince,
        setFilterProvince,
        filterDistrict,
        setFilterDistrict,
        filterSubDistrict,
        setFilterSubDistrict,
        filterStatus,
        setFilterStatus,
        checkIsNoFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => useContext(AppContext);

export { AppProvider, useApp };
