export const selectCurrentDevice = (state: any) =>
  state.dlna.devices?.find(d => d.isSelected);
