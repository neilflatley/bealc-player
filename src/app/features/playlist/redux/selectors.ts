export const selectCurrentPlaylist = (state: any) => state.playlist.current;
export const selectShowPlaylist = (state: any) => state.playlist.visible;
export const selectIsPlaying = (state: any) => state.playlist.player.isPlaying;
export const selectVolume = (state: any) => state.playlist.player.volume;
export const selectProgress = (state: any) => state.playlist.player.progress;
export const selectSeekTo = (state: any) => state.playlist.player.seekTo;