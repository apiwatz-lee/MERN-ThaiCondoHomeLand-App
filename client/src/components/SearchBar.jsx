import React from 'react';
import { PiMagnifyingGlassThin } from 'react-icons/pi';
import { useApp } from '../context/AppContext';

const SearchBar = () => {
  const { keyword, setKeyword } = useApp();

  return (
    <div className='relative'>
      <input
        type='text'
        className='border w-[90vw] h-14 rounded-full pl-14 outline-none placeholder:text-gray-400 placeholder:font-light text-gray-500'
        placeholder='Search assets by your keywords'
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />

      <PiMagnifyingGlassThin className='absolute top-[18px] left-[30px] text-xl text-gray-400' />
    </div>
  );
};

export default SearchBar;
