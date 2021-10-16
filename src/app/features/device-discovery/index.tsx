import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDevices } from '../browser/redux/selectors';
import DlnaTabs from './components/dlna-tabs';

// Models
import { findDevices } from './redux/actions';
type Props = {};

const DeviceDiscovery = ({}: Props) => {
  const dispatch = useDispatch();
  const devices = useSelector(selectDevices);

  return (
    <>
      <div className="login_container">
        <button
          id="btn"
          className="link-button"
          onClick={() => {
            dispatch(findDevices());
          }}
        >
          Search for Media Servers
        </button>
      </div>
      <DlnaTabs devices={devices} />
    </>
  );
};

export default DeviceDiscovery;
