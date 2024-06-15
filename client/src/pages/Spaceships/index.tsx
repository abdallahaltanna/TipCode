import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import day from 'dayjs';
import { NewBtn } from '../../components';
import { deleteItem, getItems } from '../../api';
import { ISpaceship } from '../../interfaces';

const Spaceships: React.FC = (): React.ReactElement => {
  //  Spaceships state
  const [spaceships, setSpaceships] = useState([] as ISpaceship[]);

  // Delete spaceship
  const handleDelete = async (id: number) => {
    const success = await deleteItem('/spaceships', Number(id));
    if (success) {
      setSpaceships(spaceships.filter(s => s.SpaceshipID !== id));
    }
  };

  useEffect(() => {
    // Get spaceships
    getItems<ISpaceship[]>('/spaceships', setSpaceships);
  }, []);

  return (
    <div>
      <NewBtn link='/spaceships/add-spaceship' name='New Spaceship' />
      {spaceships.length > 0 ? (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-7'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  SpaceshipID
                </th>
                <th scope='col' className='px-6 py-3'>
                  Name
                </th>
                <th scope='col' className='px-6 py-3'>
                  Capacity
                </th>
                <th scope='col' className='px-6 py-3'>
                  LaunchDate
                </th>
                <th scope='col' className='px-6 py-3'>
                  Status
                </th>
                <th scope='col' className='px-6 py-3'></th>
              </tr>
            </thead>
            <tbody>
              {spaceships.map((Spaceship: ISpaceship) => (
                <tr
                  key={Spaceship.SpaceshipID}
                  className='bg-white dark:bg-gray-800'
                >
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>
                      {Spaceship.SpaceshipID}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>
                      <Link
                        to={`/spaceships/${Spaceship.SpaceshipID}`}
                        className='underline'
                      >
                        {Spaceship.Name}
                      </Link>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>
                      {Spaceship.Capacity}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>
                      {day(Spaceship.LaunchDate).format('DD-MM-YYYY')}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>
                      {Spaceship.Status}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4'>
                    <Link
                      to={`/spaceships/edit-spaceship/${Spaceship.SpaceshipID}`}
                      className='text-[#6c63ff] hover:text-indigo-600'
                    >
                      Edit
                    </Link>

                    <button
                      className='text-red-600 hover:text-red-800'
                      onClick={() => handleDelete(Spaceship.SpaceshipID)}
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
          No Spaceships Found
        </div>
      )}
    </div>
  );
};
export default Spaceships;
