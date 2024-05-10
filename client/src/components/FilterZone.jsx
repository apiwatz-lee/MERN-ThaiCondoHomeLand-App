import { IoFilter } from 'react-icons/io5';
import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import logo from '../assets/img/logo.png';
import DropDown from './DropDown';
import { sellOption, assetOption, statusOption } from '../data/Option';
import axios from 'axios';

const FilterZone = () => {
  const {
    selectSellType,
    setSelectSellType,
    selectAssetType,
    setSelectAssetType,
    fetchProvince,
    district,
    subDistrict,
    selectProvince,
    selectDistrict,
    setSelectProvince,
    setSelectDistrict,
    setSelectSubDistrict,
    setSelectStatus,
    selectSubDistrict,
    selectStatus,
    setFetchProvince,
    setDistrict,
    setSubDistrict,
    setIsLoading,
    setProducts,
    setTotalPage,
    isFilterOpen,
    setIsFilterOpen,
    keyword,
    setIsResetFilter,
    setKeyword,
    page,
    setPage,
  } = useApp();

  const server = import.meta.env.VITE_API;

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
    // const cloneProvice = [...fetchProvince];
    const findProvince = fetchProvince.find(
      (item) => item.option === selectProvince
    );
    const eachDistrict = findProvince.amphure;
    const districtOption = eachDistrict.map((item) => {
      return { id: item.id, option: item.name_th, tambon: item.tambon };
    });
    setDistrict(districtOption);
  };

  const handleFindSubDistrict = () => {
    // const cloneDistrict = [...district];
    const findDistrict = district.find(
      (item) => item.option === selectDistrict
    );
    const subDistrictOption = findDistrict?.tambon.map((item) => {
      return { id: item.id, option: item.name_th };
    });
    setSubDistrict(subDistrictOption);
  };

  const handleFilterAsset = async () => {
    try {
      setPage(1);
      const params = new URLSearchParams();
      params.append('sell', selectSellType);
      params.append('asset', selectAssetType);
      params.append('province', selectProvince);
      params.append('district', selectDistrict);
      params.append('subDistrict', selectSubDistrict);
      params.append('status', selectStatus);
      params.append('keyword', keyword);
      params.append('page', page);
      setIsLoading(true);
      const filter = await axios.get(`${server}/product?${params.toString()}`);
      setIsLoading(false);
      setIsFilterOpen(false);
      setProducts(filter?.data?.data);
      setTotalPage(filter?.data?.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetValue = () => {
    setSelectSellType('');
    setSelectAssetType('');
    setSelectProvince('');
    setSelectDistrict('');
    setSelectSubDistrict('');
    setSelectStatus('');
    setKeyword('');
    setPage(1);
    setIsResetFilter(true);
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
  }, [district, selectDistrict]);

  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style = 'none';
    }
  }, [isFilterOpen]);

  const checkIsNoFilter = () => {
    return (
      !selectAssetType &&
      !selectAssetType &&
      !selectProvince &&
      !selectDistrict &&
      !selectSubDistrict &&
      !selectStatus &&
      !keyword
    );
  };

  return (
    <>
      <section className='w-full flex gap-2'>
        <button
          className=' flex justify-center gap-2 items-center rounded-xl border p-3 px-4 bg-gray-200 hover:bg-gray-100 duration-300 cursor-pointer'
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <IoFilter />
          Filters
        </button>

        <button
          disabled={checkIsNoFilter()}
          className={` flex justify-center items-center gap-2 px-4 duration-300 text-sm ${
            checkIsNoFilter()
              ? 'cursor-no-drop text-gray-200'
              : 'cursor-pointer text-red-500'
          }`}
          onClick={handleResetValue}
        >
          {/* <IoFilter /> */}
          Reset filters
        </button>
      </section>

      {isFilterOpen && (
        <section
          className='fixed backdrop-blur-[5px] bg-black/80 w-full h-full top-0 z-50 flex justify-center items-center'
          onClick={() => setIsFilterOpen(false)}
        >
          <div
            className='xl:min-w-[1240px] min-w-[280px] rounded-xl bg-slate-800 flex flex-col justify-between items-center p-8 shadow-xl duration-500 gap-5'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-between items-center w-48 '>
              <img src={logo} className='w-12 object-cover' />
              <h1 className='text-xl font-semibold text-white'>
                Filter Assets
              </h1>
            </div>

            <div className='xl:flex gap-10 grid grid-cols-2'>
              <DropDown
                title='Sell Type'
                id='sell_type'
                option={sellOption}
                setSelect={setSelectSellType}
                select={selectSellType}
                titleClass='text-white'
              />
              <DropDown
                title='Asset Type'
                titleClass='text-white'
                id='asset_type'
                option={assetOption}
                setSelect={setSelectAssetType}
                select={selectAssetType}
              />
              <DropDown
                title='Province'
                titleClass='text-white'
                option={fetchProvince}
                setSelect={setSelectProvince}
                select={selectProvince}
              />
              <DropDown
                title='District'
                titleClass='text-white'
                option={district}
                setSelect={setSelectDistrict}
              />
              <DropDown
                title='Sub District'
                titleClass='text-white'
                option={subDistrict}
                setSelect={setSelectSubDistrict}
                select={selectSubDistrict}
              />
              <DropDown
                title='Status'
                titleClass='text-white'
                option={statusOption}
                setSelect={setSelectStatus}
                select={selectStatus}
              />
            </div>

            <div className='text-white p-2 rounded-xl flex justify-center items-center gap-5 w-full'>
              <button
                onClick={() => setIsFilterOpen(false)}
                className='text-gray-300 p-2 rounded-xl w-32 hover:bg-slate-50 hover:text-black duration-300 '
              >
                Cancel
              </button>
              <button
                onClick={() => handleFilterAsset()}
                className='border p-2 rounded-xl w-32 bg-slate-800 hover:bg-slate-50 hover:text-black duration-300 '
              >
                Filter
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default FilterZone;
