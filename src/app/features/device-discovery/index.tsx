import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqueID from '~/core/util/unique';

// Models
import SelectedItem from './components/SelectedItem';
import SelectedNode from './components/SelectedNode';
import {
  browseServer,
  findDevices,
  selectContentNode,
  selectDevice,
} from './redux/actions';
import { selectCurrentNode } from './redux/selectors';
type Props = {};

const DeviceDiscovery = ({}: Props) => {
  const dispatch = useDispatch();
  const devices = useSelector(state => state.dlna.devices);
  const selectedDevice = useSelector(state =>
    state.dlna.devices.find(d => d.isSelected)
  );
  const selectedItem = useSelector(state => state.dlna.selectedItem);
  const selectedNode = useSelector(state =>
    selectCurrentNode(state, state.dlna.selectedNode?.id)
  );

  return (
    <>
      <div>
        <button
          id="btn"
          onClick={() => {
            dispatch(findDevices());
          }}
        >
          Search for Media Servers
        </button>
      </div>
      {devices && devices.length > 0 && (
        <div>
          <h2>DLNA: Discovered devices</h2>
          {devices.map((device, idx) => (
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
      )}
      <SelectedItem {...selectedItem} />
      <SelectedNode
        node={selectedNode || selectedDevice}
        handleSelect={(id = '0') => {
          dispatch(browseServer(id));
          dispatch(selectContentNode(id));
        }}
        handleBack={(id: string) => {
          dispatch(selectContentNode(id));
        }}
      />
    </>
  );
};

export default DeviceDiscovery;
