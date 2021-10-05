import { findContent } from './reducer';

export const selectCurrentDevice = (state: any) =>
  state.dlna.devices?.find(d => d.isSelected);

export const selectCurrentNode = (state: any, id: string) => {
  const device = selectCurrentDevice(state);
  return findContent(device?.content, id);
};

export const selectCurrentChildren = (state: any, id: string) => {
  const node = selectCurrentNode(state, id);
  return node?.children || [];
};
