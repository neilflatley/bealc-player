import {
  BROWSE_SERVER,
  HIDE_BROWSER,
  SELECT_CONTENT_NODE,
  SELECT_MEDIA_SERVER,
  SET_DEVICE_TYPE,
  SHOW_BROWSER,
} from './types';

export const setDeviceType = (deviceType: string) => ({
  type: SET_DEVICE_TYPE,
  deviceType,
});
export const setDevice = (pos: number) => ({
  type: SELECT_MEDIA_SERVER,
  pos,
});
export const browseServer = (
  selectedDevice: any,
  deviceType: string,
  path: string,
  parentPath = ''
) => ({
  type: BROWSE_SERVER,
  deviceType,
  path,
  parentPath,
  selectedDevice,
});

export const selectContentNode = (
  selectedDevice: any,
  deviceType: string,
  path: string,
  autoPlay = false
) => ({
  type: SELECT_CONTENT_NODE,
  deviceType,
  path,
  selectedDevice,
  autoPlay,
});

export const hideBrowser = () => ({
  type: HIDE_BROWSER,
});
export const showBrowser = () => ({
  type: SHOW_BROWSER,
});
