import { selectCurrentDevice as dlnaDevice } from '~/features/device-discovery/redux/selectors';
import { selectCurrentDevice as plexDevice } from '~/features/plex/redux/selectors';
import { findContent } from './reducer';

export const selectCurrentDeviceType = (state: any) => state.browser.deviceType;

export const selectDevices = (state: any) => {
  const deviceType = selectCurrentDeviceType(state);
  return state[deviceType]?.devices;
};

export const selectCurrentDevice = (state: any) => {
  switch (selectCurrentDeviceType(state)) {
    case 'dlna': {
      return dlnaDevice(state);
    }
    case 'plex': {
      return plexDevice(state);
    }
    default:
      return null;
  }
};

export const selectCurrentItem = (state: any) => state.browser.selectedItem;

export const selectCurrentNode = (state: any, id?: string) => {
  const device = selectCurrentDevice(state);
  const currentNode = state.browser.selectedNode;
  return findContent(
    device?.content,
    typeof id !== 'undefined'
      ? id
      : currentNode
      ? currentNode?.id || `${currentNode?.path}/${currentNode?.key}`
      : undefined
  );
};

export const selectCurrentChildren = (state: any, id: string) => {
  const node = selectCurrentNode(state, id);
  return node?.children || [];
};

export const selectServerUrl = (state: any, local = 'remote') => {
  const device = selectCurrentDevice(state) || {};

  if (local === 'local') return `http://${device.localAddresses}:32400`;
  else return `${device.scheme}://${device.host}:${device.port}`;
};
