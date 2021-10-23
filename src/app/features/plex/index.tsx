import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Models
import { findDevices, selectDevice } from './redux/actions';
import Login from './components/login';
// import PlexTabs from './components/plex-tabs';
import { selectDevices } from '../browser/redux/selectors';
type Props = {};

const PlexLibrary = ({}: Props) => {
  const dispatch = useDispatch();
  const devices = useSelector(selectDevices);

  return (
    <>
      <div className="servers_tabs">
        <div className="login_container">
          <Login
            submit={(u, p) => dispatch(findDevices(u, p))}
            devices={devices}
          />
        </div>
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
      </div>
    </>
  );
};

export default PlexLibrary;
