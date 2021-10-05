import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqueID from '~/core/util/unique';

// Models
import SelectedItem from '~/features/device-discovery/components/SelectedItem';
import SelectedNode from '~/features/device-discovery/components/SelectedNode';
import {
  browseServer,
  findDevices,
  selectContentNode,
  selectDevice,
} from './redux/actions';
import { selectCurrentDevice, selectCurrentNode } from './redux/selectors';
import Login from './components/login';
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
      <div>
        <Login submit={(u, p) => dispatch(findDevices(u, p))} />
      </div>
      <div>
        <h2>Plex: Discovered devices</h2>
        {devices?.map((device, idx) => (
          <div key={uniqueID()}>
            {device.name !== selectedDevice?.name && (
              <button
                onClick={() => {
                  dispatch(selectDevice(idx));
                }}
              >
                {device.name}
              </button>
            )}
            {device.name === selectedDevice?.name && <p>{device.name}</p>}
          </div>
        ))}
      </div>
      <SelectedItem {...selectedItem} />
      <SelectedNode
        node={selectedNode || selectedDevice}
        handleSelect={(id: string) => {
          dispatch(
            browseServer(
              id,
              selectedNode
                ? `${selectedNode.path}/${selectedNode.key}`
                : '/library/sections'
            )
          );
          dispatch(selectContentNode(id));
        }}
        handleBack={(id: string) => {
          dispatch(selectContentNode(id));
        }}
      />
    </>
  );
};

export default PlexLibrary;
