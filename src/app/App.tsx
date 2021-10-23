import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { hot } from 'react-hot-loader';
import { Route, Switch, useParams } from 'react-router';

import { ThemeProvider } from 'styled-components';
import { ModalProvider } from 'styled-react-modal';
import { Loading } from '~/core/routes/Loading';
import { selectRouteLoading } from './core/redux/selectors';

import GlobalStyle from '~/theme/globalStyles';
import { defaultTheme } from './theme';
import { AppRootProps } from '@zengenti/contensis-react-base';
import { HashRouter } from 'react-router-dom';
import { HomePage } from './dynamic/pages';
import StyledPlayer from './components/StyledPlayer';
import { selectCurrentDeviceType } from './features/browser/redux/selectors';
import ServerBrowser from './features/browser/components/ServerBrowser';

const AppRoot = (props: AppRootProps) => {
  const stateLoading = useSelector(selectRouteLoading);
  const [isLoading, setIsLoading] = useState(stateLoading);

  const deviceType = useSelector(selectCurrentDeviceType);
  const { server } = useParams();

  useEffect(() => {
    setIsLoading(stateLoading);
  }, [stateLoading]);

  /*
    *notFoundComponent={NotFound}*
    This 404 Page / notFoundComponent is for local development purposes only.
    To see this working on your live site, you will need to add this to the load balancer, to do this, please follow the steps below.

    1. Go to Contensis.com.
    2. Login and go to the help desk.
    3. Raise a new support request.
    4. Complete the form and give details of what error page you'd like to add e.g. 404, 503 etc.
    5. Upload the error page(s) as raw html files.
    6. Submit your request.
  */

  return (
    <>
      <div id="app-root">
        <ThemeProvider theme={defaultTheme}>
          <ModalProvider>
            <GlobalStyle />
            {isLoading && <Loading />}
            {/* <RouteLoader {...props} notFoundComponent={NotFound} /> */}
            <StyledPlayer>
              <HashRouter>
                <Switch>
                  <Route exact path="/">
                    <HomePage />
                  </Route>
                  <Route path="/server/:server">
                    <ServerBrowser deviceType={deviceType} server={server} />
                  </Route>
                </Switch>
              </HashRouter>
            </StyledPlayer>
          </ModalProvider>
        </ThemeProvider>
      </div>
    </>
  );
};

export default hot(module)(AppRoot);
