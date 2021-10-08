import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StyledTabs from '~/components/StyledTabs';

import DeviceDiscovery from '~/features/device-discovery';
import PlexLibrary from '~/features/plex';

const DevicesTabs = () => (
  <StyledTabs>
    <Tabs>
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
);

export default DevicesTabs;
