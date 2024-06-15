import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components';
import App from './App.tsx';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {
  CreateCrewmember,
  CreateMission,
  CreateSpaceship,
  CrewmemberDetails,
  Crewmembers,
  EditCrewmember,
  EditMission,
  EditSpaceship,
  MissionDetails,
  Missions,
  Spaceships,
  SpaceshipDetails,
  NotFound
} from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: 'spaceships',
        element: <Spaceships />
      },
      {
        path: 'spaceships/add-spaceship',
        element: <CreateSpaceship />
      },
      {
        path: 'spaceships/edit-spaceship/:id',
        element: <EditSpaceship />
      },
      {
        path: 'spaceships/:id',
        element: <SpaceshipDetails />
      },
      {
        path: 'crewmembers',
        element: <Crewmembers />
      },
      {
        path: 'crewmembers/add-crewmember',
        element: <CreateCrewmember />
      },
      {
        path: 'crewmembers/:id',
        element: <CrewmemberDetails />
      },
      {
        path: 'crewmembers/edit-crewmember/:id',
        element: <EditCrewmember />
      },
      {
        path: 'missions',
        element: <Missions />
      },
      {
        path: 'missions/add-mission',
        element: <CreateMission />
      },
      {
        path: 'missions/:id',
        element: <MissionDetails />
      },
      {
        path: 'missions/edit-mission/:id',
        element: <EditMission />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router} />
    <ToastContainer
      position='top-center'
      autoClose={3000}
      closeOnClick
      draggable
      pauseOnHover
      theme='light'
    />
  </>
);
