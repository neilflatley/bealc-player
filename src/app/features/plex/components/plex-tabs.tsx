import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StyledTabs from '~/components/StyledTabs';
import uniqueID from '~/core/util/unique';

import { selectDevice } from '../redux/actions';

import PlexServerBrowser from './plex-server';

const PlexTabs = ({ devices, selectedItem, selectedNode }) => {
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(-1);
  const BoundTabs = ({ devices }) =>
    devices?.map((device, index) => (
      <Tab
        key={uniqueID()}
        onClick={() => {
          setTabIndex(index);
          dispatch(selectDevice(index));
        }}
      >
        {device.isSelected && (
          <p>
            <strong>{device.name}</strong>
          </p>
        )}
        {!device.isSelected && <p>{device.name}</p>}
      </Tab>
    ));
  BoundTabs.tabsRole = 'TabList'; // Required field to use your custom Tab

  if (!devices || devices?.length <= 0) return null;
  return (
    <StyledTabs>
      <Tabs
        onSelect={index => {
          setTabIndex(index);
        }}
        selectedIndex={tabIndex}
      >
        <TabList>
          <BoundTabs devices={devices} />
        </TabList>
      </Tabs>
      <TabPanel></TabPanel>
      <PlexServerBrowser
        selectedNode={selectedNode}
        selectedItem={selectedItem}
      />
    </StyledTabs>
  );
};

export default PlexTabs;
