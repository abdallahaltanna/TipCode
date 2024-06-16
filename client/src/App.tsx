import React from 'react';
import HomePageImg from './assets/HomePageImg.svg';

const App: React.FC = (): React.ReactElement => {
  return (
    // Home Page
    <div className='app'>
      <div className='app-header'>
        <h1>
          Discover The <br />
          <span>Spaceship Travel </span> App
        </h1>
      </div>
      <div className='app-img'>
        <img src={HomePageImg} alt='homePageImg' />
      </div>
    </div>
  );
};

export default App;
