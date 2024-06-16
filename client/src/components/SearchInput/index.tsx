import React, { useState, useMemo } from 'react';
import { IoMdSearch } from 'react-icons/io';

// SearchInput Props
interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
}

// SearchInput Component
const SearchInput: React.FC<SearchInputProps> = ({
  onSearch
}): React.ReactElement => {
  // Search term state
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Handle search function
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  // Debounce function to optimize search input
  const debounce = (fn: (searchTerm: string) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (searchTerm: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(searchTerm);
      }, delay);
    };
  };

  // Optimize debounce function
  const optimizedDebounce = useMemo(() => debounce(onSearch, 1000), [onSearch]);

  // Handle change function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    optimizedDebounce(e.target.value);
  };

  return (
    <form className='max-w-md mt-10' onSubmit={handleSearch}>
      <div className='relative'>
        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
          <IoMdSearch size={22} color='gray' />
        </div>
        <input
          type='search'
          id='default-search'
          className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:border-[#6c63ff]'
          placeholder='Search'
          value={searchTerm}
          onChange={handleChange}
          required
        />
      </div>
    </form>
  );
};

export default SearchInput;
