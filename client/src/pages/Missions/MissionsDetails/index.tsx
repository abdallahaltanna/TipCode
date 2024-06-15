import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IMission } from '../../../interfaces';
import { Link } from 'react-router-dom';
import day from 'dayjs';
import { getItem } from '../../../api';

const MissionDetails: React.FC = (): React.ReactElement => {
  // Get mission ID from URL
  const { id } = useParams<{ id: string }>();
  // Mission state
  const [mission, setMission] = useState([] as IMission[]);

  useEffect(() => {
    // Get mission
    getItem<IMission[]>('/missions', Number(id), setMission);
  }, [id]);

  return (
    <div className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 '>
      <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 '>
        MissionID: {mission[0]?.MissionID}
      </h5>
      <p className='font-normal text-gray-700 '>
        <b className='font-semibold'>SpaceshipID:</b>{' '}
        {mission[0]?.SpaceshipID ? mission[0]?.SpaceshipID : 'N/A'}
      </p>
      <p className='font-normal text-gray-700 '>
        <b className='font-semibold'>Destination:</b> {mission[0]?.Destination}
      </p>
      <p className='font-normal text-gray-700 '>
        <b className='font-semibold'>LaunchDate: </b>
        {day(mission[0]?.LaunchDate).format('DD-MM-YYYY')}
      </p>
      <p className='font-normal text-gray-700 '>
        <b className='font-semibold'>Duration:</b> {mission[0]?.Duration}
      </p>

      <Link
        to='/missions'
        className='block w-fit bg-[#6c63ff] p-3 text-white rounded-lg mt-4 text-center hover:bg-[#4f46e5]'
      >
        Back to Missions
      </Link>
    </div>
  );
};
export default MissionDetails;
