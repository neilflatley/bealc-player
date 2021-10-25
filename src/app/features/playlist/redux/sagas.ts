import { put, select, takeEvery } from 'redux-saga/effects';
import {
  selectCurrentPlaylist,
  selectNowPlaying,
  selectVolume,
} from './selectors';
import {
  ADD_TO_PLAYLIST,
  ADVANCE_PLAYLIST,
  CLEAR_PLAYLIST,
  LOAD_CACHED_PLAYLIST,
  REMOVE_FROM_PLAYLIST,
  SET_VOLUME,
} from './types';

export const playlistSagas = [
  readLocalStorage(),
  takeEvery(ADD_TO_PLAYLIST, updateLocalStorage),
  takeEvery(ADVANCE_PLAYLIST, updateLocalStorage),
  takeEvery(REMOVE_FROM_PLAYLIST, updateLocalStorage),
  takeEvery(CLEAR_PLAYLIST, updateLocalStorage),
  takeEvery(SET_VOLUME, updateLocalStorage),
];

function* updateLocalStorage() {
  const state = yield select();

  const currentPlaylist = selectCurrentPlaylist(state);
  const nowPlaying = selectNowPlaying(state);
  const volume = selectVolume(state);

  const player = {
    current: currentPlaylist,
    nowPlaying,
    player: { volume },
  };

  localStorage.setItem('bealc-player', JSON.stringify(player));
}

function* readLocalStorage() {
  if (typeof localStorage !== 'undefined') {
    const cached = localStorage.getItem('bealc-player');
    if (cached)
      yield put({
        type: LOAD_CACHED_PLAYLIST,
        playlist: JSON.parse(cached),
      });
  }
}
