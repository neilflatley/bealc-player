import {
  BROWSE_SERVER,
  FIND_MEDIA_SERVERS,
  PLEX_SIGN_OUT,
  SELECT_CONTENT_NODE,
  SELECT_PLEX_SERVER,
} from './types';

export const findDevices = (username, password) => ({
  type: FIND_MEDIA_SERVERS,
  username,
  password,
});
export const setDevice = (pos: number) => ({
  type: SELECT_PLEX_SERVER,
  pos,
});
export const browseServer = (path: string, parentPath = '') => ({
  type: BROWSE_SERVER,
  path,
  parentPath,
});
export const selectContentNode = (path: string) => ({
  type: SELECT_CONTENT_NODE,
  path,
});
export const signOut = () => ({
  type: PLEX_SIGN_OUT,
});
