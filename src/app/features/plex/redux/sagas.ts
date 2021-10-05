import { put, select, takeEvery } from 'redux-saga/effects';
import Cookies from 'js-cookie';

import {
  BROWSED_CONTENT,
  BROWSE_SERVER,
  FIND_MEDIA_SERVERS,
  FOUND_MEDIA_SERVERS,
  SELECT_MEDIA_SERVER,
} from './types';
import { completeApiPath } from '../util';
import { selectCurrentDevice } from './selectors';

export const plexSagas = [
  findDevices(),
  takeEvery(FIND_MEDIA_SERVERS, findDevices),
  takeEvery(SELECT_MEDIA_SERVER, browseMediaServer),
  takeEvery(BROWSE_SERVER, browseMediaServer),
];

function* findDevices(action) {
  const servers = yield api.findMediaServers(action);
  yield put({
    type: FOUND_MEDIA_SERVERS,
    servers,
  });
}
function* browseMediaServer(action) {
  const path = action.path || '/';

  const server = yield select(selectCurrentDevice);

  const browsed = yield api.browseServer(
    server?.machineIdentifier,
    path,
    action.parentPath
  );
  yield put({
    type: BROWSED_CONTENT,
    path,
    browsed,
  });
}

const api = {
  *findMediaServers({ username, password } = {}) {
    const plex_servers = Cookies.get('plex_servers');
    const accessToken = JSON.parse(
      plex_servers?.replace('j:', '') || '{}'
    )?.accessToken;

    if (!accessToken && (!username || !password))
      return { accessToken: null, devices: null, error: 'Login required' };

    const qs = username && password ? `?u=${username}&p=${password}` : '';

    const response = (yield fetch(`/devices/plex/servers${qs}`)) as Response;
    const data = yield response.json();
    const devices = Array.isArray(data?.servers) ? data.servers : null;
    const error = !Array.isArray(data?.error) ? data.error : null;

    return { accessToken, devices, error };
  },
  *browseServer(id: string, path = '', parentPath = '') {
    const enhancedPath = completeApiPath(path);

    const response = (yield fetch(
      `/devices/plex/${id}/browse?path=${encodeURIComponent(enhancedPath)}`
    )) as Response;
    if (response.ok) {
      const data = yield response.json();
      return {
        data: (
          data.MediaContainer.Metadata || data.MediaContainer.Directory
        )?.map(d => ({
          ...d,
          path: enhancedPath,
          parentPath,
          local: data.local,
        })),
      };
    }
    const text = yield response.text();
    return { error: text };
  },
};
