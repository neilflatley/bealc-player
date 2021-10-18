import {
  ADD_TO_PLAYLIST,
  ADVANCE_PLAYLIST,
  CLEAR_PLAYLIST,
  HIDE_PLAYLIST,
  PLAYER_PROGRESS,
  SET_VOLUME,
  SHOW_PLAYLIST,
  TOGGLE_PLAYING,
} from './types';

export const hidePlaylist = () => ({
  type: HIDE_PLAYLIST,
});
export const showPlaylist = () => ({
  type: SHOW_PLAYLIST,
});
export const clearPlaylist = () => ({
  type: CLEAR_PLAYLIST,
});
export const addToPlaylist = (items: any[], autoPlay = true) => ({
  type: ADD_TO_PLAYLIST,
  items,
  autoPlay,
});
export const advancePlaylist = (pos?: number) => ({
  type: ADVANCE_PLAYLIST,
  pos,
});
export const togglePlayState = () => ({
  type: TOGGLE_PLAYING,
});
export const setVolume = (volume: number) => ({
  type: SET_VOLUME,
  volume,
});
export const setProgress = (progress: any) => ({
  type: PLAYER_PROGRESS,
  progress,
});
