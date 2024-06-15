import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NewBtn } from '../../components';
import { ICrewmember } from '../../interfaces';
import { deleteItem, getItems } from '../../api';

const Crewmembers: React.FC = (): React.ReactElement => {
  // Crewmembers state
  const [crewmembers, setCrewmembers] = useState([] as ICrewmember[]);

  // Delete crewmember
  const handleDelete = async (id: number) => {
    const success = await deleteItem('/crewmembers', Number(id));
    if (success) {
      setCrewmembers(crewmembers.filter(c => c.CrewMemberID !== id));
    }
  };

  useEffect(() => {
    // Get crewmembers
    getItems<ICrewmember[]>('/crewmembers', setCrewmembers);
  }, []);

  return (
    <div>
      <div className='flex justify-between'>
        <NewBtn link='/crewmembers/add-crewmember' name='New Crewmember' />
        <div className='text-gray-500 dark:text-gray-400'>
          Total Crewmembers:
        </div>
      </div>
      {crewmembers.length > 0 ? (
        <>
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-7'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    CrewMemberID
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Name
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Role
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    ExperienceLevel
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    AssignedSpaceshipID
                  </th>
                  <th scope='col' className='px-6 py-3'></th>
                </tr>
              </thead>
              <tbody>
                {crewmembers.map((crewmember: ICrewmember) => (
                  <tr
                    key={crewmember.CrewMemberID}
                    className='bg-white dark:bg-gray-800'
                  >
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>
                        {crewmember.CrewMemberID}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>
                        <Link
                          to={`/crewmembers/${crewmember.CrewMemberID}`}
                          className='underline'
                        >
                          {crewmember.Name}
                        </Link>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>
                        {crewmember.Role}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>
                        {crewmember.ExperienceLevel}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>
                        {crewmember.AssignedSpaceshipID
                          ? crewmember.AssignedSpaceshipID
                          : 'N/A'}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4'>
                      <Link
                        to={`/crewmembers/edit-crewmember/${crewmember.CrewMemberID}`}
                        className='text-[#6c63ff] hover:text-indigo-600'
                      >
                        Edit
                      </Link>

                      <button
                        className='text-red-600 hover:text-red-800'
                        onClick={() => handleDelete(crewmember.CrewMemberID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className='text-center text-lg text-gray-500 mt-52'>
          No Crewmembers Found
        </div>
      )}
    </div>
  );
};
export default Crewmembers;
