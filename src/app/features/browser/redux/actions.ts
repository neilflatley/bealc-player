import { BROWSE_SERVER, SELECT_CONTENT_NODE, SET_DEVICE_TYPE } from './types';

export const setDeviceType = (deviceType: string) => ({
  type: SET_DEVICE_TYPE,
  deviceType,
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
