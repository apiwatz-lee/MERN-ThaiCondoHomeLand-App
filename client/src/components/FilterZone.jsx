import { IoFilter } from 'react-icons/io5';
import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import axios from 'axios';
import useFilterAssets from '../hooks/useFilterAssets';

const FilterZone = () => {
  const {
    fetchProvince,
    district,
    selectProvince,
    selectDistrict,
    setFetchProvince,
    setDistrict,
    setSubDistrict,
    isFilterOpen,
    setIsFilterOpen,
  } = useApp();

  const { handleResetFilter, checkIsNoFilter } = useFilterAssets();

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
    const findDistrict = district.find(
      (item) => item.option === selectDistrict
    );
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
  }, [district, selectDistrict]);

  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style = 'none';
    }
  }, [isFilterOpen]);

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
