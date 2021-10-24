import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StyledScrollbar from '~/components/StyledScrollbar';
import { setDevice } from '../browser/redux/actions';
import { selectIsLoading, selectDevices } from '../browser/redux/selectors';

// Models
import { findDevices } from './redux/actions';
type Props = {};

const DeviceDiscovery = ({}: Props) => {
  const dispatch = useDispatch();
  const devices = useSelector(selectDevices);
  const isLoading = useSelector(selectIsLoading);

  return (
    <>
      <StyledScrollbar className="servers_tabs">
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
          <p>
            {isLoading && 'Searching for Media Servers'}
            {!isLoading && (
              <button
                id="btn"
                className="link-button"
                onClick={() => {
                  dispatch(findDevices());
                }}
              >
                Search for Media Servers
              </button>
            )}
          </p>
        </div>
      </StyledScrollbar>
    </>
  );
};

export default DeviceDiscovery;
