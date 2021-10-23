import React from 'react';
import { Route, Switch, useParams } from 'react-router';
import { HashRouter, StaticRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StyledPlayer from '~/components/StyledPlayer';
import { selectCurrentDeviceType } from '~/features/browser/redux/selectors';
import ServerBrowser from '~/features/browser/components/ServerBrowser';

// Styled components
import HomeStyled from './home.styled';

// Models
import { Props } from './home.d';
import DevicesTabs from '~/features/browser/devices-tabs';

const Router = typeof window !== 'undefined' ? HashRouter : StaticRouter;

const Home = ({}: Props) => {
  const deviceType = useSelector(selectCurrentDeviceType);
  const { server } = useParams();
  return (
    <HomeStyled>
      <StyledPlayer>
        <Router>
          <Switch>
            <Route exact path="/">
              <DevicesTabs />
            </Route>
            <Route path="/server/:server">
              <ServerBrowser deviceType={deviceType} server={server} />
            </Route>
          </Switch>
        </Router>
      </StyledPlayer>
    </HomeStyled>
  );
};

export default Home;
