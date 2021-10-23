export const selectCurrentDevice = (state: any) =>
  state.dlna.devices?.find(d => d.isSelected);
export const selectShowBrowser = (state: any) => state.browser.visible;
