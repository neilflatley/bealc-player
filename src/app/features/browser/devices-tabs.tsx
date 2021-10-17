import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ServerBrowser from '~/features/browser/components/ServerBrowser';
import StyledPlayer from '~/components/StyledPlayer';
import StyledTabs from '~/components/StyledTabs';

import DeviceDiscovery from '~/features/device-discovery';
import PlexLibrary from '~/features/plex';
import { setDeviceType } from './redux/actions';
import { selectCurrentDeviceType } from './redux/selectors';

const DevicesTabs = () => {
  const dispatch = useDispatch();
  const deviceType = useSelector(selectCurrentDeviceType);

  return (
    <StyledPlayer>
      <h1 className="logo">BeaLC Player</h1>

      <StyledTabs>
        <Tabs
          onSelect={index => {
            dispatch(
              setDeviceType(index === 0 ? 'dlna' : index === 1 ? 'plex' : '')
            );
          }}
        >
          <TabList>
            <Tab>
              <h2>DLNA</h2>
            </Tab>
            <Tab>
              <h2>Plex</h2>
            </Tab>
          </TabList>

          <TabPanel>
            <DeviceDiscovery />
          </TabPanel>
          <TabPanel>
            <PlexLibrary />
          </TabPanel>
        </Tabs>
      </StyledTabs>
      <ServerBrowser deviceType={deviceType} />
    </StyledPlayer>
  );
};

export default DevicesTabs;
