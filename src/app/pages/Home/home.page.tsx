import React from 'react';

// Styled components
import HomeStyled from './home.styled';

// Models
import { Props } from './home.d';
import DevicesTabs from '~/features/browser/devices-tabs';

const Home = ({}: Props) => {
  return (
    <HomeStyled>
      <DevicesTabs />
    </HomeStyled>
  );
};

export default Home;
