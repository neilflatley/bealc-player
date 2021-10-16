import { takeEvery } from 'redux-saga/effects';
import { browseDlnaMediaServer } from '~/features/device-discovery/redux/sagas';
import { browsePlexMediaServer } from '~/features/plex/redux/sagas';

import { BROWSE_SERVER } from './types';

export const browseSagas = [takeEvery(BROWSE_SERVER, browseMediaServer)];

function* browseMediaServer(action: any) {
  if (action.deviceType === 'dlna') yield browseDlnaMediaServer(action);
  else if (action.deviceType === 'plex') yield browsePlexMediaServer(action);
}
