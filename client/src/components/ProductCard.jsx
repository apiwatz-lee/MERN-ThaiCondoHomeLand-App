import { MdEdit } from 'react-icons/md';
import { FaLocationDot, FaHouse } from 'react-icons/fa6';
import logo from '../assets/img/logo.png';

const ProductCard = ({
  role = 'user',
  item = [],
  handleEdit = () => {},
  handleProductDetails = () => {},
}) => {
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };
  return (
    <div
      className='w-[230px] h-[350px] flex flex-col justify-between rounded-2xl shadow-xl duration-300'
      key={item?._id}
    >
      <div className='relative'>
        {role === 'admin' && (
          <button
            onClick={() => handleEdit(item?._id)}
            className='absolute right-3 top-4 text-gray-200 bg-gray-600 rounded-full p-1 cursor-pointer hover:scale-110 duration-300 z-20'
          >
            <MdEdit />
          </button>
        )}

        <div className='relative'>
          <img
            src={item?.avatars[0]?.url}
            alt={item?.name}
            className={`border h-[200px] rounded-t-2xl object-cover w-[300px] cursor-pointer ${
              item?.status === 'ปิดการขาย' ? 'opacity-40' : null
            }`}
            onClick={() => handleProductDetails(item?._id)}
          />

          <span className='absolute top-7 left-3 flex justify-between items-center w-24'>
            <img
              src={logo}
              alt='ThaiCondoHomeLand'
              className='w-8 rounded-full absolute z-20'
            />
            <p
              className={`text-white text-sm w-full text-center absolute z-10 left-3 rounded-xl h-6 flex justify-center items-center font-bold 
      ${
        item?.status === 'ปิดการขาย'
          ? 'bg-red-500 pl-3'
          : item?.status === 'ติดจอง'
          ? 'bg-orange-600'
          : 'bg-cyan-600'
      }`}
            >
              {item?.status === 'ปิดการขาย' ? 'Sold out' : item?.sell}
            </p>
          </span>
          <span className='absolute bottom-2 right-3'>
            <p
              className={`text-white text-sm p-1 rounded-lg font-bold w-32 text-center ${
                item?.status === 'ยังอยู่'
                  ? 'bg-cyan-600'
                  : item?.status === 'ติดจอง'
                  ? 'bg-orange-600'
                  : 'bg-red-500'
              }`}
            >{`สถานะ : ${item?.status}`}</p>
          </span>
        </div>
        <h1 className='w-full font-semibold text-sm pt-2 pl-2'>{item?.name}</h1>
        <div className='font-light text-xs text-gray-400 pt-2 pl-2 rounded-lg flex gap-1 items-center'>
          <FaHouse />
          <p>{item?.asset}</p>
        </div>
        <div className='font-light text-xs text-gray-400 pt-2 pl-2 rounded-lg flex gap-1 items-center'>
          <FaLocationDot />
          <p>{item?.province}</p>
          <p>{item?.district}</p>
        </div>
      </div>
      <p className='text-end text-xs pr-2 line-through text-gray-400'>
        {item?.status !== 'ปิดการขาย' &&
          item?.fullPrice !== '' &&
          item?.fullPrice !== 0 &&
          item?.fullPrice !== item?.price &&
          `${formatNumber(item?.fullPrice)}฿`}
      </p>

      <p
        className={`text-right pb-4 pr-4 font-semibold ${
          item?.status === 'ยังอยู่'
            ? 'text-cyan-600'
            : item?.status === 'ติดจอง'
            ? 'text-orange-600'
            : null
        }`}
      >
        {item?.status !== 'ปิดการขาย' &&
          item?.price &&
          `${formatNumber(item?.price)} ฿`}
      </p>
    </div>
  );
};

export default ProductCard;
