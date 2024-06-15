import React from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

type PaginationProps = {
  page: number;
  numOfPages: number;
  changePage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination: React.FC<PaginationProps> = (): React.ReactElement => {
  return (
    <div
      aria-label='Page navigation example'
      className='flex justify-end mt-10'
    >
      <div className='inline-flex -space-x-px text-sm'>
        <button
          type='button'
          className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:border-[#6c63ff] hover:bg-[#6c63ff] hover:text-white 
          
          transition-all duration-300 ease-in-out'
        >
          <HiChevronDoubleLeft />
        </button>

        <button
          type='button'
          className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:border-[#6c63ff] hover:bg-[#6c63ff] hover:text-white transition-all duration-300 ease-in-out'
        >
          1
        </button>

        <button
          type='button'
          className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:border-[#6c63ff] hover:bg-[#6c63ff] hover:text-white transition-all duration-300 ease-in-out'
        >
          <HiChevronDoubleRight />
        </button>
      </div>
    </div>
  );
};
export default Pagination;
