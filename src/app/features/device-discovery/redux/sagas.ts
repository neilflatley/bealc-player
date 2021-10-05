import { put, select, takeEvery } from 'redux-saga/effects';

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
  takeEvery(SELECT_MEDIA_SERVER, browseMediaServer),
  takeEvery(BROWSE_SERVER, browseMediaServer),
];
function* findDevices() {
  const servers = yield api.findMediaServers();
  yield put({
    type: FOUND_MEDIA_SERVERS,
    servers,
  });
}
function* browseMediaServer(action) {
  const id = action.id || 0;

  const server = yield select(state =>
    state.dlna.devices.find(d => d.isSelected)
  );

  const browsed = yield api.browseServer(server.controlUrl, id);
  yield put({
    type: BROWSED_CONTENT,
    id,
    browsed,
  });
}

const api = {
  *findMediaServers() {
    const response = (yield fetch('/devices/find')) as Response;
    const data = yield response.json();
    const devices = Array.isArray(data) ? data : null;
    const error = !Array.isArray(data) ? data : null;

    return { devices, error };
  },
  *browseServer(controlUrl: string, id = '0') {
    const response = (yield fetch(
      `/devices/browse?id=${id}&url=${encodeURIComponent(controlUrl)}`
    )) as Response;
    const data = yield response.json();
    return data;
  },
};
