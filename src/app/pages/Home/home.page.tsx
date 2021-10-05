import React from 'react';

// Styled components
import HomeStyled from './home.styled';

// Models
import { Props } from './home.d';
import DeviceDiscovery from '~/features/device-discovery';
import PlexLibrary from '~/features/plex';

const Home = ({ entry }: Props) => {
  return (
    <HomeStyled>
      <h1>BeaLC Player</h1>
      <DeviceDiscovery />
      <PlexLibrary />
    </HomeStyled>
  );
};

export default Home;
