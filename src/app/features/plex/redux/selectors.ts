export const selectCurrentDevice = (state: any) =>
  state.plex.devices?.find(d => d.isSelected);
