import to from 'await-to-js';
import { put, select, takeEvery } from 'redux-saga/effects';
import { selectCurrentDevice } from './selectors';

import {
  BROWSED_CONTENT,
  BROWSE_SERVER,
  FIND_MEDIA_SERVERS,
  FOUND_MEDIA_SERVERS,
  SELECT_MEDIA_SERVER,
} from './types';

export const discoverySagas = [
  findDevices(),
  takeEvery(FIND_MEDIA_SERVERS, findDevices),
  takeEvery(SELECT_MEDIA_SERVER, browseDlnaMediaServer),
  takeEvery(BROWSE_SERVER, browseDlnaMediaServer),
];
function* findDevices() {
  const servers = yield api.findMediaServers();
  yield put({
    type: FOUND_MEDIA_SERVERS,
    servers,
  });
}
export function* browseDlnaMediaServer(action) {
  const id = action.path || 0;

  const server = yield select(selectCurrentDevice);

  const browsed = yield api.browseServer(server.controlUrl, id);
  yield put({
    type: BROWSED_CONTENT,
    id,
    browsed,
  });
}

const api = {
  *findMediaServers() {
    const [error, response] = yield to(fetch('/devices/find') as Response);
    if (response.ok) {
      const data = yield response.json();
      const devices = Array.isArray(data) ? data : null;
      const error = !Array.isArray(data) ? data : null;
      return { devices, error };
    } else {
      let text = '';
      try {
        if (response) text = yield response.text();
      } catch (ex) {}
      return { devices: [], error: text || error };
    }
  },
  *browseServer(controlUrl: string, id = '0') {
    const response = (yield fetch(
      `/devices/browse?id=${id}&url=${encodeURIComponent(controlUrl)}`
    )) as Response;
    const data = yield response.json();
    return data;
  },
};
