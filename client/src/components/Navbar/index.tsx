import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosRocket } from 'react-icons/io';
// import styles as module
import styles from './styles.module.css';

// Navbar Component
const Navbar: React.FC = (): React.ReactElement => {
  return (
    <nav className={styles.navbar}>
      <div className={styles['navbar-logo']}>
        <NavLink to='/'>
          <IoIosRocket size={30} />

          <span>Spaceship Travel</span>
        </NavLink>

        <div className={styles.nav} id='navbar-dropdown'>
          <ul>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : '')}
                to='/spaceships'
              >
                Spaceships
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : '')}
                to='/crewmembers'
              >
                Crew Members
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : '')}
                to='/missions'
              >
                Missions
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
