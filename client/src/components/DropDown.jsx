import React from 'react'

const DropDown = ({title,id,option,setSelect}) => {
  return (
    <div className='flex flex-col justify-center items-center gap-2'>
      <label htmlFor={id}>{title}</label>
      <select
        name={id}
        id={id}
        className='border w-36 outline-none rounded-full p-1 text-gray-500 font-light'
        onChange={(e) => setSelect(e.target.value)}
      >
        <option value='' className='text-center'>
          -- choose --
        </option>
        {option.map((item) => {
          return (
            <option value={item.option} className='text-center' key={item.id}>
              {item.option}
            </option>
          );
        })}

      </select>
  </div>
  )
}

export default DropDown