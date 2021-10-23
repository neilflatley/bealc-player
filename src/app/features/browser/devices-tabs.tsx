import React from 'react';
import { useDispatch } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StyledTabs from '~/components/StyledTabs';

import DeviceDiscovery from '~/features/device-discovery';
import PlexLibrary from '~/features/plex';
import { setDeviceType } from './redux/actions';

const DevicesTabs = () => {
  const dispatch = useDispatch();

  return (
    <div style={{ height: '100%' }}>
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
    </div>
  );
};

export default DevicesTabs;
