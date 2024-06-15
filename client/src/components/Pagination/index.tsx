import React from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

// Pagination Props
type PaginationProps = {
  page: number;
  numOfPages: number;
  changePage: React.Dispatch<React.SetStateAction<number>>;
};

// Pagination Component
const Pagination: React.FC<PaginationProps> = ({
  changePage,
  numOfPages,
  page
}): React.ReactElement => {
  // Previous page function
  const prevPage = () => {
    if (page > 1) {
      changePage(page - 1);
    }
  };

  // Next page function
  const nextPage = () => {
    if (page < numOfPages) {
      changePage(page + 1);
    }
  };

  // This function handles the visibility of the pagination buttons
  const getVisiblePages = (
    page: number,
    totalPages: number,
    maxVisible: number
  ) => {
    let start = Math.max(page - Math.floor(maxVisible / 2), 1);
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxVisible + 1, 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  // Get visible pages
  const visiblePages = getVisiblePages(page, numOfPages, 5);

  return (
    <div
      aria-label='Page navigation example'
      className='flex justify-end mt-10'
    >
      <div className='inline-flex -space-x-px text-sm'>
        <button
          type='button'
          className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg transition-all duration-300 ease-in-out ${
            page === 1
              ? 'cursor-not-allowed opacity-50'
              : 'hover:border-[#6c63ff] hover:bg-[#6c63ff] hover:text-white'
          }`}
          onClick={prevPage}
          disabled={page === 1}
        >
          <HiChevronDoubleLeft />
        </button>

        {visiblePages.map(item => (
          <button
            key={item}
            type='button'
            onClick={() => changePage(item)}
            className={`flex items-center justify-center px-3 h-8 leading-tight transition-all duration-300 ease-in-out ${
              item === page
                ? 'border-[#6c63ff] bg-[#6c63ff] text-white'
                : 'text-gray-500 bg-white border border-gray-300 hover:border-[#6c63ff] hover:bg-[#6c63ff] hover:text-white'
            }`}
          >
            {item}
          </button>
        ))}

        <button
          type='button'
          className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg transition-all duration-300 ease-in-out ${
            page === numOfPages
              ? 'cursor-not-allowed opacity-50'
              : 'hover:border-[#6c63ff] hover:bg-[#6c63ff] hover:text-white'
          }`}
          onClick={nextPage}
          disabled={page === numOfPages}
        >
          <HiChevronDoubleRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
