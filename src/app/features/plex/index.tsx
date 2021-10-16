import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Models
import { findDevices } from './redux/actions';
import Login from './components/login';
import PlexTabs from './components/plex-tabs';
import { selectDevices } from '../browser/redux/selectors';
type Props = {};

const PlexLibrary = ({}: Props) => {
  const dispatch = useDispatch();
  const devices = useSelector(selectDevices);

  return (
    <>
      <div className="login_container">
        <Login
          submit={(u, p) => dispatch(findDevices(u, p))}
          devices={devices}
        />
      </div>
      <PlexTabs devices={devices} />
    </>
  );
};

export default PlexLibrary;
