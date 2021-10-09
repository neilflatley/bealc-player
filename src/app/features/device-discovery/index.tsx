import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ServerBrowser from '~/components/ServerBrowser';
import uniqueID from '~/core/util/unique';
import DlnaTabs from './components/dlna-tabs';

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
      <div className="login_container">
        <button
          id="btn"
          onClick={() => {
            dispatch(findDevices());
          }}
        >
          Search for Media Servers
        </button>
      </div>
      <DlnaTabs devices={devices} />
      <ServerBrowser
        selectedItem={() => <SelectedItem {...selectedItem} />}
        selectedNode={() => (
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
        )}
      />
    </>
  );
};

export default DeviceDiscovery;
