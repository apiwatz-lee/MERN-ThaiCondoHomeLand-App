import { IoFilter } from 'react-icons/io5';
import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import axios from 'axios';

const FilterZone = () => {
  const {
    isFilterOpen,
    setIsFilterOpen,
    keyword,
    setKeyword,
    setPage,
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
  } = useApp();

  const handleResetFilter = () => {
    setFilterSell('');
    setFilterAsset('');
    setFilterProvince('');
    setFilterDistrict('');
    setFilterSubDistrict('');
    setFilterStatus('');
    setKeyword('');
    setPage(1);
    setIsResetFilter(true);
  };

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
          onClick={handleResetFilter}
        >
          Reset filters
        </button>
      </section>
    </>
  );
};

export default FilterZone;
