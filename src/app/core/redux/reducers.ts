// Import feature reducers to be included with application startup
import dlnaReducer from '~/features/device-discovery/redux/reducer';
import plexReducer from '~/features/plex/redux/reducer';

const featureReducers = {
  dlna: dlnaReducer,
  plex: plexReducer,
};

export default { ...featureReducers };
