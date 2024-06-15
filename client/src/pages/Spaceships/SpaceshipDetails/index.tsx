import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ISpaceship } from '../../../interfaces';
import { Link } from 'react-router-dom';
import day from 'dayjs';
import { getItem } from '../../../api';

const SpaceshipDetails: React.FC = (): React.ReactElement => {
  // Get spaceship ID from URL
  const { id } = useParams<{ id: string }>();

  // Spaceship state
  const [spaceship, setSpaceship] = useState([] as ISpaceship[]);

  useEffect(() => {
    // Get spaceship
    getItem<ISpaceship[]>('/spaceships', Number(id), setSpaceship);
  }, [id]);

  return (
    <div className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 '>
      <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 '>
        SpaceshipID: {spaceship[0]?.SpaceshipID}
      </h5>
      <p className='font-normal text-gray-700 '>
        <b className='font-semibold'>Name:</b> {spaceship[0]?.Name}
      </p>
      <p className='font-normal text-gray-700 '>
        <b className='font-semibold'>Capacity:</b> {spaceship[0]?.Capacity}
      </p>
      <p className='font-normal text-gray-700 '>
        <b className='font-semibold'>Launch Date:</b>{' '}
        {day(spaceship[0]?.LaunchDate).format('DD-MM-YYYY')}
      </p>
      <p className='font-normal text-gray-700 '>
        <b className='font-semibold'>Status:</b> {spaceship[0]?.Status}
      </p>

      <Link
        to='/spaceships'
        className='block w-fit bg-[#6c63ff] p-3 text-white rounded-lg mt-4 text-center hover:bg-[#4f46e5]'
      >
        Back to Spaceships
      </Link>
    </div>
  );
};
export default SpaceshipDetails;
