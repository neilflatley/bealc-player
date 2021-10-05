import {
  BROWSE_SERVER,
  FIND_MEDIA_SERVERS,
  SELECT_CONTENT_NODE,
  SELECT_MEDIA_SERVER,
} from './types';

export const findDevices = (username, password) => ({
  type: FIND_MEDIA_SERVERS,
  username,
  password,
});
export const selectDevice = (pos: number) => ({
  type: SELECT_MEDIA_SERVER,
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
