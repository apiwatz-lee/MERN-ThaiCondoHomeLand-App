import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authentication';
import { jwtDecode } from 'jwt-decode';
import { useApp } from '../context/AppContext';
import ProductCard from './ProductCard';

const ProductList = () => {
  const {
    keyword,
    setIsLoading,
    page,
    setPage,
    totalPage,
    setTotalPage,
    products,
    setProducts,
    isResetFilter,
    setIsResetFilter,
    filterSell,
    filterAsset,
    filterProvince,
    filterDistrict,
    filterSubDistrict,
    filterStatus,
    isLoading,
  } = useApp();

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const server = import.meta.env.VITE_API;
  const [role, setRole] = useState(null);

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();
      params.append('keyword', keyword);
      params.append('page', page);
      params.append('sell', filterSell);
      params.append('asset', filterAsset);
      params.append('province', filterProvince);
      params.append('district', filterDistrict);
      params.append('subDistrict', filterSubDistrict);
      params.append('status', filterStatus);
      const result = await axios.get(`${server}/product?${params.toString()}`);
      setProducts(result?.data?.data);
      setTotalPage(result?.data?.total_pages);
      setIsResetFilter(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductDetails = (id) => {
    navigate(`/product/detail/${id}`);
  };

  const handleAuth = () => {
    if (isAuthenticated) {
      const token = localStorage.getItem('token');
      setRole(jwtDecode(token).role);
    }
  };

  const handleEdit = (id) => {
    navigate(`/product/upload/${id}`);
  };

  useEffect(() => {
    const handleKeyword = () => {
      //if user start to search by keywords, program will first set page to 1 in order to send to backend
      if (keyword) {
        setPage(1);
      }

      const delayDebounceFn = setTimeout(() => {
        fetchProducts();
      }, 1000);

      return () => clearTimeout(delayDebounceFn);
    };

    handleKeyword();
  }, [keyword]);

  useEffect(() => {
    const handleFetchData = async () => {
      // await setIsLoading(true); //comment because avoid loading when page change
      await fetchProducts();
      await setIsLoading(false);
    };

    handleFetchData();

    //page -- when handle page
    //total page -- when filter
    //isResetFilter -- when reset filter
  }, [page, totalPage, isResetFilter]);

  useEffect(() => {
    handleAuth();
  }, []);

  return (
    <section className='w-full flex justify-center items-center  flex-wrap gap-10 my-8 '>
      {!isLoading && totalPage !== 0 && (
        <>
          {products?.length > 0 &&
            products?.map((item) => {
              return role === 'admin' ? (
                <ProductCard
                  key={item?._id}
                  role={role}
                  item={item}
                  handleEdit={handleEdit}
                  handleProductDetails={handleProductDetails}
                />
              ) : (
                <ProductCard
                  key={item?._id}
                  role={role}
                  item={item}
                  handleEdit={handleEdit}
                  handleProductDetails={handleProductDetails}
                />
              );
            })}
        </>
      )}

      {totalPage === 0 && <>ไม่พบทรัพย์ที่คุณกำลังค้นหา</>}
    </section>
  );
};

export default ProductList;
