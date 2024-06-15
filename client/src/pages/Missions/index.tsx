import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import day from 'dayjs';
import { NewBtn } from '../../components';
import { IMission } from '../../interfaces';
import { getItems, deleteItem } from '../../api';

const Missions: React.FC = (): React.ReactElement => {
  // Missions state
  const [missions, setMissions] = useState([] as IMission[]);

  // Delete mission
  const handleDelete = async (id: number) => {
    const success = await deleteItem('/missions', Number(id));
    if (success) {
      setMissions(missions.filter(m => m.MissionID !== id));
    }
  };

  useEffect(() => {
    // Get missions
    getItems<IMission[]>('/missions', setMissions);
  }, []);

  return (
    <div>
      <NewBtn link='/missions/add-mission' name='New Mission' />
      {missions.length > 0 ? (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-7'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  MissionID
                </th>
                <th scope='col' className='px-6 py-3'>
                  SpaceshipID
                </th>
                <th scope='col' className='px-6 py-3'>
                  Destination
                </th>
                <th scope='col' className='px-6 py-3'>
                  LaunchDate
                </th>
                <th scope='col' className='px-6 py-3'>
                  Duration
                </th>
                <th scope='col' className='px-6 py-3'></th>
              </tr>
            </thead>
            <tbody>
              {missions.map((mission: IMission) => (
                <tr
                  key={mission.MissionID}
                  className='bg-white dark:bg-gray-800'
                >
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>
                      <Link
                        to={`/missions/${mission.MissionID}`}
                        className='underline'
                      >
                        {mission.MissionID}
                      </Link>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>
                      {mission.SpaceshipID ? mission.SpaceshipID : 'N/A'}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>
                      {mission.Destination}km
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>
                      {day(mission.LaunchDate).format('DD-MM-YYYY')}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>
                      {mission.Duration}h
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4'>
                    <Link
                      to={`/missions/edit-mission/${mission.MissionID}`}
                      className='text-[#6c63ff] hover:text-indigo-600'
                    >
                      Edit
                    </Link>

                    <button
                      className='text-red-600 hover:text-red-800'
                      onClick={() => handleDelete(mission.MissionID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='text-center text-lg text-gray-500 mt-52'>
          No Missions Found
        </div>
      )}
    </div>
  );
};
export default Missions;
