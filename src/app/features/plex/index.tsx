import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Models
import { findDevices } from './redux/actions';
import { selectCurrentDevice, selectCurrentNode } from './redux/selectors';
import Login from './components/login';
import PlexTabs from './components/plex-tabs';
type Props = {};

const PlexLibrary = ({}: Props) => {
  const dispatch = useDispatch();
  const devices = useSelector(state => state.plex.devices);
  const selectedDevice = useSelector(selectCurrentDevice);

  const selectedItem = useSelector(state => state.plex.selectedItem);

  const selectedNode = useSelector(state => {
    const currentNode = state.plex.selectedNode;
    return selectCurrentNode(state, `${currentNode?.path}/${currentNode?.key}`);
  });

  return (
    <>
      <div style={{ float: 'right', padding: '0 10px' }}>
        <Login
          submit={(u, p) => dispatch(findDevices(u, p))}
          devices={devices}
        />
      </div>
      <PlexTabs
        devices={devices}
        selectedItem={selectedItem}
        selectedNode={selectedNode || selectedDevice}
      />
    </>
  );
};

export default PlexLibrary;
