import { useApp } from '../context/AppContext';
import {
  FaArrowRight as IconRight,
  FaArrowLeft as IconLeft,
} from 'react-icons/fa';

const Pagination = () => {
  const { page, setPage, totalPage, checkIsNoFilter } = useApp();

  const handlePrevious = () => {
    setPage((prev) => (prev !== 1 ? prev - 1 : prev));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    setPage((prev) => (prev !== totalPage ? prev + 1 : prev));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {totalPage > 1 && (
        <div className='flex sm:flex-row w-auto justify-center items-center gap-10'>
          <button
            className={`p-3 rounded-full bg-slate-100 active:bg-slate-300 hover:bg-neutral-100 duration-300 text-cyan-700 hover:scale-125 ${
              page === 1 && 'text-gray-300 cursor-no-drop hover:scale-100'
            }`}
            disabled={page === 1}
            type='button'
            onClick={handlePrevious}
          >
            <IconLeft />
          </button>

          <p>
            {page} / {totalPage}
          </p>

          <button
            className={`p-3 rounded-full bg-slate-100 active:bg-slate-300 hover:bg-neutral-100 duration-300 text-cyan-700 hover:scale-125
            ${
              page === totalPage &&
              'text-gray-300 cursor-no-drop hover:scale-100'
            }
            `}
            disabled={page === totalPage}
            type='button'
            onClick={handleNext}
          >
            <IconRight />
          </button>
        </div>
      )}

      {page === totalPage && checkIsNoFilter() && (
        <button
          className='text-cyan-700 underline text-[15px] '
          onClick={() => setPage(1)}
        >
          back to home
        </button>
      )}
    </>
  );
};

export default Pagination;
