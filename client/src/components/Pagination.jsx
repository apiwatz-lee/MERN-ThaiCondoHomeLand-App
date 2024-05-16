import { useApp } from '../context/AppContext';

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
        <div className='flex flex-col sm:flex-row w-auto justify-center items-center gap-10'>
          <button
            className={`p-3 rounded-full w-32 bg-slate-100 hover:bg-neutral-100 duration-300 ${
              page === 1 && 'text-gray-300 cursor-no-drop'
            }`}
            type='button'
            onClick={handlePrevious}
          >
            Previous
          </button>

          <p>
            {' '}
            {page} of {totalPage}
          </p>

          <button
            className={`p-3 rounded-full w-32 bg-slate-100 hover:bg-neutral-100 duration-300 
            ${page === totalPage && 'text-gray-300 cursor-no-drop'}
            `}
            type='button'
            onClick={page === totalPage ? () => setPage(1) : handleNext}
          >
            Next
          </button>
        </div>
      )}

      {page === totalPage && checkIsNoFilter() && (
        <button
          className='text-cyan-700 underline text-[15px]'
          onClick={() => setPage(1)}
        >
          back to home
        </button>
      )}
    </>
  );
};

export default Pagination;
