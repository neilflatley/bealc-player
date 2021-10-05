import { findContent } from './reducer';

export const selectCurrentDevice = (state: any) =>
  state.plex.devices?.find(d => d.isSelected);

export const selectCurrentNode = (state: any, id: string) => {
  const device = selectCurrentDevice(state);
  return findContent(device?.content, id);
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
