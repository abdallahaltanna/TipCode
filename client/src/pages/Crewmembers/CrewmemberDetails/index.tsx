import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getItem } from '../../../api';
import { ICrewmember } from '../../../interfaces';

// Crewmember details page
const crewmemberDetails: React.FC = (): React.ReactElement => {
  // Get crewmember ID from URL
  const { id } = useParams<{ id: string }>();

  // Crewmember state
  const [crewmember, setCrewmember] = useState([] as ICrewmember[]);

  // Get crewmember details
  useEffect(() => {
    getItem<ICrewmember[]>('/crewmembers', Number(id), setCrewmember);
  }, [id]);

  return (
    <div className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 '>
      <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 '>
        CrewMemberID: {crewmember[0]?.CrewMemberID}
      </h5>
      <p className='font-normal text-gray-700 '>
        <b className='font-semibold'>Name:</b> {crewmember[0]?.Name}
      </p>
      <p className='font-normal text-gray-700 '>
        <b className='font-semibold'>Role:</b> {crewmember[0]?.Role}
      </p>
      <p className='font-normal text-gray-700 '>
        <b className='font-semibold'>Experience Level: </b>
        {crewmember[0]?.ExperienceLevel}
      </p>
      <p className='font-normal text-gray-700 '>
        <b className='font-semibold'>AssignedSpaceshipID: </b>
        {crewmember[0]?.AssignedSpaceshipID
          ? crewmember[0]?.AssignedSpaceshipID
          : 'N/A'}
      </p>

      <Link
        to='/crewmembers'
        className='block w-fit bg-[#6c63ff] p-3 text-white rounded-lg mt-4 text-center hover:bg-[#4f46e5]'
      >
        Back to Crewmembers
      </Link>
    </div>
  );
};
export default crewmemberDetails;
