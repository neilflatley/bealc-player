import {
  BROWSE_SERVER,
  FIND_MEDIA_SERVERS,
  SELECT_CONTENT_NODE,
  SELECT_DLNA_SERVER,
} from './types';

export const findDevices = () => ({ type: FIND_MEDIA_SERVERS });
export const setDevice = (pos: number) => ({
  type: SELECT_DLNA_SERVER,
  pos,
});
export const browseServer = (id: string) => ({
  type: BROWSE_SERVER,
  id,
});
export const selectContentNode = (id: string) => ({
  type: SELECT_CONTENT_NODE,
  id,
});
