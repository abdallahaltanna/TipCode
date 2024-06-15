import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundImg from '../../assets/404.svg';

// NotFound Page
const NotFound: React.FC = (): React.ReactElement => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <img
        src={NotFoundImg}
        alt='404'
        className='w-1/2 md:w-1/3 block object-cover'
      />
      <h3 className='text-xl md:text-3xl text-gray-700 mt-10'>
        Oooops!, Page Not Found
      </h3>
      <Link
        to='/'
        className='text-[#6c63ff] mt-5 hover:text-[#6761d8] hover:underline transition-all duration-300 ease-in-out'
      >
        Go back to Home
      </Link>
    </div>
  );
};
export default NotFound;
