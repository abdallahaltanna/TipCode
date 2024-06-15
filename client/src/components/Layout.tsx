import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

// Layout Component
const Layout: React.FC = (): React.ReactElement => {
  return (
    <div className='container mx-auto px-4'>
      <Navbar />
      <div className='md:mt-14'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
