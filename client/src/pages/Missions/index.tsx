import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import day from 'dayjs';
import { NewBtn, Pagination, SearchInput } from '../../components';
import { IMission, IMissionPagination } from '../../interfaces';
import { getItems, deleteItem } from '../../api';
import handlePagination from '../../utils/pagination';

const Missions: React.FC = (): React.ReactElement => {
  // Missions state
  const [missions, setMissions] = useState([] as IMission[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Delete mission
  const handleDelete = async (id: number) => {
    const success = await deleteItem('/missions', Number(id));
    if (success) {
      setMissions(missions.filter(m => m.MissionID !== id));

      handlePagination(
        total,
        currentPage,
        setTotal,
        setNumberOfPages,
        setCurrentPage,
        () => fetchData(currentPage, searchTerm)
      );
    }
  };

  // Fetch missions
  const fetchData = async (page: number, search = '') => {
    const { missions, currentPage, numberOfPages, total } =
      await getItems<IMissionPagination>(
        `/missions?page=${page}&limit=5&search=${search}`
      );
    setMissions(missions);
    setCurrentPage(currentPage);
    setNumberOfPages(numberOfPages);
    setTotal(total);
  };

  useEffect(() => {
    // Get missions
    fetchData(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  // Handle search
  const handleSearch = (search: string) => {
    setSearchTerm(search);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <div>
      <div className='flex justify-between items-center'>
        <NewBtn link='/missions/add-mission' name='New Mission' />
        <div className='text-gray-500 dark:text-gray-400'>
          Total Missions: {total}
        </div>
      </div>
      <SearchInput onSearch={handleSearch} />
      {missions.length > 0 ? (
        <>
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
          <Pagination
            changePage={setCurrentPage}
            numOfPages={numberOfPages}
            page={currentPage}
          />
        </>
      ) : (
        <div className='text-center text-lg text-gray-500 mt-52'>
          No Missions Found
        </div>
      )}
    </div>
  );
};
export default Missions;
