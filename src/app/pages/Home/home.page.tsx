import React from 'react';

import { useSelector } from 'react-redux';
import StyledPlayer from '~/components/StyledPlayer';
import { selectCurrentDeviceType } from '~/features/browser/redux/selectors';
import ServerBrowser from '~/features/browser/components/ServerBrowser';

// Styled components
import HomeStyled from './home.styled';

// Models
import { Props } from './home.d';

const Home = ({}: Props) => {
  const deviceType = useSelector(selectCurrentDeviceType);
  return (
    <HomeStyled>
      <StyledPlayer>
        <ServerBrowser deviceType={deviceType} />
      </StyledPlayer>
    </HomeStyled>
  );
};

export default Home;
