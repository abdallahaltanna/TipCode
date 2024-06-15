import React from 'react';
import { Link } from 'react-router-dom';
import { IoArrowBackSharp } from 'react-icons/io5';

type BackBtnProps = {
  link: string;
};

const BackBtn: React.FC<BackBtnProps> = ({ link }): React.ReactElement => {
  return (
    <Link
      to={link}
      className='flex items-center justify-center w-10 h-9 bg-[#6c63ff] rounded-md text-white mb-10 hover:bg-[#6761d8] transition-all duration-300 ease-in-out'
    >
      <IoArrowBackSharp />
    </Link>
  );
};
export default BackBtn;
