import { put, select, takeEvery } from 'redux-saga/effects';
import { browseDlnaMediaServer } from '~/features/device-discovery/redux/sagas';
import { SELECT_DLNA_SERVER } from '~/features/device-discovery/redux/types';
import { browsePlexMediaServer } from '~/features/plex/redux/sagas';
import { SELECT_PLEX_SERVER } from '~/features/plex/redux/types';
import { selectCurrentDeviceType } from './selectors';

import { BROWSE_SERVER, SELECT_MEDIA_SERVER, SET_MEDIA_SERVER } from './types';

export const browseSagas = [
  takeEvery(BROWSE_SERVER, browseMediaServer),
  takeEvery(SELECT_MEDIA_SERVER, selectMediaServer),
];

function* browseMediaServer(action: any) {
  if (action.deviceType === 'dlna') yield browseDlnaMediaServer(action);
  else if (action.deviceType === 'plex') yield browsePlexMediaServer(action);
}

function* selectMediaServer(action: any) {
  const { pos } = action;
  const state = yield select();
  const deviceType = selectCurrentDeviceType(state);

  const selectedServer = state[deviceType].devices[pos].name;

  yield put({ type: SET_MEDIA_SERVER, pos, selectedServer });
  if (deviceType === 'dlna')
    yield put({ type: SELECT_DLNA_SERVER, pos, selectedServer });
  else if (deviceType === 'plex')
    yield put({ type: SELECT_PLEX_SERVER, pos, selectedServer });
}
