import React from 'react';

// Styled components
import HomeStyled from './home.styled';

// Models
import { Props } from './home.d';
import DevicesTabs from '~/features/browser/devices-tabs';

const Home = ({}: Props) => {
  return (
    <HomeStyled>
      <h1 style={{ float: 'right', margin: '10px', padding: '0 20px' }}>
        BeaLC Player
      </h1>
      <DevicesTabs />
    </HomeStyled>
  );
};

export default Home;
