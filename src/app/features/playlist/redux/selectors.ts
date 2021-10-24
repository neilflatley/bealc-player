import { selectCurrentItem } from '~/features/browser/redux/selectors';

export const selectCurrentPlaylist = (state: any) => state.playlist.current;
export const selectNowPlaying = (state: any) => {
  const selectedItem = selectCurrentItem(state);
  const currentPlaylist = selectCurrentPlaylist(state);
  return currentPlaylist.find((i: any) => i.isPlaying) || selectedItem;
};
export const selectShowPlaylist = (state: any) => state.playlist.visible;
export const selectIsPlaying = (state: any) => state.playlist.player.isPlaying;
export const selectVolume = (state: any) => state.playlist.player.volume;
export const selectProgress = (state: any) => state.playlist.player.progress;
export const selectSeekTo = (state: any) => state.playlist.player.seekTo;
