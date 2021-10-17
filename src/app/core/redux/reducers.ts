// Import feature reducers to be included with application startup
import browserReducer from '~/features/browser/redux/reducer';
import playlistReducer from '~/features/playlist/redux/reducer';
import dlnaReducer from '~/features/device-discovery/redux/reducer';
import plexReducer from '~/features/plex/redux/reducer';

const featureReducers = {
  browser: browserReducer,
  playlist: playlistReducer,
  dlna: dlnaReducer,
  plex: plexReducer,
};

export default { ...featureReducers };
