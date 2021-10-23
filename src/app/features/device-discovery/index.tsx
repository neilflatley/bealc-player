import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDevices } from '../browser/redux/selectors';

// Models
import { findDevices, selectDevice } from './redux/actions';
type Props = {};

const DeviceDiscovery = ({}: Props) => {
  const dispatch = useDispatch();
  const devices = useSelector(selectDevices);

  return (
    <>
      <div className="servers_tabs">
        {devices?.map((device, index) => (
          <div key={index}>
            <p>
              <button
                className="link-button play-button menu-button"
                onClick={() => {
                  dispatch(selectDevice(index));
                  window.location.hash = `/server/${encodeURIComponent(
                    device.name
                  )}`;
                }}
              >
                {device.name}
              </button>
            </p>
          </div>
        ))}
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
      </div>
    </>
  );
};

export default DeviceDiscovery;
