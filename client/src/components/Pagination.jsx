import { useApp } from '../context/AppContext';

const Pagination = () => {
  const { page, setPage, totalPage } = useApp();

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
        <div className='flex flex-col sm:flex-row w-auto justify-center items-center gap-10 pb-10'>
          <button
            className='p-3 rounded-full w-32 bg-slate-100 hover:bg-neutral-100 duration-300'
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
            className='p-3 rounded-full w-32 bg-slate-100 hover:bg-neutral-100 duration-300'
            type='button'
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
