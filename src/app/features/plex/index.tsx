import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Models
import { findDevices, signOut } from './redux/actions';
import Login from './components/login';
// import PlexTabs from './components/plex-tabs';
import { selectDevices } from '../browser/redux/selectors';
import { setDevice } from '../browser/redux/actions';
type Props = {};

const PlexLibrary = ({}: Props) => {
  const dispatch = useDispatch();
  const devices = useSelector(selectDevices);

  return (
    <>
      <div className="servers_tabs">
        <div className="servers-container">
          {devices?.map((device, index) => (
            <div key={index}>
              <p>
                <button
                  className="link-button play-button menu-button"
                  onClick={() => {
                    dispatch(setDevice(index));
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
          <Login
            submit={(u, p) => dispatch(findDevices(u, p))}
            signOut={() => dispatch(signOut())}
            devices={devices}
          />
        </div>
      </div>
    </>
  );
};

export default PlexLibrary;
